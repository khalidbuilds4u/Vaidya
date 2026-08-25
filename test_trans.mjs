import translate from 'translate';
translate.engine = 'google';
try {
  const result = await translate("Highly Experienced", { from: 'en', to: 'ar' });
  console.log("Success:", result);
} catch (e) {
  console.error("Error:", e);
}
