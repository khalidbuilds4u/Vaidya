import fs from 'fs';
import path from 'path';

function updateJson(filePath: string, dataToMerge: any) {
  const absolutePath = path.resolve(filePath);
  const content = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
  
  content.SpecialtyDetail.hero = {
    ...content.SpecialtyDetail.hero,
    ...dataToMerge.hero
  };
  
  content.SpecialtyDetail.mockTreatments = dataToMerge.mockTreatments;
  content.SpecialtyDetail.mockConditions = dataToMerge.mockConditions;
  
  fs.writeFileSync(absolutePath, JSON.stringify(content, null, 2) + '\n');
  console.log(`Updated ${filePath}`);
}

const enData = {
  hero: {
    fallbackOverview: "{name} is a specialized branch of medicine dealing with specific aspects of healthcare. Our partner hospitals in India provide world-class treatments using state-of-the-art technology."
  },
  mockTreatments: {
    consultation: { name: "{name} Consultation", desc: "Comprehensive evaluation and diagnosis by top {name} experts." },
    diagnostics: { name: "Advanced Diagnostics", desc: "State-of-the-art diagnostic procedures for precise medical planning." },
    surgery: { name: "Minimally Invasive Surgery", desc: "Advanced surgical techniques resulting in less pain and faster recovery." },
    interventions: { name: "Complex Interventions", desc: "High-precision complex procedures performed by highly experienced specialists." }
  },
  mockConditions: {
    general1: { name: "General {name} Disorders", desc: "Comprehensive care for a wide range of common {name} conditions." },
    general2: { name: "Chronic {name} Conditions", desc: "Long-term management and specialized treatment for chronic cases." },
    general3: { name: "Acute {name} Emergencies", desc: "Rapid response and critical care for severe acute conditions." }
  }
};

const arData = {
  hero: {
    fallbackOverview: "يعتبر {name} فرعاً متخصصاً من فروع الطب يتعامل مع جوانب محددة من الرعاية الصحية. تقدم المستشفيات الشريكة لنا في الهند علاجات عالمية المستوى باستخدام أحدث التقنيات."
  },
  mockTreatments: {
    consultation: { name: "استشارة {name}", desc: "تقييم شامل وتشخيص من قبل كبار خبراء {name}." },
    diagnostics: { name: "التشخيص المتقدم", desc: "إجراءات تشخيصية حديثة لتخطيط طبي دقيق." },
    surgery: { name: "جراحة طفيفة التوغل", desc: "تقنيات جراحية متقدمة تؤدي إلى ألم أقل وتعافٍ أسرع." },
    interventions: { name: "تدخلات معقدة", desc: "إجراءات معقدة وعالية الدقة ينفذها أخصائيون ذوو خبرة عالية." }
  },
  mockConditions: {
    general1: { name: "اضطرابات {name} العامة", desc: "رعاية شاملة لمجموعة واسعة من حالات {name} الشائعة." },
    general2: { name: "حالات {name} المزمنة", desc: "إدارة طويلة الأمد وعلاج متخصص للحالات المزمنة." },
    general3: { name: "طوارئ {name} الحادة", desc: "استجابة سريعة ورعاية حرجة للحالات الحادة الشديدة." }
  }
};

updateJson('messages/en.json', enData);
updateJson('messages/ar.json', arData);
