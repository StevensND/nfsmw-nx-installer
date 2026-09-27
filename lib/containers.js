// Finds original Xbox 360 shader containers (2005 layout, signature 10 2A 0E 00/01) inside game files.
// Same rules as the reference extractor: every byte position is tested, and a match is accepted when its
// header sizes are consistent. Names are "<p|v>_<counter>" with one counter across all scanned files.

const MAX_CONTAINER = 65536;
const LOOKAHEAD = MAX_CONTAINER + 24;

function be32(data, offset) {
  return ((data[offset] << 24) | (data[offset + 1] << 16) | (data[offset + 2] << 8) | data[offset + 3]) >>> 0;
}

export class ContainerScanner {
  constructor(infix = '') {
    this.infix = infix;
    this.count = 0;
    this.found = [];
  }

  // Scans one file delivered in chunks. `fileSize` is the whole file size; chunks must arrive in order.
  beginFile(name, fileSize) {
    this.fileName = name;
    this.fileSize = fileSize;
    this.carry = new Uint8Array(0);
    this.carryOffset = 0;
  }

  push(chunk, final = false) {
    let data;
    if (this.carry.length) {
      data = new Uint8Array(this.carry.length + chunk.length);
      data.set(this.carry, 0);
      data.set(chunk, this.carry.length);
    } else {
      data = chunk;
    }
    const base = this.carryOffset;
    // Positions whose 24-byte header and largest possible body are fully available can be decided now.
    const limit = final ? data.length : Math.max(0, data.length - LOOKAHEAD);
    for (let i = 0; i < limit; i++) {
      if (data[i] !== 0x10 || data[i + 1] !== 0x2a || data[i + 2] !== 0x0e || data[i + 3] > 1) {
        continue;
      }
      if (i + 24 > data.length) {
        continue;
      }
      const v = be32(data, i + 4);
      const f = be32(data, i + 8);
      const c = be32(data, i + 16);
      const s = be32(data, i + 20);
      const remaining = this.fileSize - (base + i);
      if (v < 24 || v + f > MAX_CONTAINER || v + f > remaining || c < 24 || c >= v || s < 24 || s + 24 > v || !f) {
        continue;
      }
      if (i + v + f > data.length) {
        continue;
      }
      const kind = data[i + 3] ? 'v' : 'p';
      const name = `${kind}_${this.infix}${String(this.count).padStart(6, '0')}.bin`;
      this.found.push({ name, file: this.fileName, offset: base + i, bytes: data.slice(i, i + v + f) });
      this.count++;
    }
    this.carry = data.slice(limit);
    this.carryOffset = base + limit;
    if (final) {
      this.carry = new Uint8Array(0);
    }
  }

  scanWhole(name, data) {
    this.beginFile(name, data.length);
    this.push(data, true);
  }
}
