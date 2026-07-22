const fs = require('fs');

function getJpgSize(filePath) {
  const fd = fs.openSync(filePath, 'r');
  const buffer = Buffer.alloc(1024);
  const bytesRead = fs.readSync(fd, buffer, 0, 1024, 0);
  fs.closeSync(fd);
  
  let offset = 2;
  while (offset < bytesRead) {
    if (buffer[offset] === 0xFF && (buffer[offset+1] === 0xC0 || buffer[offset+1] === 0xC2)) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7)
      };
    }
    offset += 2 + buffer.readUInt16BE(offset + 2);
  }
  return null;
}

function getPngSize(filePath) {
  const fd = fs.openSync(filePath, 'r');
  const buffer = Buffer.alloc(24);
  fs.readSync(fd, buffer, 0, 24, 0);
  fs.closeSync(fd);
  
  if (buffer.toString('hex', 0, 8) !== '89504e470d0a1a0a') {
    return null;
  }
  
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  };
}

const portfolioCode = fs.readFileSync('src/components/Portfolio.tsx', 'utf8');
const indexCode = fs.readFileSync('src/routes/index.tsx', 'utf8');

const usedImages = new Set();
const portfolioImages = [];

const addUsed = (code, storeList) => {
  const matches = code.match(/import (img\d+) from ["']@\/assets\/images\/([^"']+)["']/g);
  if (matches) {
    for (const match of matches) {
      const parts = match.match(/import (img\d+) from ["']@\/assets\/images\/([^"']+)["']/);
      usedImages.add(parts[2]);
      if (storeList) storeList.push({ name: parts[1], file: parts[2] });
    }
  }
}
addUsed(portfolioCode, portfolioImages);
addUsed(indexCode, null);

const dir = 'src/assets/images/';
const files = fs.readdirSync(dir).filter(f => !fs.statSync(dir+f).isDirectory());

const unused = [];
for (const file of files) {
  if (!usedImages.has(file)) {
    if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
       const size = getJpgSize(dir+file);
       if (size && size.height >= size.width) { 
         unused.push(file);
       }
    } else if (file.endsWith('.png')) {
       const size = getPngSize(dir+file);
       if (size && size.height >= size.width) {
         unused.push(file);
       }
    }
  }
}

const screenshots = [];
for (const img of portfolioImages) {
  const file = img.file;
  let size;
  if (file.endsWith('.png')) size = getPngSize(dir+file);
  else size = getJpgSize(dir+file);
  
  if (size && size.width > size.height) {
    screenshots.push({ name: img.name, file: img.file, w: size.width, h: size.height });
  }
}

console.log("=== SCREENSHOTS IN PORTFOLIO (Landscape) ===");
console.log(screenshots);
console.log("\n=== UNUSED PORTRAIT PHOTOS ===");
console.log(unused);
