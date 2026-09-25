import 'dotenv/config';
import { translateText } from './src/lib/translator';
import * as fs from 'fs';

const translations: Record<string, { question: string; answer: string }[]> = {};

const englishFaqs = [
  {
    question: "How long does recovery take?",
    answer: "Recovery varies by patient but typically takes a few weeks to months depending on the procedure."
  },
  {
    question: "Is this procedure safe?",
    answer: "Yes, our partner hospitals use state-of-the-art technology and the procedures are performed by highly experienced specialists."
  }
];

const locales = ['ar', 'bn', 'fr', 'pt', 'ru', 'uz'];

async function main() {
  for (const lang of locales) {
    console.log(`Translating FAQs for ${lang}...`);
    const translatedFaqs = [];
    for (const faq of englishFaqs) {
      const q = await translateText(faq.question, lang);
      await new Promise(r => setTimeout(r, 200));
      const a = await translateText(faq.answer, lang);
      await new Promise(r => setTimeout(r, 200));
      translatedFaqs.push({ question: q || faq.question, answer: a || faq.answer });
    }
    translations[lang] = translatedFaqs;
    console.log(`Done ${lang}:`, JSON.stringify(translatedFaqs, null, 2));
  }

  // Patch each locale file
  for (const lang of locales) {
    const filePath = `messages/${lang}.json`;
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Navigate to the faqs array inside TreatmentDetail.mockArrays.faqs
    if (content.TreatmentDetail?.mockArrays?.faqs) {
      content.TreatmentDetail.mockArrays.faqs = translations[lang];
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
      console.log(`✓ Updated ${lang}.json`);
    } else {
      console.warn(`⚠ Could not find TreatmentDetail.mockArrays.faqs in ${lang}.json`);
    }
  }

  console.log('All done!');
}

main().catch(console.error);
