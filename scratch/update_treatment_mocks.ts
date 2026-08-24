import fs from 'fs';
import path from 'path';

function updateJson(filePath: string, dataToMerge: any) {
  const absolutePath = path.resolve(filePath);
  const content = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
  
  content.TreatmentDetail = {
    ...content.TreatmentDetail,
    mockArrays: dataToMerge.mockArrays
  };
  
  fs.writeFileSync(absolutePath, JSON.stringify(content, null, 2) + '\n');
  console.log(`Updated ${filePath}`);
}

const enData = {
  mockArrays: {
    causesAndSymptoms: [
      "Symptoms specific to the condition requiring this treatment",
      "Failure of conservative management or medications",
      "Deterioration of quality of life or physical function"
    ],
    diagnosis: [
      "Standard diagnostic imaging (X-ray, MRI, CT Scan)",
      "Comprehensive blood and laboratory tests",
      "Specialist physical examination"
    ],
    preOpPrep: [
      "Complete physical examination to ensure surgical fitness",
      "Adjusting current medications",
      "Pre-operative fasting and preparation"
    ],
    postOpCare: [
      "Observation in the recovery or intensive care unit",
      "Physical or occupational therapy (if applicable)",
      "Strict wound care and medication management",
      "Gradual return to normal activities"
    ],
    procedureDetails: [
      "Anesthesia is administered.",
      "The surgical site is prepared and incisions are made.",
      "The specific medical intervention is performed.",
      "Implants or corrections are verified.",
      "The incision is closed and bandaged."
    ],
    risks: [
      "Infection",
      "Bleeding or blood clots",
      "Adverse reaction to anesthesia",
      "Nerve damage"
    ],
    faqs: [
      { question: "How long does recovery take?", answer: "Recovery varies by patient but typically takes a few weeks to months depending on the procedure." },
      { question: "Is this procedure safe?", answer: "Yes, our partner hospitals use state-of-the-art technology and the procedures are performed by highly experienced specialists." }
    ]
  }
};

const arData = {
  mockArrays: {
    causesAndSymptoms: [
      "الأعراض الخاصة بالحالة التي تتطلب هذا العلاج",
      "فشل الإدارة التحفظية أو الأدوية",
      "تدهور نوعية الحياة أو الوظيفة البدنية"
    ],
    diagnosis: [
      "التصوير التشخيصي القياسي (الأشعة السينية، التصوير بالرنين المغناطيسي، الأشعة المقطعية)",
      "تحاليل الدم والمختبر الشاملة",
      "فحص بدني متخصص"
    ],
    preOpPrep: [
      "فحص بدني كامل للتأكد من اللياقة الجراحية",
      "تعديل الأدوية الحالية",
      "الصيام والاستعداد قبل العملية"
    ],
    postOpCare: [
      "المراقبة في وحدة الإنعاش أو العناية المركزة",
      "العلاج الطبيعي أو المهني (إذا لزم الأمر)",
      "العناية الصارمة بالجروح وإدارة الأدوية",
      "العودة التدريجية إلى الأنشطة الطبيعية"
    ],
    procedureDetails: [
      "يتم إعطاء التخدير.",
      "يتم تجهيز موقع الجراحة وعمل الشقوق.",
      "يتم تنفيذ التدخل الطبي المحدد.",
      "يتم التحقق من الغرسات أو التصحيحات.",
      "يتم إغلاق الشق ووضع الضمادات."
    ],
    risks: [
      "العدوى",
      "النزيف أو جلطات الدم",
      "رد فعل سلبي للتخدير",
      "تلف الأعصاب"
    ],
    faqs: [
      { question: "كم من الوقت يستغرق التعافي؟", answer: "يختلف التعافي من مريض لآخر ولكنه يستغرق عادة من بضعة أسابيع إلى أشهر حسب الإجراء." },
      { question: "هل هذا الإجراء آمن؟", answer: "نعم، تستخدم المستشفيات الشريكة لنا أحدث التقنيات ويتم إجراء العمليات بواسطة متخصصين ذوي خبرة عالية." }
    ]
  }
};

updateJson('messages/en.json', enData);
updateJson('messages/ar.json', arData);
