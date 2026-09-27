// Writes the shader containers of an ISO (disc + XEX, named like the reference set) into a folder.
import fs from 'node:fs';
import path from 'node:path';
import createLzxModule from '../wasm/lzx.mjs';
import { listIsoFiles } from '../lib/iso.js';
import { readXexImage } from '../lib/xex.js';
import { ContainerScanner } from '../lib/containers.js';
const [iso, out] = process.argv.slice(2);
const lzx = await createLzxModule({ print: () => {}, printErr: () => {} });
const files = await listIsoFiles(await fs.openAsBlob(iso));
const x = files.find((f) => f.path.toLowerCase() === 'default.xex');
const { image } = await readXexImage(await x.read(0, x.size), async (c, bits, size) => {
  lzx.FS.writeFile('/i.lzx', c);
  if (lzx.callMain(['/i.lzx', '/i.bin', String(bits), String(size)])) throw new Error('LZX failed');
  return lzx.FS.readFile('/i.bin');
});
const exe = new ContainerScanner('xex_');
exe.scanWhole('default.xex', image);
const disc = new ContainerScanner('');
for (const f of files.filter((q) => /^nfs\/[^/]+\.bin$/i.test(q.path)).sort((a, b) => a.path.toLowerCase().localeCompare(b.path.toLowerCase()))) {
  disc.beginFile(f.path, f.size);
  for (let o = 0; o < f.size; o += 16 << 20) {
    const chunk = await f.read(o, Math.min(16 << 20, f.size - o));
    disc.push(chunk, o + chunk.length >= f.size);
  }
}
for (const c of [...disc.found, ...exe.found]) fs.writeFileSync(path.join(out, c.name), c.bytes);
console.log(`${disc.found.length + exe.found.length} containers in ${out}`);
