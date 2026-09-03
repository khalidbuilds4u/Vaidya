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
  const locales = ['bn', 'fr', 'pt', 'ru', 'uz'];
  
  const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
  const arraysToTranslate = {
    whatWeDoList: en.AboutUs.whatWeDo.list,
    approachItems: en.AboutUs.approach.items,
    whyChooseUsItems: en.AboutUs.whyChooseUs.items,
  };

  for (const lang of locales) {
    console.log(`Translating AboutUs arrays for ${lang}...`);
    const translatedArrays = await translateObject(arraysToTranslate, lang, translateText);
    
    const content = JSON.parse(fs.readFileSync(`messages/${lang}.json`, 'utf8'));
    content.AboutUs.whatWeDo.list = translatedArrays.whatWeDoList;
    content.AboutUs.approach.items = translatedArrays.approachItems;
    content.AboutUs.whyChooseUs.items = translatedArrays.whyChooseUsItems;
    
    fs.writeFileSync(`messages/${lang}.json`, JSON.stringify(content, null, 2));
    console.log(`✓ Updated ${lang}.json`);
  }
  
  console.log('\nAll done!');
}

main().catch(console.error);
