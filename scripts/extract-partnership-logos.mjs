import fs from 'node:fs';
import path from 'node:path';

const htmlPath = 'C:/Users/ROG/Downloads/Telegram Desktop/partnerships (1).html';
const outDir = path.join('public', 'partnerships', 'logos');

fs.mkdirSync(outDir, { recursive: true });

const html = fs.readFileSync(htmlPath, 'utf8');
const re = /medallion-img[^>]*src="(data:image\/[^;]+;base64,[^"]+)"/g;

let match;
let index = 0;

while ((match = re.exec(html)) !== null) {
  const dataUrl = match[1];
  const parts = dataUrl.match(/^data:image\/(\w+);base64,(.+)$/);
  if (!parts) continue;

  const ext = parts[1] === 'jpeg' ? 'jpg' : parts[1];
  const filename = `partner-${String(++index).padStart(2, '0')}.${ext}`;
  const buf = Buffer.from(parts[2], 'base64');
  fs.writeFileSync(path.join(outDir, filename), buf);
  console.log(filename, buf.length);
}

console.log('Total:', index);
