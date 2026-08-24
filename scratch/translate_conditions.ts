import { prisma } from '../src/lib/prisma';

const conditionTranslations: Record<string, any> = {
  // Orthopedics
  'osteoarthritis': {
    name: 'هشاشة العظام',
    description: 'تآكل غضروف المفصل بمرور الوقت.'
  },
  'rheumatoid-arthritis': {
    name: 'التهاب المفاصل الروماتويدي',
    description: 'مرض التهابي مزمن يؤثر على المفاصل.'
  },
  'post-traumatic-arthritis': {
    name: 'التهاب المفاصل بعد الصدمة',
    description: 'التهاب المفاصل الناجم عن إصابة سابقة في الركبة.'
  },
  
  // Cardiology
  'coronary-artery-disease': {
    name: 'مرض الشريان التاجي (CAD)',
    description: 'تضيق أو انسداد الشرايين التاجية.'
  },
  'heart-attack': {
    name: 'نوبة قلبية',
    description: 'انسداد مفاجئ لتدفق الدم إلى جزء من القلب.'
  },
  'angina': {
    name: 'الذبحة الصدرية',
    description: 'ألم في الصدر بسبب انخفاض تدفق الدم إلى القلب.'
  },
  
  // Neurology
  'brain-tumor': {
    name: 'ورم الدماغ',
    description: 'نمو غير طبيعي للخلايا في الدماغ، يمكن أن يكون حميدًا أو خبيثًا.'
  },
  'glioblastoma': {
    name: 'الورم الأرومي الدبقي',
    description: 'نوع عدواني من السرطان يمكن أن يحدث في الدماغ أو الحبل الشوكي.'
  },
  'meningioma': {
    name: 'الورم السحائي',
    description: 'ورم ينشأ من السحايا، الأغشية المحيطة بالدماغ.'
  }
};

async function main() {
  for (const [slug, arData] of Object.entries(conditionTranslations)) {
    const condition = await prisma.condition.findUnique({
      where: { slug }
    });

    if (condition) {
      const existing = (condition.translations as any) || {};
      existing.ar = {
        ...existing.ar,
        ...arData
      };

      await prisma.condition.update({
        where: { slug },
        data: { translations: existing }
      });
      console.log(`Translated condition: ${slug}`);
    }
  }
  console.log("Finished translating conditions!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
