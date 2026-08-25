const { Client } = require('pg');
require('dotenv').config({ path: '.env' });

async function run() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });
  await client.connect();
  
  const res = await client.query("SELECT id, translations FROM \"Doctor\" WHERE slug LIKE '%dr-viney-jetley%' LIMIT 1");
  if (res.rows.length === 0) return;
  
  const doc = res.rows[0];
  let translations = typeof doc.translations === 'string' ? JSON.parse(doc.translations) : doc.translations;
  if (!translations) translations = { ar: {} };
  if (!translations.ar) translations.ar = {};
  
  translations.ar.biography = "الدكتور فيني جيتلي هو طبيب قلب ذو خبرة عالية يتمتع بخبرة تزيد عن 37 عامًا. لقد أجرى بنجاح أكثر من 10000 إجراء تداخلي عبر مستشفيات مختلفة في جميع أنحاء الهند، بما في ذلك رأب الأوعية التاجية المعقدة وأكثر من 1000 عملية استئصال بالترددات الراديوية. تشمل مجالات خبرته إجراءات القلب الغازية مثل تصوير الأوعية، ووضع الدعامات، والاستئصال الدوراني، وزرع الأجهزة، بما في ذلك أجهزة تنظيم ضربات القلب، وأجهزة COMBO، وعلاجات الفيزيولوجيا الكهربية. يتمتع الدكتور جيتلي أيضًا بخبرة واسعة في قسطرة القلب للأطفال والتدخلات، مثل فغر الحاجز الأذيني بالبالون، وتوسيع الصمامات المتضيقة بالبالون، ووضع دعامات تضيق برزخ الأبهر، وإغلاق الأجهزة لعيب الحاجز الأذيني (ASD). حصل على وسام فيشيست سيفا المرموق من قبل رئيس الهند لعمله المتميز في طب القلب التداخلي والفيزيولوجيا الكهربية. يتواصل الدكتور فيني جيتلي مع المرضى وعائلاتهم بطريقة تجلب الراحة والسهولة. إن أسلوبه الودود ورعايته الصادقة تساعد المرضى، وخاصة الأطفال، على الشعور بالدعم طوال فترة علاجهم.";

  await client.query("UPDATE \"Doctor\" SET translations = $1 WHERE id = $2", [JSON.stringify(translations), doc.id]);
  
  console.log("Successfully updated Dr Viney Jetley biography!");
  
  await client.end();
}
run().catch(console.error);
