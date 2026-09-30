// Checks how the page identifies rebuilt executables: the same program in another file (another fingerprint), with
// and without the Polish subtitle patch, and a changed program. It makes the variants in memory from the real files.
// Usage: node rebuilt_executables_node.mjs <PAL English default.xex> <Polish default.xex> <PAL Spanish default.xex>
import fs from 'node:fs';
import createLzxModule from '../wasm/lzx.mjs';
import { identifyGame, lzxStep } from '../lib/installer.js';

const [englishPath, polishPath, spanishPath] = process.argv.slice(2);
const manifest = JSON.parse(fs.readFileSync(new URL('../release/manifest.json', import.meta.url)));
const decompressLzx = lzxStep(await createLzxModule({ print: () => {}, printErr: () => {} }));
const english = new Uint8Array(fs.readFileSync(englishPath));
const polish = new Uint8Array(fs.readFileSync(polishPath));
const spanish = new Uint8Array(fs.readFileSync(spanishPath));

// A disc with this executable: only default.xex is read; the other files only need a name and a size.
function disc(xex, zzdata0, movie) {
  const none = async () => new Uint8Array(0);
  return [
    { path: 'default.xex', size: xex.length, read: async (offset, length) => xex.slice(offset, offset + length) },
    { path: 'NFS/ZZDATA0.BIN', size: zzdata0, read: none },
    { path: `Movies/${movie}`, size: 1, read: none },
  ];
}
const european = (xex) => disc(xex, 381569024, 'attract_movie_english_pal.wmv');

// The Polish executable is not encrypted nor compressed: its image starts right after the headers.
const imageStart = ((polish[8] << 24) | (polish[9] << 16) | (polish[10] << 8) | polish[11]) >>> 0;
const withWord = (xex, imageOffset, word) => {
  const copy = xex.slice();
  new DataView(copy.buffer).setUint32(imageStart + imageOffset, word);
  return copy;
};
const polishLonger = new Uint8Array(polish.length + 16);
polishLonger.set(polish);

const cases = [
  ['PAL English, original', european(english), 'nfsmw-nx-pal-en.nro', 'english (PAL)'],
  ['Polish, as published', european(polish), 'nfsmw-nx-pal-pl.nro', 'polish (translation)'],
  ['Polish, another file (16 bytes more)', european(polishLonger), 'nfsmw-nx-pal-pl.nro', 'polish (translation)'],
  // still the Polish tool's file (by its size), but its program is the English one: the English build, no subtitles
  ['Polish without the subtitle patch', european(withWord(polish, 0x28753c, 0x419a0010)), 'nfsmw-nx-pal-en.nro',
    'polish (translation)'],
  ['Polish with other code changed', european(withWord(polish, 0x100000, 0x60000000)), null, null],
  ['PAL Spanish, original', disc(spanish, 369948672, 'attract_movie_spanish_pal.wmv'), 'nfsmw-nx-pal-es.nro',
    'spanish (PAL)'],
];
let failures = 0;
for (const [name, files, nro, language] of cases) {
  const game = await identifyGame(files, manifest, { decompressLzx });
  const got = game.build ? game.build.nro : null;
  const ok = got === nro && (!nro || game.languages[0] === language);
  failures += ok ? 0 : 1;
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${name}: ${got || 'not supported'}, ${game.languages[0] || 'no language'}` +
    `${game.image ? `, by its image (patches: ${game.image.patches.join(', ') || 'none'})` : ', by its file'}`);
}
console.log(failures ? `${failures} failed` : 'all passed');
process.exit(failures ? 1 : 0);
