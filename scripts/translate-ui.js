const fs = require('fs');
const path = require('path');
const https = require('https');

// The language you want to translate to
const TARGET_LANG = 'ar';
// Path to your messages folder
const MESSAGES_DIR = path.join(__dirname, '../messages');

// DeepL API Key from environment or passed via command line
const API_KEY = process.env.DEEPL_API_KEY;

if (!API_KEY) {
  console.error('\n❌ Error: DEEPL_API_KEY environment variable is missing.');
  console.log('Please get a free API key from https://www.deepl.com/pro-api');
  console.log('Usage: DEEPL_API_KEY=your_key node scripts/translate-ui.js\n');
  process.exit(1);
}

// Determine if using Free or Pro API
const isPro = !API_KEY.endsWith(':fx');
const API_HOST = isPro ? 'api.deepl.com' : 'api-free.deepl.com';

/**
 * Deep merge to ensure all objects exist
 */
function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Recursively find missing keys between source (en.json) and target (ar.json).
 * Keeps track of the path so we can inject the translated string back in.
 */
function findMissingKeys(source, target, currentPath = '') {
  let missing = [];

  for (const key in source) {
    const newPath = currentPath ? `${currentPath}.${key}` : key;
    
    if (isObject(source[key])) {
      if (!target[key]) target[key] = {};
      missing = missing.concat(findMissingKeys(source[key], target[key], newPath));
    } else if (typeof source[key] === 'string') {
      // If it's missing in the target, or if the target is just an empty string
      if (target[key] === undefined || target[key] === null || target[key] === '') {
        missing.push({ path: newPath, text: source[key] });
      }
    }
  }
  return missing;
}

/**
 * Helper to set a value at a nested path (e.g. 'Hero.title' -> obj.Hero.title = val)
 */
function setNestedValue(obj, pathString, value) {
  const parts = pathString.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) current[parts[i]] = {};
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
}

/**
 * Send request to DeepL API
 */
async function translateBatch(texts) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      text: texts,
      target_lang: TARGET_LANG.toUpperCase()
    });

    const options = {
      hostname: API_HOST,
      path: '/v2/translate',
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data).translations.map(t => t.text));
        } else {
          reject(new Error(`DeepL API Error: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function run() {
  console.log(`\n🔍 Starting Auto-Translation (English -> ${TARGET_LANG})`);
  
  const enPath = path.join(MESSAGES_DIR, 'en.json');
  const targetPath = path.join(MESSAGES_DIR, `${TARGET_LANG}.json`);

  if (!fs.existsSync(enPath)) {
    console.error(`❌ Source file not found: ${enPath}`);
    process.exit(1);
  }

  const enJson = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  let targetJson = {};
  
  if (fs.existsSync(targetPath)) {
    targetJson = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
  }

  const missing = findMissingKeys(enJson, targetJson);
  
  if (missing.length === 0) {
    console.log('✅ Your Arabic file is already 100% up to date. Nothing to translate!');
    process.exit(0);
  }

  console.log(`📝 Found ${missing.length} missing translations.`);
  
  // DeepL allows up to 50 texts per request. We'll batch them to be safe.
  const BATCH_SIZE = 50;
  for (let i = 0; i < missing.length; i += BATCH_SIZE) {
    const batch = missing.slice(i, i + BATCH_SIZE);
    const textsToTranslate = batch.map(m => m.text);
    
    console.log(`⏳ Translating batch ${Math.floor(i/BATCH_SIZE) + 1} of ${Math.ceil(missing.length/BATCH_SIZE)}...`);
    
    try {
      const translatedTexts = await translateBatch(textsToTranslate);
      
      batch.forEach((item, index) => {
        setNestedValue(targetJson, item.path, translatedTexts[index]);
      });
      
      // Save after each successful batch so we don't lose progress if it crashes
      fs.writeFileSync(targetPath, JSON.stringify(targetJson, null, 2), 'utf8');
    } catch (error) {
      console.error('❌ Translation failed:', error.message);
      process.exit(1);
    }
  }

  console.log('✨ All translations completed and saved successfully!\n');
}

run();
