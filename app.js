import { listIsoFiles } from './lib/iso.js';
import { identifyGame, programPath } from './lib/installer.js';
import { describeLanguage, FLAGS } from './lib/flags.js';
import { LANGUAGES, editionName, formatSize, getLanguage, languageName, preferredLanguage, setLanguage, t } from './lib/i18n.js';

const chosen = document.getElementById('chosen');
const create = document.getElementById('create');
const update = document.getElementById('update');
const bar = document.getElementById('bar');
const logBox = document.getElementById('log');
const detected = document.getElementById('detected');
const flag = document.getElementById('flag');
const language = document.getElementById('language');
const edition = document.getElementById('edition');
const fingerprint = document.getElementById('fingerprint');
const reportBox = document.getElementById('reportBox');
const reportIntro = document.getElementById('reportIntro');
const report = document.getElementById('report');
const languages = document.getElementById('languages');
const manifest = fetch('./release/manifest.json').then((r) => r.json());
const LANGUAGE_KEY = 'nfsmw-nx.language';
let source = null;
let check = 0;
// What the page shows about the chosen game, kept as data so it can be drawn again in another language.
let chosenView = null;
let detectedView = null;
// the frame that opened the last download
let downloadFrame = null;
const page = document.querySelector('main');
let zoom = 1;

// The whole page fits in the window: when it is taller than the screen, it is scaled down evenly (never below
// 72 %, to keep the text readable). Recomputed when the window or the content changes size. Phones just scroll.
function setZoom(value) {
  zoom = value;
  page.style.zoom = zoom === 1 ? '' : String(zoom);
}

function fitToWindow() {
  if (window.innerWidth < 700) {
    if (zoom !== 1) {
      setZoom(1);
    }
    return;
  }
  // measured again after scaling, up to three times: borders stay 1px wide, so the page does not shrink exactly
  for (let pass = 0; pass < 3; pass++) {
    // the height the blocks need, without the free space that is spread between them
    page.style.minHeight = '0';
    const height = page.getBoundingClientRect().height;
    page.style.minHeight = '';
    const room = window.innerHeight - 2;
    const wanted = Math.max(0.72, Math.min(1, (zoom * room) / height));
    // shrink as soon as it does not fit; grow back to full size, or by a visible step, so it does not flicker
    const grow = wanted === 1 ? zoom < 1 : wanted - zoom > 0.005;
    if (height > room ? wanted >= zoom : !grow) {
      return;
    }
    setZoom(wanted);
  }
}
const resized = new ResizeObserver(fitToWindow);
resized.observe(page);
// the page itself keeps the height of the window while the blocks fit: watch them to see a message or the log grow
for (const block of page.children) {
  resized.observe(block);
}
window.addEventListener('resize', fitToWindow);
document.fonts.ready.then(fitToWindow);

function log(text, error = false) {
  const line = document.createElement('div');
  line.textContent = text;
  if (error) {
    line.className = 'error';
  }
  logBox.appendChild(line);
  logBox.scrollTop = logBox.scrollHeight;
  fitToWindow();
}

function renderChosen() {
  if (!chosenView) {
    chosen.textContent = t('nothingChosen');
  } else if (chosenView.count === undefined) {
    chosen.textContent = t('chosenFile', { name: chosenView.name, size: formatSize(chosenView.size) });
  } else {
    // a folder with default.xex alone is enough for the report of an edition
    chosen.textContent = t(chosenView.count === 1 ? 'chosenFolderOne' : 'chosenFolder',
      { name: chosenView.name, count: chosenView.count, size: formatSize(chosenView.size) });
  }
}

function showDetected(state, languageText, editionText, svg = '', hash = '') {
  detected.hidden = false;
  detected.className = `detected ${state}`;
  flag.innerHTML = svg;
  flag.hidden = !svg;
  language.textContent = languageText;
  edition.textContent = editionText;
  edition.className = `edition ${state}`;
  fingerprint.textContent = hash;
  fingerprint.hidden = !hash;
}

function renderDetected() {
  const v = detectedView;
  if (!v) {
    detected.hidden = true;
    return;
  }
  // an edition or a disc without a build: the player can send us a report of it
  reportBox.hidden = v.kind !== 'unsupported' && v.kind !== 'discUntested';
  reportIntro.textContent = t(v.executableOnly ? 'reportIntroExecutable' : 'reportIntro');
  const lang = v.lang;
  switch (v.kind) {
    case 'checking':
      showDetected('', t('checking'), '');
      break;
    case 'supported':
      showDetected('good', languageName(lang), t('supported', { edition: editionName(v.edition) }), lang.svg);
      break;
    case 'discUntested':
      showDetected('bad', languageName(lang), t('discUntested', { edition: editionName(v.edition) }), lang.svg, v.hash);
      break;
    case 'unsupported':
      // default.xex alone has no movies to tell its language: the box names the file instead
      if (v.executableOnly) {
        showDetected('bad', 'default.xex', t('unsupported'), '', v.hash);
      } else {
        showDetected('bad', languageName(lang), t('unsupported'), lang.svg, v.hash);
      }
      break;
    case 'executableOnly':
      showDetected('bad', 'default.xex', t('executableOnly', { edition: editionName(v.edition) }));
      break;
    case 'notComplete':
      showDetected('bad', t('notComplete'), v.code ? t(v.code) : v.message);
      break;
    case 'notIso':
      showDetected('bad', t('notIso'), v.message);
      break;
  }
}

