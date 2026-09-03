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
  if (Array.isArray(obj)) {
    const results = [];
    for (const item of obj) {
      results.push(await translateObject(item, lang, translateText));
    }
    return results;
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

async function main() {
  const translateText = await getTranslateText();
  const enServices = JSON.parse(fs.readFileSync('messages/en.json', 'utf8')).Services;
  const remaining = ['bn', 'fr', 'pt', 'ru', 'uz'];

  for (const lang of remaining) {
    console.log(`\nTranslating Services for ${lang}...`);
    const translated = await translateObject(enServices, lang, translateText);
    const content = JSON.parse(fs.readFileSync(`messages/${lang}.json`, 'utf8'));
    content.Services = translated;
    fs.writeFileSync(`messages/${lang}.json`, JSON.stringify(content, null, 2));
    console.log(`✓ Updated ${lang}.json`);
  }

  console.log('\nAll done!');
}

main().catch(console.error);
