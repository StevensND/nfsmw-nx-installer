// Lists the PE sections of an executable's decompressed image (name, address, size, flags) and the SHA-256 of the
// executable ones together. Usage: node secciones_imagen.mjs <default.xex>...
import fs from 'node:fs';
import createLzxModule from '../wasm/lzx.mjs';
import { lzxStep, codeFingerprint } from '../lib/installer.js';
import { readXexImage } from '../lib/xex.js';

const lzx = await createLzxModule({ print: () => {}, printErr: () => {} });
for (const path of process.argv.slice(2)) {
  const xex = new Uint8Array(fs.readFileSync(path));
  const { image } = await readXexImage(xex, lzxStep(lzx));
  const code = await codeFingerprint(image);
  console.log(path);
  for (const s of code.sections) {
    console.log(`  ${s.name.padEnd(8)} at 0x${s.address.toString(16).padStart(8, '0')} size 0x${s.size.toString(16)}` +
      ` flags 0x${s.flags.toString(16)}${s.code ? '  code' : ''}`);
  }
  console.log(`  code SHA-256 ${code.sha256}`);
}
