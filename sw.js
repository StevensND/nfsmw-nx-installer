// Serves the zip that the page generates as a regular browser download, and keeps a copy of the page, its tools and
// the program of each edition the user has made a package for, so a package can still be made without a connection.
// The generator sends the zip through a MessagePort, one chunk per "pull", so memory use stays bounded however big
// the zip is.

const PAGE_CACHE = 'nfsmw-nx-page';
const PROGRAM_CACHE = 'nfsmw-nx-programs';
// Everything the page needs to make a package except the programs (about 63 MB each, kept only for the editions
// that are used).
const PAGE_FILES = [
  './',
  'index.html',
  'app.js',
  'worker.js',
  'background.webp',
  'fonts/MostWasted.ttf',
  'shader_common.h',
  'lib/containers.js',
  'lib/flags.js',
  'lib/i18n.js',
  'lib/installer.js',
  'lib/iso.js',
  'lib/shaders.js',
  'lib/xex.js',
  'lib/zip.js',
  'wasm/dxc_web.mjs',
  'wasm/dxc_web.wasm',
  'wasm/hlsl.mjs',
  'wasm/hlsl.wasm',
  'wasm/lzx.mjs',
  'wasm/lzx.wasm',
  'wasm/pack.mjs',
  'wasm/pack.wasm',
  'release/manifest.json',
  'release/nfsmw.toml',
];
// How long a page file waits for the network before the kept copy is used (the network still refreshes it).
const NETWORK_WAIT = 4000;

// GitHub Pages sends every file with "Cache-Control: max-age=600", so a plain fetch could get a copy up to ten minutes
// old from the browser's own cache: right after an update, a new index.html could load with an old lib/i18n.js and the
// new languages would be missing until the cache was cleared. Page files are always checked with the server instead;
// an unchanged file costs only a "304 Not Modified".
function fetchFresh(url) {
  return fetch(url, { cache: 'no-cache' });
}

const jobs = new Map();
// Programs being downloaded into the cache, by address, so two requests for the same one share the download.
const downloading = new Map();

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  const activated = (async () => {
    for (const name of await caches.keys()) {
      if (name !== PAGE_CACHE && name !== PROGRAM_CACHE) {
        await caches.delete(name);
      }
    }
    await self.clients.claim();
  })();
  event.waitUntil(activated);
  // only once activation is over: a page reloaded before that would wait for this worker, which waits for the page
  activated.then(() => refreshOldPages()).catch(() => {});
});

// A page opened by an older version of this file may have been put together from old copies (that is what made new
// languages and flags appear only after clearing the cache). Once this version takes over, every open page is asked
// which version it is: the current page answers and reloads by itself when nothing is under way (app.js); a page
// that does not answer is from the old code, so it is loaded again at once, now through this version.
async function refreshOldPages() {
  const pages = await self.clients.matchAll({ type: 'window' });
  await Promise.all(
    pages.map(async (page) => {
      const answered = await new Promise((resolve) => {
        const channel = new MessageChannel();
        channel.port1.onmessage = () => resolve(true);
        page.postMessage({ type: 'version' }, [channel.port2]);
        setTimeout(() => resolve(false), 1000);
      });
      if (!answered) {
        try {
          await page.navigate(page.url);
        } catch {
          // a page that cannot be reloaded from here keeps working; the next visit gets the new version
        }
      }
    }),
  );
}

self.addEventListener('message', (event) => {
  const data = event.data || {};
  if (data.type === 'download') {
    const [port, ack] = event.ports;
    jobs.set(data.id, { port, size: data.size, filename: data.filename });
    ack.postMessage('registered');
  } else if (data.type === 'claim') {
    event.waitUntil(self.clients.claim());
  } else if (data.type === 'keep-page') {
    event.waitUntil(keepPage());
  } else if (data.type === 'keep-program' && typeof data.url === 'string') {
    event.waitUntil(keepProgram(data.url).catch(() => {}));
  }
  // "ping" messages only keep this worker alive while a download is running.
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  const match = /\/download\/([\w-]+)\/[^/]+$/.exec(url.pathname);
  if (match) {
    const job = jobs.get(match[1]);
    if (job) {
      jobs.delete(match[1]);
      event.respondWith(serveDownload(job));
    }
    return;
  }
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }
  if (url.searchParams.has('sha256')) {
    event.respondWith(fromPrograms(request));
  } else if (url.origin === self.location.origin) {
    const answer = fromPage(request);
    event.respondWith(answer.then((a) => a.response));
    event.waitUntil(answer.then((a) => a.stored));
  }
});

