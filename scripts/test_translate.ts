import translate from 'translate';

translate.engine = 'google';

async function testTranslation() {
  const text = "Dr. Hitesh Garg is a highly skilled and experienced Orthopedic Spine Surgeon with over 15 years of expertise in treating a wide range of spinal conditions. Known for his patient-centric approach, he combines advanced surgical techniques with compassionate care to deliver the best possible outcomes. He has successfully treated both national and international patients, making him a trusted name in spine care.";
  try {
    const result = await translate(text, { from: 'en', to: 'ar' });
    console.log("Success:");
    console.log(result);
  } catch (error) {
    console.error("Error:");
    console.error(error);
  }
}
testTranslation();
