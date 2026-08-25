import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const doctor = await prisma.doctor.findFirst({ where: { slug: 'dr-viney-jetley-1787491065608' }});
  if (!doctor) return console.log('not found');
  
  const translations = doctor.translations as any || { ar: {} };
  translations.ar = translations.ar || {};
  
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

  await prisma.doctor.update({
    where: { id: doctor.id },
    data: { translations }
  });
  console.log('Fixed Dr Viney Jetley!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
