// Copies one file out of an ISO. Usage: node extract_file.mjs <iso> <path inside the ISO> <output>
import fs from 'node:fs';
import { listIsoFiles } from '../lib/iso.js';

const [iso, inside, output] = process.argv.slice(2);
const files = await listIsoFiles(await fs.openAsBlob(iso));
const file = files.find((f) => f.path.toLowerCase() === inside.toLowerCase());
if (!file) {
  throw new Error(`${inside} is not in ${iso}`);
}
fs.writeFileSync(output, await file.read(0, file.size));
console.log(`${output}: ${file.size} bytes`);
