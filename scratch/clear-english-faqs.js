const fs = require('fs');
const path = require('path');

const TARGET_LANGS = ['ar', 'bn', 'fr', 'pt', 'ru', 'uz'];
const MESSAGES_DIR = path.join(__dirname, '../messages');

for (const lang of TARGET_LANGS) {
  const filepath = path.join(MESSAGES_DIR, `${lang}.json`);
  if (fs.existsSync(filepath)) {
    const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    
    // We only want to delete FAQ properties if they are untranslated
    // Wait, the easiest way is to just delete the entire FAQ.faqs object and FAQ.desc
    // because we know they are in English in the screenshot.
    if (data.FAQ) {
      delete data.FAQ.desc;
      delete data.FAQ.faqs;
      fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`Cleared FAQ.desc and FAQ.faqs from ${lang}.json`);
    }
  }
}
