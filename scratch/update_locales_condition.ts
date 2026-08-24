import fs from 'fs';
import path from 'path';

function updateJson(filePath: string, key: string, data: any) {
  const absolutePath = path.resolve(filePath);
  const content = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
  content[key] = data;
  fs.writeFileSync(absolutePath, JSON.stringify(content, null, 2) + '\n');
  console.log(`Updated ${filePath}`);
}

const conditionEn = {
  causes: "Causes & Symptoms",
  causesDesc: "Understanding the primary indicators and root causes of this condition:",
  diagnosis: "Diagnosis & Evaluation",
  diagnosisDesc: "Common methods used by specialists to accurately diagnose {name}:",
  treatments: "Treatment Options",
  treatmentsDesc: "Depending on the severity, the following treatments may be recommended:",
  relatedProcedures: "Popular {name} Procedures",
  viewDetails: "View procedure details",
  topSpecialists: "Top Specialists for {name}",
  bestHospitals: "Best Hospitals for {name}",
  faqs: "Frequently Asked Questions",
  needOpinion: "Need a Medical Opinion?",
  shareReports: "Share your medical reports with our experts to get a free medical opinion and precise treatment plan from multiple top hospitals.",
  requestOpinion: "Request Medical Opinion",
  freeConfidential: "100% Free & Confidential"
};

const conditionAr = {
  causes: "الأسباب والأعراض",
  causesDesc: "فهم المؤشرات الأولية والأسباب الجذرية لهذه الحالة:",
  diagnosis: "التشخيص والتقييم",
  diagnosisDesc: "الطرق الشائعة التي يستخدمها المتخصصون لتشخيص {name} بدقة:",
  treatments: "خيارات العلاج",
  treatmentsDesc: "اعتمادًا على الشدة، قد يوصى بالعلاجات التالية:",
  relatedProcedures: "إجراءات {name} الشائعة",
  viewDetails: "عرض تفاصيل الإجراء",
  topSpecialists: "أفضل المتخصصين لـ {name}",
  bestHospitals: "أفضل المستشفيات لـ {name}",
  faqs: "الأسئلة الشائعة",
  needOpinion: "هل تحتاج إلى رأي طبي؟",
  shareReports: "شارك تقاريرك الطبية مع خبرائنا للحصول على رأي طبي مجاني وخطة علاج دقيقة من أفضل المستشفيات.",
  requestOpinion: "طلب رأي طبي",
  freeConfidential: "مجاني وسري 100%"
};

updateJson('messages/en.json', 'ConditionDetail', conditionEn);
updateJson('messages/ar.json', 'ConditionDetail', conditionAr);
