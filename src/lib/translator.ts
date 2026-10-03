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
    // 1. Try DeepL API if key is provided (Professional & Robust)
    if (process.env.DEEPL_API_KEY) {
      const isPro = process.env.DEEPL_API_KEY.endsWith(':fx') ? false : true;
      const url = isPro ? 'https://api.deepl.com/v2/translate' : 'https://api-free.deepl.com/v2/translate';
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: [text],
          target_lang: toLanguage.toUpperCase()
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.translations && data.translations.length > 0) {
          console.log(`[DeepL] Successfully translated "${text.substring(0, 20)}..."`);
          return data.translations[0].text;
        }
      } else if (response.status === 456) {
        throw new Error("DeepL translation limit exceeded. Please upgrade your DeepL plan to continue translating.");
      } else {
        console.warn(`[DeepL] Failed with status ${response.status}.`);
      }
    } else {
      console.warn("[Translate] DEEPL_API_KEY is not set. Translation skipped.");
    }

    // No fallbacks are allowed per user request, to ensure medical translation accuracy.
    return undefined;
  } catch (error: any) {
    if (error.message && error.message.includes('DeepL translation limit exceeded')) {
      console.warn("⚠️ DeepL translation limit exceeded. Translation skipped, saving in English only.");
    } else {
      console.error(`Failed to translate text: "${text.substring(0, 50)}..."`, error);
    }
    
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
  
  // We want to translate to these languages
  const targetLanguages = ['ar', 'bn', 'fr', 'pt', 'ru', 'uz'];

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
          // Add a small 200ms delay to avoid rate limiting for string fields too
          await new Promise(resolve => setTimeout(resolve, 200));
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
