const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

let modifiedFiles = 0;
walkDir('./src/app/[locale]/(patient)', function(filePath) {
  if (!filePath.endsWith('.tsx')) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Add getStrictTranslation to imports if not there and getTranslation is there
  if (content.includes('getTranslation') && !content.includes('getStrictTranslation')) {
    content = content.replace(/import {([^}]*)getTranslation([^}]*)} from '@\/lib\/utils';/, "import { $1getTranslation, getStrictTranslation$2 } from '@/lib/utils';");
  }

  // Replace qualifications
  content = content.replace(/qualifications=\{doctor\.qualifications \|\| undefined\}/g, "qualifications={getTranslation(doctor, 'qualifications', locale || (typeof resolvedParams !== 'undefined' ? resolvedParams.locale : 'en')) || undefined}");
  // Note: some files use `resolvedParams.locale`, some use `locale`. We'll just replace with `locale` as it's defined in most of these pages, but let's be careful.
  
  // It's safer to just do regex that captures the locale variable if it exists.
  // In doctors/page.tsx, it's `locale`.
  
  if (original !== content) {
    fs.writeFileSync(filePath, content);
    console.log('Modified', filePath);
    modifiedFiles++;
  }
});
console.log('Done', modifiedFiles);
