import fs from 'fs';

const content = fs.readFileSync('src/lib/mockData.ts', 'utf8');
const urls = [...content.matchAll(/image:\s*'(https:\/\/images\.unsplash\.com\/[^']+)'/g)].map(m => m[1]);

console.log(`Checking ${urls.length} unique URLs...`);

for (const url of new Set(urls)) {
  const res = await fetch(url, { method: 'HEAD' });
  if (!res.ok) {
    console.log(`BROKEN: ${url} (${res.status})`);
  }
}
console.log('Done.');
