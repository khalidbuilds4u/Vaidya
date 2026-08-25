const { Client } = require('pg');
require('dotenv').config({ path: '.env' });

async function run() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });
  await client.connect();
  
  const res = await client.query("SELECT id, translations FROM \"Doctor\" WHERE slug LIKE '%dr-viney-jetley%' LIMIT 1");
  if (res.rows.length === 0) {
    console.log("Not found");
    return;
  }
  
  const doc = res.rows[0];
  let translations = typeof doc.translations === 'string' ? JSON.parse(doc.translations) : doc.translations;
  if (!translations) translations = { ar: {} };
  if (!translations.ar) translations.ar = {};
  
  translations.ar.medicalQualifications = [
    "دكتوراه في الطب (أمراض القلب)، معهد الدراسات العليا للتعليم الطبي والأبحاث (PGIMER).",
    "دكتوراه في الطب (الطب العام)، كلية الطب للقوات المسلحة.",
    "البورد الوطني (الطب العام)، المجلس الوطني للامتحانات.",
    "بكالوريوس طب وجراحة، من كلية الطب للقوات المسلحة."
  ];
  
  translations.ar.professionalExperience = [
    "مدير التدخلات القلبية، معهد فورتيس للقلب، أوخلا.",
    "ضابط طبي في القوات المسلحة الهندية لأكثر من عقدين.",
    "استشاري أمراض القلب في العديد من مستشفيات القوات المسلحة الممتازة.",
    "أستاذ مشارك سابق في الطب وأمراض القلب، كلية الطب للقوات المسلحة، بيون."
  ];

  translations.ar.areasOfExpertise = [
    "تصوير الأوعية التاجية",
    "قسطرة القلب",
    "زرع جهاز تنظيم ضربات القلب",
    "رأب الصمام التاجي",
    "تصوير الأوعية المحيطية"
  ];
  
  translations.ar.allTreatments = [
    "جراحة القلب المفتوح",
    "استبدال الصمام الأورطي",
    "تطعيم مجازة الشريان التاجي",
    "جراحة زراعة القلب"
  ];
  
  translations.ar.specialInterests = [
    "زرع أجهزة تنظيم ضربات القلب",
    "علاج أمراض القلب الهيكلية"
  ];
  
  translations.ar.fellowshipsAndTraining = [
    "زمالة في أمراض القلب التداخلية، مستشفى أرتيميس.",
    "زمالة الكلية الهندية لأمراض القلب (FICC)."
  ];
  
  translations.ar.researchPublications = [
    "مؤلف للعديد من الأوراق البحثية المنشورة في المجلات الطبية الوطنية والدولية.",
    "محاضر ضيف منتظم في مؤتمرات أمراض القلب الرئيسية في الهند وخارجها."
  ];
  
  translations.ar.awardsRecognitions = [
    "جائزة أفضل طبيب قلب لعام 2021، جوائز التميز الطبي العالمية.",
    "وسام الشرف للإنجازات المتميزة في مجال أمراض القلب، الجمعية الطبية الهندية."
  ];
  
  translations.ar.professionalMemberships = [
    "عضو دائم في جمعية أمراض القلب في الهند.",
    "عضو في المجلس الطبي الهندي."
  ];
  
  translations.ar.whyChooseThisDoctor = [
    "أكثر من عقدين من الخبرة المكثفة في التدخلات القلبية.",
    "سجل حافل بالنجاح في الحالات المعقدة.",
    "رعاية تعاطفية تركز على المريض وتضع سلامته أولاً."
  ];

  await client.query("UPDATE \"Doctor\" SET translations = $1 WHERE id = $2", [JSON.stringify(translations), doc.id]);
  
  console.log("Successfully updated Dr Viney Jetley!");
  
  await client.end();
}
run().catch(console.error);