function applyLanguage(code) {
  setLanguage(code);
  document.documentElement.lang = getLanguage();
  for (const el of document.querySelectorAll('[data-i18n]')) {
    el.textContent = t(el.dataset.i18n);
  }
  // our own texts, with <strong>, <code> and the Sphaira link
  for (const el of document.querySelectorAll('[data-i18n-html]')) {
    el.innerHTML = t(el.dataset.i18nHtml);
  }
  languages.setAttribute('aria-label', t('languageBar'));
  for (const button of languages.querySelectorAll('button')) {
    button.setAttribute('aria-pressed', String(button.dataset.lang === getLanguage()));
  }
  renderChosen();
  renderDetected();
  fitToWindow();
}

for (const { code, name, flag: flagName } of LANGUAGES) {
  const button = document.createElement('button');
  button.type = 'button';
  button.dataset.lang = code;
  button.title = name;
  button.setAttribute('aria-label', name);
  button.setAttribute('lang', code);
  button.innerHTML = FLAGS[flagName];
  button.addEventListener('click', () => {
    applyLanguage(code);
    try {
      localStorage.setItem(LANGUAGE_KEY, code);
    } catch {
      // private windows and blocked storage: the choice just lasts for this visit
    }
  });
  languages.appendChild(button);
}
let saved = null;
try {
  saved = localStorage.getItem(LANGUAGE_KEY);
} catch {
  saved = null;
}
applyLanguage(preferredLanguage(saved));

// Identifies the game as soon as it is chosen: executable fingerprint, edition and disc language.
async function identify(files) {
  const id = ++check;
  setButtons(false);
  detectedView = { kind: 'checking' };
  renderDetected();
  try {
    // default.xex alone is enough to name the edition and to make a report; the package needs the whole game
    const game = await identifyGame(files, await manifest, { executableOnly: true });
    if (id !== check) {
      return;
    }
    const lang = describeLanguage(game.languages[0]);
    if (!game.complete) {
      detectedView = game.edition
        ? { kind: 'executableOnly', edition: game.edition }
        : { kind: 'unsupported', executableOnly: true, hash: game.xexHash };
    } else if (game.build) {
      detectedView = { kind: 'supported', lang, edition: game.build.edition };
      setButtons(true);
      // the program of this edition is kept by the browser now, so the package can be made even if the
      // connection drops before it is
      const url = new URL(programPath(game.build), location.href).href;
      helper.then((controller) => controller.postMessage({ type: 'keep-program', url }), () => {});
    } else if (game.edition) {
      detectedView = { kind: 'discUntested', lang, edition: game.edition, hash: game.xexHash };
    } else {
      detectedView = { kind: 'unsupported', lang, hash: game.xexHash };
    }
  } catch (error) {
    if (id !== check) {
      return;
    }
    detectedView = { kind: 'notComplete', code: error.code, message: error.message };
  }
  renderDetected();
  fitToWindow();
}

document.getElementById('iso').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }
  source = { kind: 'iso', file };
  chosenView = { name: file.name, size: file.size };
  renderChosen();
  try {
    await identify(await listIsoFiles(file));
  } catch (error) {
    detectedView = { kind: 'notIso', message: error.message };
    renderDetected();
  }
});

document.getElementById('folder').addEventListener('change', async (event) => {
  const list = [...event.target.files];
  if (!list.length) {
    return;
  }
  const top = list[0].webkitRelativePath.split('/')[0] + '/';
  const entries = list.map((file) => ({
    path: file.webkitRelativePath.startsWith(top) ? file.webkitRelativePath.slice(top.length) : file.webkitRelativePath,
    file,
  }));
  source = { kind: 'folder', entries };
  chosenView = { name: top.slice(0, -1), count: list.length, size: list.reduce((sum, f) => sum + f.size, 0) };
  renderChosen();
  await identify(entries.map(({ path, file }) => ({
    path,
    size: file.size,
    read: async (offset, length) => new Uint8Array(await file.slice(offset, offset + length).arrayBuffer()),
  })));
});

