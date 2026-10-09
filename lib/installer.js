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

function be32(data, offset) {
  return ((data[offset] << 24) | (data[offset + 1] << 16) | (data[offset + 2] << 8) | data[offset + 3]) >>> 0;
}

function setBe32(data, offset, value) {
  data[offset] = value >>> 24;
  data[offset + 1] = (value >>> 16) & 0xff;
  data[offset + 2] = (value >>> 8) & 0xff;
  data[offset + 3] = value & 0xff;
}

// One-word patches of fan translations, as offsets in the decompressed image. A build that was compiled from a
// patched executable lists them ("patches"), and its "image_sha256" is the fingerprint of the image with them put
// back: the same program is then recognised whatever tool rebuilt the file (encrypted or not, compressed or not).
const KNOWN_PATCHES = [
  // Polish translation (grajpopolsku.pl, topic 4837), on the PAL English executable: cutscene subtitles on.
  // 0x8228753C, beq cr6 -> nop: the subtitle loader is always called.
  { name: 'subtitles', offset: 0x28753c, original: 0x419a0010, patched: 0x60000000 },
];

// Fingerprints of a decompressed image: as it is, and with the known patches it carries put back (base).
export async function fingerprintImage(image) {
  const asIs = await sha256(image);
  const patches = KNOWN_PATCHES.filter((p) => p.offset + 4 <= image.length && be32(image, p.offset) === p.patched);
  if (!patches.length) {
    return { asIs, base: asIs, patches: [] };
  }
  const base = image.slice();
  for (const p of patches) {
    setBe32(base, p.offset, p.original);
  }
  return { asIs, base: await sha256(base), patches: patches.map((p) => p.name) };
}

function le16(data, offset) {
  return data[offset] | (data[offset + 1] << 8);
}

function le32(data, offset) {
  return (data[offset] | (data[offset + 1] << 8) | (data[offset + 2] << 16) | (data[offset + 3] << 24)) >>> 0;
}

// The PE section table of a decompressed image and a fingerprint of its code: the image base, every section's name,
// address, size and flags, and the bytes of the executable sections, after putting back the known patches. It is
// only a diagnosis for the report (an executable whose code matches an edition's may still differ in the data the
// build relies on: jump tables, .pdata, exception tables). null when the image has no readable section table.
export async function codeFingerprint(image) {
  if (image.length < 0x40 || image[0] !== 0x4d || image[1] !== 0x5a) {
    return null;
  }
  const pe = le32(image, 0x3c);
  if (pe + 24 > image.length || le32(image, pe) !== 0x00004550) {
    return null;
  }
  const count = le16(image, pe + 6);
  const optional = le16(image, pe + 20);
  const table = pe + 24 + optional;
  if (count === 0 || optional < 32 || table + count * 40 > image.length) {
    return null;
  }
  const imageBase = le32(image, pe + 24 + 28);  // PE32 optional header: ImageBase
  const base = image.slice();
  for (const p of KNOWN_PATCHES) {
    if (p.offset + 4 <= base.length && be32(base, p.offset) === p.patched) {
      setBe32(base, p.offset, p.original);
    }
  }
  const sections = [];
  const parts = [];
  let layout = `base ${imageBase.toString(16)}`;
  for (let i = 0; i < count; i++) {
    const at = table + i * 40;
    const name = String.fromCharCode(...image.subarray(at, at + 8)).replace(/\0+$/, '');
    const size = le32(image, at + 8);
    const address = le32(image, at + 12);
    const flags = le32(image, at + 36);
    // IMAGE_SCN_CNT_CODE or IMAGE_SCN_MEM_EXECUTE
    const code = (flags & 0x00000020) !== 0 || (flags & 0x20000000) !== 0;
    // the XEX image leaves out what the console does not load (the .reloc section runs past its end): such a section
    // is listed and fingerprinted by its header only; a code section must be there whole
    const present = address + size <= base.length;
    if (code && !present) {
      return null;
    }
    sections.push({ name, address, size, flags, code, present });
    layout += `;${name},${address.toString(16)},${size.toString(16)},${flags.toString(16)}`;
    if (code) {
      parts.push(base.subarray(address, address + size));
    }
  }
  if (!parts.length) {
    return null;
  }
  const header = new TextEncoder().encode(`${layout}\n`);
  const joined = new Uint8Array(header.length + parts.reduce((n, p) => n + p.length, 0));
  joined.set(header, 0);
  let offset = header.length;
  for (const p of parts) {
    joined.set(p, offset);
    offset += p.length;
  }
  return { sha256: await sha256(joined), sections };
}

