import 'dotenv/config';
import * as fs from 'fs';

async function getTranslateText() {
  const mod = await import('./src/lib/translator');
  return mod.translateText;
}

// Check if a string is practically untranslated (equals EN string, not a number, longer than 1 char)
function isUntranslated(enStr: any, targetStr: any) {
  if (typeof enStr !== 'string' || typeof targetStr !== 'string') return false;
  if (enStr === targetStr) {
    if (!isNaN(Number(enStr))) return false;
    if (enStr.length <= 1) return false;
    return true;
  }
  return false;
}

async function processTranslations(enNode: any, targetNode: any, locale: string, translateText: Function): Promise<boolean> {
  let updated = false;

  if (typeof enNode === 'object' && enNode !== null) {
    if (Array.isArray(enNode)) {
      for (let i = 0; i < enNode.length; i++) {
        if (targetNode[i] === undefined) targetNode[i] = typeof enNode[i] === 'object' ? (Array.isArray(enNode[i]) ? [] : {}) : enNode[i];
        
        if (typeof enNode[i] === 'string') {
          if (isUntranslated(enNode[i], targetNode[i])) {
            console.log(`Translating: "${enNode[i].substring(0, 30)}..." to ${locale}`);
            targetNode[i] = await translateText(enNode[i], locale);
            await new Promise(r => setTimeout(r, 80));
            updated = true;
          }
        } else {
          const childUpdated = await processTranslations(enNode[i], targetNode[i], locale, translateText);
          if (childUpdated) updated = true;
        }
      }
    } else {
      for (const key of Object.keys(enNode)) {
        if (targetNode[key] === undefined) targetNode[key] = typeof enNode[key] === 'object' ? (Array.isArray(enNode[key]) ? [] : {}) : enNode[key];

        if (typeof enNode[key] === 'string') {
          if (isUntranslated(enNode[key], targetNode[key])) {
            console.log(`Translating: "${enNode[key].substring(0, 30)}..." to ${locale}`);
            targetNode[key] = await translateText(enNode[key], locale);
            await new Promise(r => setTimeout(r, 80));
            updated = true;
          }
        } else {
          const childUpdated = await processTranslations(enNode[key], targetNode[key], locale, translateText);
          if (childUpdated) updated = true;
        }
      }
    }
  }
  return updated;
}

async function main() {
  const translateText = await getTranslateText();
  const locales = ['ar', 'bn', 'fr', 'pt', 'ru', 'uz'];
  const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));

  for (const locale of locales) {
    console.log(`\n--- Scanning locale: ${locale} ---`);
    const targetFile = `messages/${locale}.json`;
    const targetData = JSON.parse(fs.readFileSync(targetFile, 'utf8'));

    const wasUpdated = await processTranslations(en, targetData, locale, translateText);

    if (wasUpdated) {
      fs.writeFileSync(targetFile, JSON.stringify(targetData, null, 2));
      console.log(`✓ Saved updates to ${locale}.json`);
    } else {
      console.log(`No missing translations found for ${locale}.json`);
    }
  }
  
  console.log('\nAll done!');
}

main().catch(console.error);
