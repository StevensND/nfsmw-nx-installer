// Saves the decompressed executable image of an ISO. Usage: node save_image.mjs <iso> <output image>
import fs from 'node:fs';
import createLzxModule from '../wasm/lzx.mjs';
import { listIsoFiles } from '../lib/iso.js';
import { readXexImage } from '../lib/xex.js';
const [iso, out] = process.argv.slice(2);
const lzx = await createLzxModule({ print: () => {}, printErr: () => {} });
const files = await listIsoFiles(await fs.openAsBlob(iso));
const x = files.find((f) => f.path.toLowerCase() === 'default.xex');
const { image } = await readXexImage(await x.read(0, x.size), async (c, bits, size) => {
  lzx.FS.writeFile('/i.lzx', c);
  if (lzx.callMain(['/i.lzx', '/i.bin', String(bits), String(size)])) throw new Error('LZX failed');
  return lzx.FS.readFile('/i.bin');
});
fs.writeFileSync(out, image);
console.log(out, image.length);
