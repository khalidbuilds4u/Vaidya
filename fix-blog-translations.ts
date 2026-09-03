import 'dotenv/config';
import * as fs from 'fs';

async function getTranslateText(): Promise<(text: string, lang: string) => Promise<string>> {
  const mod = await import('./src/lib/translator');
  return mod.translateText;
}

async function translateObject(obj: any, lang: string, translateText: Function): Promise<any> {
  if (typeof obj === 'string') {
    const result = await translateText(obj, lang);
    await new Promise(r => setTimeout(r, 80));
    return result || obj;
  }
  if (typeof obj === 'object' && obj !== null) {
    const result: any = {};
    for (const [k, v] of Object.entries(obj)) {
      result[k] = await translateObject(v, lang, translateText);
    }
    return result;
  }
  return obj;
}

const blogEn = {
  hero: {
    badge: "Medical Insights",
    heading: "Our Blog",
    subheading: "Expert articles on health, treatments, and medical tourism."
  },
  empty: {
    heading: "No Articles Yet",
    desc: "We are currently writing some amazing content. Check back shortly!"
  },
  readArticle: "Read Article",
  noImage: "No Image",
  by: "By"
};

async function main() {
  const translateText = await getTranslateText();

  // Add to en.json
  const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
  en.Blog = blogEn;
  fs.writeFileSync('messages/en.json', JSON.stringify(en, null, 2));
  console.log('✓ Updated en.json');

  const locales = ['ar', 'bn', 'fr', 'pt', 'ru', 'uz'];
  for (const lang of locales) {
    console.log(`Translating Blog for ${lang}...`);
    const translated = await translateObject(blogEn, lang, translateText);
    const content = JSON.parse(fs.readFileSync(`messages/${lang}.json`, 'utf8'));
    content.Blog = translated;
    fs.writeFileSync(`messages/${lang}.json`, JSON.stringify(content, null, 2));
    console.log(`✓ Updated ${lang}.json`);
  }
  console.log('\nAll done!');
}

main().catch(console.error);
