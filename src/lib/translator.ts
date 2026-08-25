import translate from 'translate';

// Configure the translate library to use Google's free engine
translate.engine = 'google';

/**
 * Translates an English string into a target language.
 * Currently defaults to Arabic ('ar').
 */
export async function translateText(text: string | null | undefined, toLanguage = 'ar'): Promise<string | undefined> {
  if (!text) return undefined;
  
  try {
    const result = await translate(text, { from: 'en', to: toLanguage });
    console.log(`Successfully translated "${text.substring(0, 20)}..." to:`, result);
    return result;
  } catch (error) {
    console.error(`Failed to translate text: "${text.substring(0, 50)}..."`, error);
    // If translation fails, we return undefined so we don't overwrite with garbage
    return undefined;
  }
}

/**
 * Helper to build the Prisma translations object.
 * Takes the English fields, translates them, and merges them with any manually provided translations.
 * 
 * Example usage:
 * const translations = await buildTranslations({
 *   name: 'Knee Replacement',
 *   description: 'Surgical procedure...'
 * }, manuallyProvidedTranslationsObject);
 */
export async function buildTranslations(
  englishFields: Record<string, string | string[] | null | undefined>,
  existingTranslations?: any
) {
  const translations: Record<string, any> = existingTranslations || {};
  
  // We want to translate to these languages (currently just Arabic, easy to add more)
  const targetLanguages = ['ar'];

  for (const lang of targetLanguages) {
    if (!translations[lang]) {
      translations[lang] = {};
    }

    for (const [field, text] of Object.entries(englishFields)) {
      if (!text) continue;

      // Only translate if the field isn't already manually provided for this language
      if (!translations[lang][field] || (Array.isArray(translations[lang][field]) && translations[lang][field].length === 0)) {
        if (Array.isArray(text)) {
          // Translate each string in the array sequentially to avoid rate limits
          const validTranslations = [];
          for (const item of text) {
            const translated = await translateText(item, lang);
            if (translated) validTranslations.push(translated);
            // Add a small 200ms delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 200));
          }
          if (validTranslations.length > 0) {
            translations[lang][field] = validTranslations;
          }
        } else {
          // Single string translation
          const translated = await translateText(text as string, lang);
          if (translated) {
            translations[lang][field] = translated;
          }
        }
      }
    }
  }

  // If after all this, the translations object is completely empty for all languages, return undefined
  let hasData = false;
  for (const lang in translations) {
    if (Object.keys(translations[lang]).length > 0) {
      hasData = true;
      break;
    }
  }

  return hasData ? translations : undefined;
}