function serveDownload(job) {
  const { port } = job;
  const stream = new ReadableStream(
    {
      start(controller) {
        port.onmessage = ({ data }) => {
          if (data.type === 'chunk') {
            controller.enqueue(new Uint8Array(data.buffer));
          } else if (data.type === 'end') {
            controller.close();
          } else if (data.type === 'error') {
            controller.error(new Error(data.message));
          }
        };
      },
      pull() {
        port.postMessage({ type: 'pull' });
      },
      cancel() {
        port.postMessage({ type: 'cancel' });
      },
    },
    { highWaterMark: 4 },
  );
  const headers = {
    'Content-Type': 'application/zip',
    'Content-Disposition': `attachment; filename="${job.filename}"`,
    'Content-Length': String(job.size),
  };
  return new Response(stream, { headers });
}

function withoutQuery(address) {
  const url = new URL(address);
  url.search = '';
  url.hash = '';
  return url.href;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Page files: the network when it answers, the kept copy when it fails, has a server error or keeps the page
// waiting. Whatever the network brings replaces the kept copy, unless it is the same version.
async function fromPage(request) {
  const cache = await caches.open(PAGE_CACHE);
  const key = withoutQuery(request.url);
  const kept =
    (await cache.match(key)) ||
    (request.mode === 'navigate' ? await cache.match(new URL('./', self.registration.scope).href) : undefined);
  const network = fetchFresh(request.url);
  const stored = network.then(
    (fresh) => (fresh.ok && fresh.type === 'basic' ? store(cache, key, fresh.clone(), kept) : undefined),
    () => undefined,
  );
  if (!kept) {
    return { response: network, stored };
  }
  const response = Promise.race([
    network.then((fresh) => (fresh.status >= 500 ? kept : fresh), () => kept),
    wait(NETWORK_WAIT).then(() => kept),
  ]);
  return { response, stored };
}

async function store(cache, key, fresh, kept) {
  if (kept && sameVersion(kept, fresh)) {
    await fresh.body?.cancel();
    return;
  }
  try {
    await cache.put(key, fresh);
  } catch {
    // no room left: the page keeps working from the network
  }
}

function sameVersion(kept, fresh) {
  for (const name of ['etag', 'last-modified']) {
    const value = fresh.headers.get(name);
    if (value) {
      return value === kept.headers.get(name) && fresh.headers.get('content-length') === kept.headers.get('content-length');
    }
  }
  return false;
}

// Programs: their address names their SHA-256, so a kept copy is always the right one and is used first.
async function fromPrograms(request) {
  const cache = await caches.open(PROGRAM_CACHE);
  let kept = await cache.match(request.url);
  if (!kept) {
    try {
      await keepProgram(request.url);
      kept = await cache.match(request.url);
    } catch {
      // it could not be kept (no room): straight from the network
    }
  }
  return kept || fetch(request.url, { cache: 'no-cache' });
}

// Downloads a program into the cache, where it replaces the older versions of the same file.
function keepProgram(url) {
  if (!downloading.has(url)) {
    const job = (async () => {
      const cache = await caches.open(PROGRAM_CACHE);
      if (await cache.match(url)) {
        return;
      }
      const response = await fetch(url, { cache: 'no-cache' });
      if (!response.ok) {
        throw new Error(`${url}: HTTP ${response.status}`);
      }
      // Only the version the address names is kept. Right after an update a server can still hand out the previous
      // file; kept under the new address, that copy would be used for good and every package would fail.
      const bytes = await response.arrayBuffer();
      const hash = [...new Uint8Array(await crypto.subtle.digest('SHA-256', bytes))]
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
      if (hash !== new URL(url).searchParams.get('sha256')) {
        throw new Error(`${url}: the server sent another version (${hash})`);
      }
      await cache.put(url, new Response(bytes, { headers: response.headers }));
      // the older versions go only once the new one is complete, so an interrupted download leaves the old one
      const file = withoutQuery(url);
      for (const old of await cache.keys()) {
        if (old.url !== url && withoutQuery(old.url) === file) {
          await cache.delete(old);
        }
      }
    })().finally(() => downloading.delete(url));
    downloading.set(url, job);
  }
  return downloading.get(url);
}

// Fills the cache with the page files it does not have yet (the first visit), so the page also works offline.
async function keepPage() {
  const cache = await caches.open(PAGE_CACHE);
  await Promise.all(
    PAGE_FILES.map(async (file) => {
      const url = new URL(file, self.registration.scope).href;
      if (await cache.match(url)) {
        return;
      }
      try {
        const response = await fetchFresh(url);
        if (response.ok) {
          await cache.put(url, response);
        }
      } catch {
        // offline or no room: it is kept the next time it is used
      }
    }),
  );
}
