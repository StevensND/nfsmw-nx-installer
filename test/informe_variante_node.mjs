// Prints the report of a changed executable (only default.xex, without the disc): the Polish one with a word changed
// in .data and another in .rdata. Usage: node informe_variante_node.mjs <Polish default.xex>
import fs from 'node:fs';
import createLzxModule from '../wasm/lzx.mjs';
import { createReport } from '../lib/installer.js';

const manifest = JSON.parse(fs.readFileSync(new URL('../release/manifest.json', import.meta.url)));
const lzx = await createLzxModule({ print: () => {}, printErr: () => {} });
const polish = new Uint8Array(fs.readFileSync(process.argv[2]));
const imageStart = ((polish[8] << 24) | (polish[9] << 16) | (polish[10] << 8) | polish[11]) >>> 0;
const xex = polish.slice();
new DataView(xex.buffer).setUint32(imageStart + 0x8d0100, 0x12345678);
new DataView(xex.buffer).setUint32(imageStart + 0x1000, 0x41424344);
const files = [{ path: 'default.xex', size: xex.length, read: async (o, n) => xex.slice(o, o + n) }];
const report = await createReport(files, { manifest, shaderCommon: new Uint8Array(0) }, { lzx });
console.log(report.split('\n').slice(0, 22).join('\n'));
