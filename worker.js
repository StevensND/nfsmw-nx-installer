// Runs the whole package build off the main thread and streams the zip to the download service worker.
import createHlslModule from './wasm/hlsl.mjs';
import createDxcModule from './wasm/dxc_web.mjs';
import createPackModule from './wasm/pack.mjs';
import createLzxModule from './wasm/lzx.mjs';
import { listIsoFiles } from './lib/iso.js';
import { createPackage, createReport, identifyGame, lzxStep, programPath } from './lib/installer.js';
import { editionName, setLanguage, t } from './lib/i18n.js';

const log = (text) => postMessage({ type: 'log', text });
const progress = (fraction) => postMessage({ type: 'progress', fraction });

async function fetchBytes(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(t('downloadFailed', { url, status: response.status }));
  }
  return new Uint8Array(await response.arrayBuffer());
}

// Sends every write as one chunk, and only when the download has asked for more ("pull").
function portSink(port) {
  let credits = 0;
  let cancelled = false;
  let waiting = null;
  port.onmessage = ({ data }) => {
    if (data.type === 'pull') {
      credits++;
    } else if (data.type === 'cancel') {
      cancelled = true;
    }
    if (waiting) {
      const wake = waiting;
      waiting = null;
      wake();
    }
  };
  return {
    async write(bytes) {
      while (!credits) {
        if (cancelled) {
          throw new Error(t('cancelled'));
        }
        await new Promise((resolve) => (waiting = resolve));
      }
      if (cancelled) {
        throw new Error(t('cancelled'));
      }
      credits--;
      const copy = bytes.slice();
      port.postMessage({ type: 'chunk', buffer: copy.buffer }, [copy.buffer]);
    },
    async close() {
      port.postMessage({ type: 'end' });
    },
    fail(message) {
      port.postMessage({ type: 'error', message });
    },
  };
}

async function gameFiles(data) {
  return data.kind === 'iso'
    ? await listIsoFiles(data.file)
    : data.entries.map(({ path, file }) => ({
        path,
        size: file.size,
        read: async (offset, length) => new Uint8Array(await file.slice(offset, offset + length).arrayBuffer()),
      }));
}

const quiet = () => ({ print: () => {}, printErr: () => {} });

// lzx: the LZX module when it was already made (it is needed first, to identify a rebuilt executable).
async function shaderModules(lzx = null) {
  return {
    hlsl: await createHlslModule(quiet()),
    dxc: await createDxcModule(quiet()),
    pack: await createPackModule(quiet()),
    lzx: lzx || await createLzxModule(quiet()),
  };
}

// The report of an edition without a build: the text goes back to the page, which saves it as a file.
async function report(data) {
  try {
    const files = await gameFiles(data);
    const manifest = JSON.parse(new TextDecoder().decode(await fetchBytes('./release/manifest.json')));
    const shaderCommon = await fetchBytes('./shader_common.h');
    const text = await createReport(files, { manifest, shaderCommon }, await shaderModules(), log, progress);
    postMessage({ type: 'report', text });
  } catch (error) {
    postMessage({ type: 'error', message: error.message || String(error) });
  }
}

self.onmessage = async ({ data }) => {
  setLanguage(data.lang);
  if (data.report) {
    await report(data);
    return;
  }
  const sink = portSink(data.port);
  try {
    log(t('readingFiles'));
    const files = await gameFiles(data);
    const manifest = JSON.parse(new TextDecoder().decode(await fetchBytes('./release/manifest.json')));
    // Every executable is a different program with its own Switch build: download the one of this edition.
    const lzx = await createLzxModule(quiet());
    const { build, edition, xexHash } = await identifyGame(files, manifest, { decompressLzx: lzxStep(lzx) });
    if (!build) {
      throw new Error(edition
        ? t('discNotTested', { edition: editionName(edition), hash: xexHash })
        : t('notSupportedYet', { hash: xexHash }));
    }
    log(t('downloadingBuild', { edition: editionName(build.edition) }));
    const [nro, toml, shaderCommon] = await Promise.all([
      fetchBytes(programPath(build)),
      fetchBytes('./release/nfsmw.toml'),
      fetchBytes('./shader_common.h'),
    ]);
    const nroHash = [...new Uint8Array(await crypto.subtle.digest('SHA-256', nro))]
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    if (nroHash !== build.nro_sha256) {
      throw new Error(t('buildMismatch', { hash: nroHash }));
    }
    const modules = await shaderModules(lzx);
    const result = await createPackage(files, { manifest, nro, toml, shaderCommon }, modules, sink, log, progress,
      (size) => postMessage({ type: 'size', size }), { update: Boolean(data.update) });
    postMessage({ type: 'done', result });
  } catch (error) {
    const message = error.message || String(error);
    sink.fail(message);
    postMessage({ type: 'error', message });
  }
};