// The zip is served by sw.js as a normal browser download, streamed while it is being generated.
async function downloadHelper() {
  if (!('serviceWorker' in navigator)) {
    throw new Error('noStreaming');
  }
  await navigator.serviceWorker.register('./sw.js');
  const registration = await navigator.serviceWorker.ready;
  if (!navigator.serviceWorker.controller) {
    const claimed = new Promise((resolve) => navigator.serviceWorker.addEventListener('controllerchange', resolve, { once: true }));
    // a forced reload (Ctrl+F5) opens the page without its service worker, which then has to take it back
    registration.active.postMessage({ type: 'claim' });
    await claimed;
  }
  // a copy of every page file, so the page can be used again without a connection
  navigator.serviceWorker.controller.postMessage({ type: 'keep-page' });
  return navigator.serviceWorker.controller;
}
const helper = downloadHelper();
helper.catch(() => {});

function setButtons(enabled) {
  create.disabled = !enabled;
  update.disabled = !enabled;
}

// update: only the program, its settings and the shaders, for a folder that is already on the SD card.
async function makePackage(onlyUpdate) {
  if (!source) {
    return;
  }
  let controller;
  try {
    controller = await helper;
  } catch (error) {
    log(t('error', { message: error.message === 'noStreaming' ? t('noStreaming') : error.message }), true);
    return;
  }
  const filename = onlyUpdate ? 'nfsmw-nx-update.zip' : 'nfsmw-nx.zip';
  setButtons(false);
  bar.hidden = false;
  bar.value = 0;
  logBox.textContent = '';
  fitToWindow();
  const started = Date.now();
  const channel = new MessageChannel();
  const keepAlive = setInterval(() => controller.postMessage({ type: 'ping' }), 10000);
  const worker = new Worker('./worker.js', { type: 'module' });
  const finish = () => {
    clearInterval(keepAlive);
    worker.terminate();
    setButtons(true);
  };
  worker.onmessage = async ({ data }) => {
    if (data.type === 'log') {
      log(data.text);
    } else if (data.type === 'progress') {
      bar.value = data.fraction;
    } else if (data.type === 'size') {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const ack = new MessageChannel();
      const registered = new Promise((resolve) => (ack.port1.onmessage = resolve));
      controller.postMessage({ type: 'download', id, filename, size: data.size }, [channel.port2, ack.port2]);
      await registered;
      // a hidden frame opens the download: its request is a navigation, which always reaches the service worker
      // (Chrome sends the request of an <a download> link straight to the network, where the file does not exist)
      downloadFrame?.remove();
      downloadFrame = document.createElement('iframe');
      downloadFrame.hidden = true;
      downloadFrame.src = `./download/${id}/${filename}`;
      document.body.appendChild(downloadFrame);
      log(t('downloadStarted', { size: formatSize(data.size) }));
    } else if (data.type === 'done') {
      bar.value = 1;
      log(t('finished', { seconds: Math.round((Date.now() - started) / 1000) }));
      finish();
    } else if (data.type === 'error') {
      log(t('error', { message: data.message }), true);
      finish();
    }
  };
  worker.onerror = (event) => {
    log(t('error', { message: event.message }), true);
    finish();
  };
  worker.postMessage({ ...source, lang: getLanguage(), update: onlyUpdate, port: channel.port1 }, [channel.port1]);
}

// A small text file made in the page: a link to it opens as a normal download (it never reaches the network).
function saveText(filename, text) {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

// The report of an edition without a build: its fingerprints and the list of its files, saved as a text file.
function makeReport() {
  if (!source) {
    return;
  }
  report.disabled = true;
  bar.hidden = false;
  bar.value = 0;
  logBox.textContent = '';
  log(t('logReport'));
  const started = Date.now();
  const worker = new Worker('./worker.js', { type: 'module' });
  const finish = () => {
    worker.terminate();
    report.disabled = false;
  };
  worker.onmessage = ({ data }) => {
    if (data.type === 'log') {
      log(data.text);
    } else if (data.type === 'progress') {
      bar.value = data.fraction;
    } else if (data.type === 'report') {
      bar.value = 1;
      saveText('nfsmw-nx-report.txt', data.text);
      log(t('reportSaved'));
      log(t('finished', { seconds: Math.round((Date.now() - started) / 1000) }));
      finish();
    } else if (data.type === 'error') {
      log(t('error', { message: data.message }), true);
      finish();
    }
  };
  worker.onerror = (event) => {
    log(t('error', { message: event.message }), true);
    finish();
  };
  worker.postMessage({ ...source, lang: getLanguage(), report: true });
}

create.addEventListener('click', () => makePackage(false));
update.addEventListener('click', () => makePackage(true));
report.addEventListener('click', makeReport);
