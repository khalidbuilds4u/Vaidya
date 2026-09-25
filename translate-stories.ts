import 'dotenv/config';
import { prisma } from './src/lib/prisma';
import { translateText } from './src/lib/translator';

async function main() {
  const locales = ['ar', 'bn', 'fr', 'pt', 'ru', 'uz'];
  const stories = await prisma.patientStory.findMany();

  console.log(`Found ${stories.length} stories.`);

  for (const story of stories) {
    console.log(`\nProcessing story: ${story.title}`);
    const translations = (story.translations as Record<string, any>) || {};
    let updated = false;

    for (const locale of locales) {
      if (!translations[locale]) {
        console.log(` Translating to ${locale}...`);
        
        try {
          const transTitle = await translateText(story.title, locale);
          await new Promise(r => setTimeout(r, 100)); // sleep
          const transContent = await translateText(story.content, locale);
          await new Promise(r => setTimeout(r, 100)); // sleep

          translations[locale] = {
            title: transTitle,
            content: transContent
          };
          updated = true;
          console.log(`   ✓ ${locale} done.`);
        } catch (e: any) {
          console.error(`   ✗ Error translating to ${locale}:`, e.message);
        }
      } else {
        console.log(` ◯ ${locale} already exists.`);
      }
    }

    if (updated) {
      await prisma.patientStory.update({
        where: { id: story.id },
        data: { translations }
      });
      console.log(`✓ Saved translations for: ${story.title}`);
    }
  }

  console.log('\nAll stories processed!');
}

main().catch(console.error);
