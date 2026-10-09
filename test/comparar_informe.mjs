// Reads a player's edition report and our own copy of the closest edition's default.xex, and prints the 1 KiB parts of
// each differing block that changed (offset in the image, section, and what our copy holds there: code, text or
// other data), so a fan translation's changes can be checked by hand. Nothing of the player's game is needed.
// Usage: node comparar_informe.mjs <report.txt> <our default.xex of that edition>
import fs from 'node:fs';
import crypto from 'node:crypto';
import createLzxModule from '../wasm/lzx.mjs';
import { codeFingerprint, lzxStep } from '../lib/installer.js';
import { readXexImage } from '../lib/xex.js';

const [reportPath, xexPath] = process.argv.slice(2);
const report = fs.readFileSync(reportPath, 'utf8').split(/\r?\n/);
const lzx = await createLzxModule({ print: () => {}, printErr: () => {} });
const { image } = await readXexImage(new Uint8Array(fs.readFileSync(xexPath)), lzxStep(lzx));
const { sections } = await codeFingerprint(image);
const sectionAt = (at) => (sections.find((s) => at >= s.address && at < s.address + s.size) || { name: '(none)' }).name;
// printable text share of a part: high in string tables
const textShare = (bytes) => bytes.filter((b) => (b >= 0x20 && b < 0x7f) || b === 0).length / bytes.length;

let changed = 0;
for (let i = 0; i < report.length; i++) {
  const m = /^\s+0x([0-9a-f]+)-0x([0-9a-f]+)\s/.exec(report[i]);
  if (!m || !report[i + 1]) {
    continue;
  }
  const from = parseInt(m[1], 16);
  const theirs = report[i + 1].trim().split(/\s+/);
  for (let k = 0; k < theirs.length; k++) {
    const at = from + k * 1024;
    const part = image.subarray(at, Math.min(at + 1024, image.length));
    const ours = crypto.createHash('sha256').update(part).digest('hex').slice(0, 8);
    if (ours !== theirs[k]) {
      changed++;
      console.log(`0x${at.toString(16).padStart(7, '0')} ${sectionAt(at).padEnd(8)} text ${(textShare(part) * 100).toFixed(0)} %`);
    }
  }
}
console.log(`${changed} parts of 1 KiB changed`);
