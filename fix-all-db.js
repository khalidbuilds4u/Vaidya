const { Client } = require('pg');
const translate = require('translate');
require('dotenv').config({ path: '.env' });

translate.engine = 'google';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function translateText(text) {
  if (!text) return text;
  let retries = 3;
  while (retries > 0) {
    try {
      const res = await translate(text, { from: 'en', to: 'ar' });
      return res;
    } catch (e) {
      console.log("Translation failed, retrying in 2s...", e.message);
      retries--;
      await sleep(2000);
    }
  }
  return text; // fallback to English if it completely fails
}

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  
  const res = await client.query("SELECT id, name, biography, qualifications, \"medicalQualifications\", \"professionalExperience\", \"areasOfExpertise\", \"allTreatments\", \"specialInterests\", \"fellowshipsAndTraining\", \"researchPublications\", \"awardsRecognitions\", \"professionalMemberships\", \"whyChooseThisDoctor\", translations FROM \"Doctor\"");
  
  const fields = [
    { key: 'name', type: 'string' },
    { key: 'biography', type: 'string' },
    { key: 'qualifications', type: 'string' },
    { key: 'medicalQualifications', type: 'array' },
    { key: 'professionalExperience', type: 'array' },
    { key: 'areasOfExpertise', type: 'array' },
    { key: 'allTreatments', type: 'array' },
    { key: 'specialInterests', type: 'array' },
    { key: 'fellowshipsAndTraining', type: 'array' },
    { key: 'researchPublications', type: 'array' },
    { key: 'awardsRecognitions', type: 'array' },
    { key: 'professionalMemberships', type: 'array' },
    { key: 'whyChooseThisDoctor', type: 'array' }
  ];

  for (const doc of res.rows) {
    console.log("Processing:", doc.name);
    let trans = typeof doc.translations === 'string' ? JSON.parse(doc.translations) : doc.translations;
    if (!trans) trans = { ar: {} };
    if (!trans.ar) trans.ar = {};

    let modified = false;

    for (const field of fields) {
      const englishValue = doc[field.key];
      if (!englishValue) continue;

      if (field.type === 'string') {
        if (!trans.ar[field.key] || trans.ar[field.key] === englishValue) {
          console.log(`  Translating string field: ${field.key}`);
          const result = await translateText(englishValue);
          if (result && result !== englishValue) {
            trans.ar[field.key] = result;
            modified = true;
          }
          await sleep(500);
        }
      } else if (field.type === 'array') {
        if (!trans.ar[field.key] || !Array.isArray(trans.ar[field.key]) || trans.ar[field.key].length === 0 || trans.ar[field.key][0] === englishValue[0]) {
          console.log(`  Translating array field: ${field.key} (${englishValue.length} items)`);
          const arr = [];
          for (const item of englishValue) {
            const result = await translateText(item);
            arr.push(result || item);
            await sleep(500);
          }
          trans.ar[field.key] = arr;
          modified = true;
        }
      }
    }

    if (modified) {
      console.log(`  -> Saving ${doc.name}...`);
      await client.query("UPDATE \"Doctor\" SET translations = $1 WHERE id = $2", [JSON.stringify(trans), doc.id]);
    } else {
      console.log(`  -> Already fully translated!`);
    }
  }
  
  await client.end();
}
run().catch(console.error);
