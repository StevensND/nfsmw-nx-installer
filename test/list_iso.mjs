// Lists the files of an ISO with their sizes. Usage: node list_iso.mjs <iso>
import fs from 'node:fs';
import { listIsoFiles } from '../lib/iso.js';

const files = await listIsoFiles(await fs.openAsBlob(process.argv[2]));
for (const f of files) {
  console.log(`${f.size}\t${f.path}`);
}
