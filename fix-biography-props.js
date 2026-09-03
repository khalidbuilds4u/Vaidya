const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src/app/[locale]/(patient)', function(filePath) {
  if (!filePath.endsWith('.tsx')) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace biography={getTranslation(doctor, 'biography', locale) || doctor.biography || undefined}
  // with biography={getStrictTranslation(doctor, 'biography', locale) || undefined}
  
  // It could be resolvedParams.locale or locale.
  content = content.replace(/biography=\{getTranslation\(doctor,\s*'biography',\s*([a-zA-Z0-9_.]+)\)\s*\|\|\s*doctor\.biography(\s*\|\|\s*undefined)?\}/g, "biography={getStrictTranslation(doctor, 'biography', $1) || undefined}");

  if (original !== content) {
    fs.writeFileSync(filePath, content);
    console.log('Modified biography in', filePath);
  }
});
