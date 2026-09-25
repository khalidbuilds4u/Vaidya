import * as fs from 'fs';

const locales = ['ar', 'bn', 'fr', 'pt', 'ru', 'uz'];
const tagline = "Where Global Trust Meets World-Class Healing";

for (const locale of locales) {
  const file = `messages/${locale}.json`;
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  
  if (data.Hero) data.Hero.tagline = tagline;
  if (data.Footer) data.Footer.tagline = tagline;
  
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log(`Reverted tagline in ${locale}.json`);
}
