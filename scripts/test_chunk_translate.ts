import translate from 'translate';

translate.engine = 'google';

async function translateText(text, toLanguage = 'ar') {
  if (!text) return undefined;
  
  try {
    // If text is short, translate it directly
    if (text.length < 150) {
      return await translate(text, { from: 'en', to: toLanguage });
    }
    
    // Otherwise, chunk by sentences to avoid breaking the free API
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    let translatedText = '';
    
    for (const sentence of sentences) {
      const trimmed = sentence.trim();
      if (!trimmed) continue;
      
      const res = await translate(trimmed, { from: 'en', to: toLanguage });
      translatedText += res + ' ';
      
      // Wait to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    return translatedText.trim();
  } catch (error) {
    console.error(`Failed to translate text:`, error);
    return undefined;
  }
}

async function testTranslation() {
  const text = "Dr. Hitesh Garg is a highly skilled and experienced Orthopedic Spine Surgeon with over 15 years of expertise in treating a wide range of spinal conditions. Known for his patient-centric approach, he combines advanced surgical techniques with compassionate care to deliver the best possible outcomes. He has successfully treated both national and international patients, making him a trusted name in spine care.";
  try {
    const result = await translateText(text, 'ar');
    console.log("Success:");
    console.log(result);
  } catch (error) {
    console.error("Error:");
    console.error(error);
  }
}
testTranslation();
