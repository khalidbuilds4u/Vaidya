require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const translate = require('translate');

translate.engine = 'google';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function translateText(text, toLanguage = 'ar') {
  if (!text) return undefined;
  try {
    const result = await translate(text, { from: 'en', to: toLanguage });
    return result;
  } catch (error) {
    console.error(`Failed to translate: ${text.substring(0, 20)}`, error);
    return undefined;
  }
}

async function buildTranslations(englishFields, existingTranslations = {}) {
  const translations = JSON.parse(JSON.stringify(existingTranslations || {}));
  const targetLanguages = ['ar', 'bn', 'fr', 'pt', 'ru', 'uz'];

  for (const lang of targetLanguages) {
    if (!translations[lang]) translations[lang] = {};

    for (const [field, text] of Object.entries(englishFields)) {
      if (!text) continue;

      if (!translations[lang][field] || (Array.isArray(translations[lang][field]) && translations[lang][field].length === 0)) {
        if (Array.isArray(text)) {
          const validTranslations = [];
          for (const item of text) {
            const translated = await translateText(item, lang);
            if (translated) validTranslations.push(translated);
            await new Promise(resolve => setTimeout(resolve, 100)); // Google rate limit safety
          }
          if (validTranslations.length > 0) translations[lang][field] = validTranslations;
        } else {
          const translated = await translateText(text, lang);
          if (translated) translations[lang][field] = translated;
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
    }
  }

  return translations;
}

async function main() {
  console.log("Translating Specialties...");
  const specialties = await prisma.specialty.findMany();
  for (const s of specialties) {
    console.log("Specialty:", s.name);
    const trans = await buildTranslations({ name: s.name, description: s.description || '' }, s.translations);
    await prisma.specialty.update({ where: { id: s.id }, data: { translations: trans } });
  }

  console.log("Translating Doctors (names and qualifications only for speed)...");
  const doctors = await prisma.doctor.findMany();
  for (const d of doctors) {
    console.log("Doctor:", d.name);
    const trans = await buildTranslations({ 
      name: d.name, 
      qualifications: d.qualifications,
      // For doctors, we'll just fix name and qualifications to be fast and address the immediate bug.
      // Other fields can be translated asynchronously by the main backfill process if needed.
    }, d.translations);
    await prisma.doctor.update({ where: { id: d.id }, data: { translations: trans } });
  }

  console.log("Done!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
