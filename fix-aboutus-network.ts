import 'dotenv/config';
import * as fs from 'fs';

async function getTranslateText() {
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

const networkExtrasEn = {
  globalStandards: "Global Standards",
  accredited: "Internationally Accredited Facilities",
  specialists: "World-Renowned Specialists"
};

async function main() {
  const translateText = await getTranslateText();
  const locales = ['en', 'ar', 'bn', 'fr', 'pt', 'ru', 'uz'];

  for (const lang of locales) {
    const content = JSON.parse(fs.readFileSync(`messages/${lang}.json`, 'utf8'));
    if (lang === 'en') {
      content.AboutUs.network = { ...content.AboutUs.network, ...networkExtrasEn };
    } else {
      console.log(`Translating network extras for ${lang}...`);
      const translated = await translateObject(networkExtrasEn, lang, translateText);
      content.AboutUs.network = { ...content.AboutUs.network, ...translated };
    }
    fs.writeFileSync(`messages/${lang}.json`, JSON.stringify(content, null, 2));
    console.log(`✓ Updated ${lang}.json`);
  }
  console.log('\nAll done!');
}

main().catch(console.error);
