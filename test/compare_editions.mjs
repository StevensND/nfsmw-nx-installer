// Compares the executable image and the file list of two editions (ISO files).
// Usage: node compare_editions.mjs <reference.iso> <other.iso>
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import createLzxModule from '../wasm/lzx.mjs';
import { listIsoFiles } from '../lib/iso.js';
import { readXexImage } from '../lib/xex.js';

const lzx = await createLzxModule({ print: () => {}, printErr: () => {} });
const sha = (b) => createHash('sha256').update(b).digest('hex').slice(0, 16);

async function load(isoPath) {
  const files = await listIsoFiles(await fs.openAsBlob(isoPath));
  const xexFile = files.find((f) => f.path.toLowerCase() === 'default.xex');
  const xex = await xexFile.read(0, xexFile.size);
  const { image } = await readXexImage(xex, async (compressed, bits, size) => {
    lzx.FS.writeFile('/i.lzx', compressed);
    if (lzx.callMain(['/i.lzx', '/i.bin', String(bits), String(size)])) throw new Error('LZX failed');
    const out = lzx.FS.readFile('/i.bin');
    lzx.FS.unlink('/i.lzx');
    lzx.FS.unlink('/i.bin');
    return out;
  });
  const view = new DataView(image.buffer, image.byteOffset, image.byteLength);
  const pe = view.getUint32(0x3c, true);
  const count = view.getUint16(pe + 6, true);
  const optional = view.getUint16(pe + 20, true);
  const sections = [];
  for (let i = 0; i < count; i++) {
    const at = pe + 24 + optional + i * 40;
    const name = String.fromCharCode(...image.subarray(at, at + 8)).replace(/\0+$/, '');
    sections.push({ name, vsize: view.getUint32(at + 8, true), vaddr: view.getUint32(at + 12, true) });
  }
  return { files, xexSize: xexFile.size, xexHash: sha(xex), image, sections };
}

const [a, b] = await Promise.all(process.argv.slice(2, 4).map(load));
console.log(`XEX: ${a.xexSize} bytes (${a.xexHash}) vs ${b.xexSize} bytes (${b.xexHash})`);
console.log(`image: ${a.image.length} vs ${b.image.length} bytes; identical: ${sha(a.image) === sha(b.image)}`);
for (const s of a.sections) {
  const t = b.sections.find((x) => x.name === s.name && x.vaddr === s.vaddr);
  const bytesA = a.image.subarray(s.vaddr, s.vaddr + s.vsize);
  if (!t) {
    console.log(`  ${s.name.padEnd(9)} ${s.vaddr.toString(16)} only in the first`);
    continue;
  }
  const bytesB = b.image.subarray(t.vaddr, t.vaddr + t.vsize);
  let diff = 0;
  for (let i = 0; i < Math.min(bytesA.length, bytesB.length); i++) if (bytesA[i] !== bytesB[i]) diff++;
  console.log(`  ${s.name.padEnd(9)} at ${s.vaddr.toString(16).padStart(7)} size ${s.vsize} vs ${t.vsize}: ${diff} bytes differ`);
}
const names = (x) => new Map(x.files.map((f) => [f.path.toLowerCase(), f.size]));
const na = names(a);
const nb = names(b);
const onlyA = [...na.keys()].filter((k) => !nb.has(k));
const onlyB = [...nb.keys()].filter((k) => !na.has(k));
const sizeDiff = [...na.keys()].filter((k) => nb.has(k) && nb.get(k) !== na.get(k));
console.log(`files: ${na.size} vs ${nb.size}; only in the first: ${onlyA.length}, only in the second: ${onlyB.length}, same name with other size: ${sizeDiff.length}`);
console.log('  only in the second (first 8):', onlyB.slice(0, 8).join(', '));
console.log('  other size:', sizeDiff.slice(0, 12).map((k) => `${k} ${na.get(k)}->${nb.get(k)}`).join(', '));
