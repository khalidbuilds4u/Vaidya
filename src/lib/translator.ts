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
      } else {
        console.warn(`[DeepL] Failed with status ${response.status}. Falling back to free engine.`);
      }
    }

    // 2. Try OpenAI API if key is provided (Excellent contextual translation)
    if (process.env.OPENAI_API_KEY) {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: `You are a professional medical translator. Translate the following text from English to ${toLanguage}. Only return the translated text, nothing else.` },
            { role: 'user', content: text }
          ],
          temperature: 0.3
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
          console.log(`[OpenAI] Successfully translated "${text.substring(0, 20)}..."`);
          return data.choices[0].message.content.trim();
        }
      } else {
        console.warn(`[OpenAI] Failed with status ${response.status}. Falling back to free engine.`);
      }
    }

    // 3. Fallback to free Google engine (Unreliable for long text due to scraping/rate limits)
    const result = await translate(text, { from: 'en', to: toLanguage });
    console.log(`[Free Google] Successfully translated "${text.substring(0, 20)}..."`);
    return result;
  } catch (error) {
    console.error(`Failed to translate text: "${text.substring(0, 50)}..."`, error);
    // If all translations fail, return undefined so we don't overwrite with garbage
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