// The image in 64 KiB blocks (known patches put back): the first 16 hex digits of each block's SHA-256. The manifest
// keeps those of the known builds ("image_blocks") so a report can say which blocks of an unknown executable differ,
// without any game data.
export const IMAGE_BLOCK = 0x10000;

// A copy of the image with the known patches put back (for tools that compare against our own copy of an edition).
export function withoutKnownPatches(image) {
  const base = image.slice();
  for (const p of KNOWN_PATCHES) {
    if (p.offset + 4 <= base.length && be32(base, p.offset) === p.patched) {
      setBe32(base, p.offset, p.original);
    }
  }
  return base;
}
export async function imageBlocks(image) {
  const base = image.slice();
  for (const p of KNOWN_PATCHES) {
    if (p.offset + 4 <= base.length && be32(base, p.offset) === p.patched) {
      setBe32(base, p.offset, p.original);
    }
  }
  const blocks = [];
  for (let at = 0; at < base.length; at += IMAGE_BLOCK) {
    blocks.push((await sha256(base.subarray(at, Math.min(at + IMAGE_BLOCK, base.length)))).slice(0, 16));
  }
  return blocks;
}

// The same, from the executable file. null when its image cannot be read (then only the file fingerprint counts).
async function imageFingerprint(xex, decompressLzx) {
  try {
    const { image } = await readXexImage(xex, decompressLzx || (() => {
      throw new Error('no LZX step');
    }));
    return await fingerprintImage(image);
  } catch {
    return null;
  }
}

// Whether a build was compiled from this image: without patches, the image itself; with patches, the same base and
// the same patches.
function builtFromImage(build, image) {
  const wanted = build.patches || [];
  if (!wanted.length) {
    return build.image_sha256 === image.asIs;
  }
  return build.image_sha256 === image.base && wanted.length === image.patches.length &&
    wanted.every((name) => image.patches.includes(name));
}

// The LZX step of readXexImage, done by libmspack compiled to WebAssembly.
export function lzxStep(lzx) {
  return async (compressed, bits, size) => {
    lzx.FS.writeFile('/image.lzx', compressed);
    const rc = lzx.callMain(['/image.lzx', '/image.bin', String(bits), String(size)]);
    if (rc) {
      throw new Error(`LZX decompression failed (${rc})`);
    }
    const out = lzx.FS.readFile('/image.bin');
    lzx.FS.unlink('/image.lzx');
    lzx.FS.unlink('/image.bin');
    return out;
  };
}

// Fan translations keep the file names of the disc they were made from; they are told apart by a data file (and,
// with `also`, by a second one that must be there too), or by a known patch of their executable.
const TRANSLATIONS = [
  { path: 'nfs/zzdata0.bin', size: 387301706, language: 'russian' },
  // made from the PAL Spanish disc; its texts use Brazilian words (salvar, controle, tela)
  { path: 'nfs/zzdata0.bin', size: 363659264, language: 'brazilian' },
  // made from the PAL English disc (its NFS/ZZDATA0.BIN); its default.xex is rebuilt without encryption or
  // compression, with one branch patched: the subtitle patch, which only this translation makes
  { path: 'default.xex', size: 13447168, also: { path: 'nfs/zzdata0.bin', size: 381569024 }, language: 'polish' },
  { patch: 'subtitles', also: { path: 'nfs/zzdata0.bin', size: 381569024 }, language: 'polish' },
];

