// Builds the nfsmw-nx.zip package from the user's own game files.

import { readXexImage } from './xex.js';
import { ContainerScanner } from './containers.js';
import { buildShaderLibrary } from './shaders.js';
import { ZipWriter, zipSize } from './zip.js';
import { describeLanguage } from './flags.js';
import { editionName, languageName, t } from './i18n.js';

const CHUNK = 16 * 1024 * 1024;
const ROOT = 'nfsmw-nx';

async function sha256(bytes) {
  const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', bytes));
  return [...digest].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function* chunksOf(file) {
  for (let offset = 0; offset < file.size; offset += CHUNK) {
    yield await file.read(offset, Math.min(CHUNK, file.size - offset));
  }
}

// Fan translations keep the file names of the disc they were made from; they are told apart by a data file.
const TRANSLATIONS = [{ path: 'nfs/zzdata0.bin', size: 387301706, language: 'russian' }];

// Language and region from the movie names, e.g. "attract_movie_spanish_pal.wmv" -> spanish / pal.
export function detectLanguage(files) {
  for (const known of TRANSLATIONS) {
    if (files.some((f) => f.path.toLowerCase() === known.path && f.size === known.size)) {
      return [`${known.language} (translation)`];
    }
  }
  const found = new Map();
  for (const f of files) {
    const m = /^movies\/.+_([a-z]+)_(pal|ntsc)\.wmv$/i.exec(f.path);
    if (m) {
      const key = `${m[1].toLowerCase()} (${m[2].toUpperCase()})`;
      found.set(key, (found.get(key) || 0) + 1);
    }
  }
  return [...found.entries()].sort((a, b) => b[1] - a[1]).map(([name]) => name);
}

function isGameFile(path) {
  return !path.startsWith('$') && !/\.(nfo|txt|db)$/i.test(path);
}

// Disc files searched for shader containers (the NFS data files, not the videos).
function holdsShaders(file) {
  return /^nfs\/[^/]+\.bin$/i.test(file.path) && file.size >= 24 && file.size <= 1024 * 1024 * 1024;
}

// Where the program of an edition is downloaded from. Its SHA-256 is part of the address, so every version is a
// different address and a copy kept by the browser is never mistaken for a newer one.
export function programPath(build) {
  return `./release/${build.nro}?sha256=${build.nro_sha256}`;
}

// Checks that the files are a complete game and identifies the edition through the executable fingerprint.
// A build can also name the disc it was tested with ("disc": {path: size}): the shaders come from the disc data, so
// the same executable on another disc (a reprint, a fan translation) gets its own entry once it has been tested.
// Returns { xex, xexHash, build (null when unsupported), edition (the known edition of this executable, or null),
// languages }.
export async function identifyGame(files, manifest) {
  const xexFile = files.find((f) => f.path.toLowerCase() === 'default.xex');
  if (!xexFile || !files.some((f) => /^nfs\//i.test(f.path)) || !files.some((f) => /^movies\//i.test(f.path))) {
    const error = new Error(t('incomplete'));
    error.code = 'incomplete';
    throw error;
  }
  const xex = await xexFile.read(0, xexFile.size);
  const xexHash = await sha256(xex);
  const sameExecutable = manifest.builds.filter((b) => b.xex_sha256 === xexHash);
  const onThisDisc = (b) =>
    Object.entries(b.disc || {}).every(([path, size]) =>
      files.some((f) => f.path.toLowerCase() === path.toLowerCase() && f.size === size));
  const build = sameExecutable.find(onThisDisc) || null;
  const edition = sameExecutable.length ? sameExecutable[0].edition : null;
  return { xex, xexHash, build, edition, languages: detectLanguage(files) };
}

// files: [{ path, size, read(offset, length) }]
// release: { manifest, nro: Uint8Array, toml: Uint8Array, shaderCommon: Uint8Array }
// modules: { hlsl, dxc, pack, lzx } instantiated Emscripten modules (one object each)
// sink: { write(Uint8Array), close() } receiving the zip file
// onSize(bytes) is called with the exact size of the zip before the first byte is written.
// update: only the program, its settings and the shaders, for a folder that is already on the SD card. The disc is
// still read, because the shaders are made from it, but none of its files goes into the zip.
export async function createPackage(files, release, modules, sink, log = () => {}, progress = () => {}, onSize = () => {},
  { update = false } = {}) {
  const { xex, xexHash, build, edition, languages } = await identifyGame(files, release.manifest);
  if (!build) {
    throw new Error(edition
      ? t('discNotTested', { edition: editionName(edition), hash: xexHash })
      : t('notSupportedYet', { hash: xexHash }));
  }
  log(t('logEdition', { edition: editionName(build.edition) }));
  log(t('logLanguage', { language: languages.map((l) => languageName(describeLanguage(l))).join(', ') || t('unknown') }));
  if (update) {
    log(t('logUpdate'));
  }

  const { image } = await readXexImage(xex, async (compressed, bits, size) => {
    modules.lzx.FS.writeFile('/image.lzx', compressed);
    const rc = modules.lzx.callMain(['/image.lzx', '/image.bin', String(bits), String(size)]);
    if (rc) {
      throw new Error(`LZX decompression failed (${rc})`);
    }
    const out = modules.lzx.FS.readFile('/image.bin');
    modules.lzx.FS.unlink('/image.lzx');
    modules.lzx.FS.unlink('/image.bin');
    return out;
  });
  const executable = new ContainerScanner('xex_');
  executable.scanWhole('default.xex', image);

  const game = files.filter((f) => isGameFile(f.path)).sort((a, b) => a.path.toLowerCase().localeCompare(b.path.toLowerCase()));
  const copies = update ? [] : game;
  onSize(zipSize([
    { path: `${ROOT}/nfsmw-nx.nro`, size: release.nro.length },
    { path: `${ROOT}/nfsmw.toml`, size: release.toml.length },
    { path: `${ROOT}/LICENSES.txt`, size: release.licenses.length },
    ...copies.map((f) => ({ path: `${ROOT}/game_root/${f.path}`, size: f.size })),
    { path: `${ROOT}/nfsmw_shaders.nfsp`, size: build.library_size },
  ]));
  const zip = new ZipWriter(sink);
  await zip.addBytes(`${ROOT}/nfsmw-nx.nro`, release.nro);
  await zip.addBytes(`${ROOT}/nfsmw.toml`, release.toml);
  await zip.addBytes(`${ROOT}/LICENSES.txt`, release.licenses);

  // The containers are numbered in the order they are found, so the disc is always searched in the same order,
  // whether its files are copied or only read.
  const disc = new ContainerScanner('');
  const read = update ? game.filter(holdsShaders) : game;
  const total = read.reduce((sum, f) => sum + f.size, 0);
  let done = 0;
  for (const f of read) {
    const scan = holdsShaders(f);
    if (scan) {
      disc.beginFile(f.path, f.size);
    }
    let seen = 0;
    const onChunk = (chunk) => {
      seen += chunk.length;
      done += chunk.length;
      if (scan) {
        disc.push(chunk, seen >= f.size);
      }
      progress(done / total);
    };
    if (update) {
      for await (const chunk of chunksOf(f)) {
        onChunk(chunk);
      }
      log(t('read', { path: f.path }));
    } else {
      await zip.addFile(`${ROOT}/game_root/${f.path}`, f.size, chunksOf(f), onChunk);
      log(t('copied', { path: f.path }));
    }
  }

  const containers = [...disc.found, ...executable.found];
  log(t('foundShaders', { count: containers.length }));
  // The composition shader keeps its bytes between editions but not its name: find it by content.
  let blurShader = null;
  for (const c of containers) {
    if ((await sha256(c.bytes)) === build.blur_container_sha256) {
      blurShader = c.name.slice(0, -4);
      break;
    }
  }
  if (!blurShader) {
    throw new Error(t('compositionMissing'));
  }
  const library = await buildShaderLibrary(containers, modules, release.shaderCommon, log, blurShader);
  const libraryHash = await sha256(library);
  if (libraryHash !== build.library_sha256) {
    throw new Error(t('libraryMismatch', { hash: libraryHash }));
  }
  await zip.addBytes(`${ROOT}/nfsmw_shaders.nfsp`, library);
  await zip.finish();
  log(t('done'));
  return { edition: build.edition, languages, shaders: containers.length };
}