// Language and region from the movie names, e.g. "attract_movie_spanish_pal.wmv" -> spanish / pal.
// patches: the known patches found in the executable (only looked for when its file fingerprint is unknown).
export function detectLanguage(files, patches = []) {
  const has = ({ path, size }) => files.some((f) => f.path.toLowerCase() === path && f.size === size);
  for (const known of TRANSLATIONS) {
    if ((known.patch ? patches.includes(known.patch) : has(known)) && (!known.also || has(known.also))) {
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
// executableOnly also accepts default.xex alone, without the Movies and NFS folders: enough to name its edition or to
// make its report, not to make a package. `complete` says whether the whole game is there.
// An executable whose file fingerprint is unknown may still be a known program rebuilt by another tool (without
// encryption or compression, or with a known patch): then its decompressed image names the build. decompressLzx is
// the LZX step (lzxStep) for images that are compressed; without it only uncompressed ones can be recognised.
// Returns { xex, xexHash, image (its fingerprints when they were needed, or null), build (null when unsupported or
// incomplete), edition (the known edition of this executable, or null), languages, complete }.
export async function identifyGame(files, manifest, { executableOnly = false, decompressLzx = null } = {}) {
  const xexFile = files.find((f) => f.path.toLowerCase() === 'default.xex');
  const complete = Boolean(xexFile) && files.some((f) => /^nfs\//i.test(f.path)) &&
    files.some((f) => /^movies\//i.test(f.path));
  if (!xexFile || (!complete && !executableOnly)) {
    const error = new Error(t('incomplete'));
    error.code = 'incomplete';
    throw error;
  }
  const xex = await xexFile.read(0, xexFile.size);
  const xexHash = await sha256(xex);
  let sameExecutable = manifest.builds.filter((b) => b.xex_sha256 === xexHash);
  let image = null;
  if (!sameExecutable.length) {
    image = await imageFingerprint(xex, decompressLzx);
    if (image) {
      sameExecutable = manifest.builds.filter((b) => b.image_sha256 && builtFromImage(b, image));
    }
    // An executable with the same code but other data is NOT accepted on its own: the build turned the switch jump
    // tables (in the data sections) into fixed targets and used .pdata and the exception tables to find functions, so
    // other data could need another build. The report lists the 64 KiB blocks that differ (imageBlocks); a variant
    // checked by hand gets its own image_sha256 in the manifest.
  }
  const onThisDisc = (b) =>
    Object.entries(b.disc || {}).every(([path, size]) =>
      files.some((f) => f.path.toLowerCase() === path.toLowerCase() && f.size === size));
  const build = complete ? sameExecutable.find(onThisDisc) || null : null;
  const edition = sameExecutable.length ? sameExecutable[0].edition : null;
  let languages = detectLanguage(files, image ? image.patches : []);
  // an edition whose movies are in another language names its own ("language": "korean (NTSC)"); a known fan
  // translation of its disc still wins
  if (sameExecutable.length && sameExecutable[0].language && !/\(translation\)$/.test(languages[0] || '')) {
    languages = [sameExecutable[0].language];
  }
  return { xex, xexHash, image, build, edition, languages, complete };
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
  const { xex, xexHash, build, edition, languages } = await identifyGame(files, release.manifest,
    { decompressLzx: lzxStep(modules.lzx) });
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

  const { image } = await readXexImage(xex, lzxStep(modules.lzx));
  const executable = new ContainerScanner('xex_');
  executable.scanWhole('default.xex', image);

  const game = files.filter((f) => isGameFile(f.path)).sort((a, b) => a.path.toLowerCase().localeCompare(b.path.toLowerCase()));
  const copies = update ? [] : game;
  onSize(zipSize([
    { path: `${ROOT}/nfsmw-nx.nro`, size: release.nro.length },
    { path: `${ROOT}/nfsmw.toml`, size: release.toml.length },
    ...copies.map((f) => ({ path: `${ROOT}/game_root/${f.path}`, size: f.size })),
    { path: `${ROOT}/nfsmw_shaders.nfsp`, size: build.library_size },
  ]));
  const zip = new ZipWriter(sink);
  await zip.addBytes(`${ROOT}/nfsmw-nx.nro`, release.nro);
  await zip.addBytes(`${ROOT}/nfsmw.toml`, release.toml);

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

// The three shaders that the Switch build recognises by their XXH3 fingerprint. Between editions they keep their
// code (the microcode, after the container header) but not always their header, so they are found by the SHA-256 of
// that code. The composition one is also the shader that gets the blur switch (blurShader above).
const SPECIAL_SHADERS = [
  ['Bright pass', 'd7731e147a9a59f54dfd0e2e560b36e4d24c30f5baef8b44a241e75174672302'],
  ['Sky', '06899397e1322a8a7f23f24e9f146fbd84e98e7fd815eb15bf6a907ccceb40a7'],
  ['Composition', 'd57235b8e8f6313addff194a8da56040ed27475a1ece110cf7f1a02ff3b6901b'],
];

// The XXH3 fingerprint of every shader in a library, by the SHA-256 of its container. nfsmw_shaders.nfsp is a
// 24-byte header and then, for each shader: container size, SPIR-V words, fingerprint, container and SPIR-V.
async function libraryFingerprints(library) {
  const view = new DataView(library.buffer, library.byteOffset, library.byteLength);
  const count = view.getUint32(12, true);
  const hex = (value) => value.toString(16).toUpperCase().padStart(8, '0');
  const found = new Map();
  let at = 24;
  for (let i = 0; i < count; i++) {
    const size = view.getUint32(at, true);
    const words = view.getUint32(at + 4, true);
    const fingerprint = hex(view.getUint32(at + 12, true)) + hex(view.getUint32(at + 8, true));
    found.set(await sha256(library.subarray(at + 16, at + 16 + size)), fingerprint);
    at += 16 + size + words * 4;
  }
  return found;
}

// A text report for an edition that has no Switch build yet: what the manifest and the build need from this game
// (the fingerprints of the executable, of its shader library and of the three special shaders) and the list of its
// files. It holds no game data, only fingerprints, sizes and file names, so the player can send it to us.
// With default.xex alone it only describes the executable: the library and the special shaders come from the disc.
// release: { manifest, shaderCommon }; modules: { hlsl, dxc, pack, lzx }.
export async function createReport(files, release, modules, log = () => {}, progress = () => {}) {
  const { xex, xexHash, edition, languages, complete } = await identifyGame(files, release.manifest,
    { executableOnly: true, decompressLzx: lzxStep(modules.lzx) });
  const { image } = await readXexImage(xex, lzxStep(modules.lzx));
  const imagePrints = await fingerprintImage(image);
  // the code of the executable alone: a fan translation that only changes data keeps that of its edition
  const codePrints = await codeFingerprint(image);
  const sameCode = codePrints ? release.manifest.builds.filter((b) => b.code_sha256 === codePrints.sha256) : [];
  // An unknown executable: which 64 KiB blocks differ from the closest known image, and in which sections. That is
  // what we check by hand before a variant (a fan translation's texts) can use the build of its edition.
  const blockLines = [];
  if (!edition) {
    // the image with the known patches put back, as the manifest blocks were made
    const unpatched = image.slice();
    for (const p of KNOWN_PATCHES) {
      if (p.offset + 4 <= unpatched.length && be32(unpatched, p.offset) === p.patched) {
        setBe32(unpatched, p.offset, p.original);
      }
    }
    const blocks = await imageBlocks(image);
    let closest = null;
    let differing = null;
    for (const b of release.manifest.builds) {
      if (!b.image_blocks || b.image_blocks.length !== blocks.length) {
        continue;
      }
      const diff = blocks.map((h, i) => (h === b.image_blocks[i] ? -1 : i)).filter((i) => i >= 0);
      if (!differing || diff.length < differing.length) {
        closest = b;
        differing = diff;
      }
    }
    if (closest) {
      blockLines.push(`  Closest known image: ${closest.edition}, ${differing.length} of ${blocks.length} blocks of ` +
        `${IMAGE_BLOCK / 1024} KiB differ (each with the first 8 hex digits of the SHA-256 of its 1 KiB parts, so we ` +
        'can find the parts that changed against our own copy)');
      for (const i of differing.slice(0, 64)) {
        const from = i * IMAGE_BLOCK;
        const to = Math.min(from + IMAGE_BLOCK, image.length);
        const names = codePrints ? codePrints.sections.filter((s) => s.address < to && s.address + s.size > from)
          .map((s) => s.name) : [];
        blockLines.push(`    0x${from.toString(16).padStart(7, '0')}-0x${(to - 1).toString(16).padStart(7, '0')}` +
          ` ${[...new Set(names)].join(' ') || '(headers or padding)'}`);
        const parts = [];
        for (let at = from; at < to; at += 1024) {
          parts.push((await sha256(unpatched.subarray(at, Math.min(at + 1024, to)))).slice(0, 8));
        }
        blockLines.push(`      ${parts.join(' ')}`);
      }
      if (differing.length > 64) {
        blockLines.push(`    ... and ${differing.length - 64} more`);
      }
    } else {
      blockLines.push('  Closest known image: none of the same size');
    }
  }
  // the path of the program database names the compilation, e.g. ...\MWJapanRelease\NfsMWJapanRelease.pdb
  const pdb = /[A-Za-z]:\\[\x20-\x7e]{1,200}?\.pdb/i.exec(new TextDecoder('latin1').decode(image));
  const executable = new ContainerScanner('xex_');
  executable.scanWhole('default.xex', image);

  // the same files in the same order as the package, so the containers get the same names
  const game = files.filter((f) => isGameFile(f.path)).sort((a, b) => a.path.toLowerCase().localeCompare(b.path.toLowerCase()));
  const read = game.filter(holdsShaders);
  const total = read.reduce((sum, f) => sum + f.size, 0);
  const disc = new ContainerScanner('');
  let done = 0;
  for (const f of read) {
    disc.beginFile(f.path, f.size);
    let seen = 0;
    for await (const chunk of chunksOf(f)) {
      seen += chunk.length;
      done += chunk.length;
      disc.push(chunk, seen >= f.size);
      progress(done / total);
    }
    log(t('read', { path: f.path }));
  }
  const containers = [...disc.found, ...executable.found];
  if (complete) {
    log(t('foundShaders', { count: containers.length }));
  }

  const special = new Map(SPECIAL_SHADERS.map(([name]) => [name, []]));
  for (const c of containers) {
    const code = await sha256(c.bytes.subarray(be32(c.bytes, 4)));
    for (const [name, microcode] of SPECIAL_SHADERS) {
      if (code === microcode) {
        special.get(name).push(c);
      }
    }
  }
  const composition = special.get('Composition')[0];
  let library = null;
  let libraryError = 'only default.xex was chosen, without the disc files';
  if (complete) {
    try {
      library = await buildShaderLibrary(containers, modules, release.shaderCommon, log,
        composition ? composition.name.slice(0, -4) : '');
    } catch (error) {
      libraryError = error.message || String(error);
    }
  }
  const fingerprints = library ? await libraryFingerprints(library) : new Map();

  const zzdata = files.find((f) => f.path.toLowerCase() === 'nfs/zzdata0.bin');
  const lines = [
    'nfsmw-nx edition report',
    `Made by the installer page (manifest ${release.manifest.version}). It holds no game data: only fingerprints, ` +
      'sizes and file names.',
    '',
    'Executable',
    `  default.xex SHA-256: ${xexHash}`,
    `  default.xex size: ${xex.length} bytes`,
    `  Image SHA-256: ${imagePrints.asIs} (${image.length} bytes)`,
    `  Known patches: ${imagePrints.patches.join(', ') || 'none'}` +
      (imagePrints.patches.length ? ` (image SHA-256 without them: ${imagePrints.base})` : ''),
    `  Compilation: ${pdb ? pdb[0] : 'not found'}`,
    `  Code SHA-256: ${codePrints ? codePrints.sha256 : 'no section table'}`,
    `  Same code as: ${sameCode.length ? [...new Set(sameCode.map((b) => b.edition))].join(', ') : 'no known edition'}`,
    `  Known edition: ${edition || 'none'}`,
    ...blockLines,
    '',
    'Disc',
  ];
  if (complete) {
    lines.push(
      `  Languages (from the movie names): ${languages.join(', ') || 'unknown'}`,
      `  NFS/ZZDATA0.BIN: ${zzdata ? `${zzdata.size} bytes` : 'not found'}`,
      `  Game files: ${game.length} (${game.reduce((sum, f) => sum + f.size, 0)} bytes)`);
  } else {
    lines.push('  Not chosen: only default.xex, without the Movies and NFS folders');
  }
  lines.push(
    '',
    'Shader library',
    `  Containers: ${containers.length} (${disc.found.length} on the disc, ${executable.found.length} in the executable)`);
  if (library) {
    lines.push(`  SHA-256: ${await sha256(library)}`, `  Size: ${library.length} bytes`);
  } else {
    lines.push(`  Not built: ${libraryError}`);
  }
  lines.push(`  Composition container SHA-256: ${composition ? await sha256(composition.bytes) : 'not found'}`, '',
    'Shaders recognised by fingerprint (XXH3)');
  for (const [name, found] of special) {
    const each = [];
    for (const c of found) {
      each.push(`${c.name.slice(0, -4)} ${fingerprints.get(await sha256(c.bytes)) || '(no library)'}`);
    }
    lines.push(`  ${name}: ${each.join(', ') || 'not found'}`);
  }
  lines.push('', 'Files (path and size in bytes)', ...game.map((f) => `  ${f.path}  ${f.size}`), '');
  return lines.join('\n');
}
