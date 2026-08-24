import { prisma } from '../src/lib/prisma';

const translationsData: Record<string, any> = {
  'knee-replacement': {
    hospitalStay: '3-5 أيام',
    treatsConditions: [
      { slug: 'osteoarthritis', name: 'هشاشة العظام', description: 'تآكل غضروف المفصل بمرور الوقت.' },
      { slug: 'rheumatoid-arthritis', name: 'التهاب المفاصل الروماتويدي', description: 'مرض التهابي مزمن يؤثر على المفاصل.' },
      { slug: 'post-traumatic-arthritis', name: 'التهاب المفاصل بعد الصدمة', description: 'التهاب المفاصل الناجم عن إصابة سابقة في الركبة.' }
    ],
    subTreatments: [
      { slug: 'total-knee-replacement', name: 'استبدال الركبة بالكامل (TKR)', image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070&auto=format&fit=crop', description: 'استبدال كل من جانبي مفصل الركبة.' },
      { slug: 'partial-knee-replacement', name: 'استبدال الركبة الجزئي', image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=2070&auto=format&fit=crop', description: 'استبدال جزء واحد فقط من الركبة التالفة.' }
    ]
  },
  'coronary-artery-bypass': {
    hospitalStay: '5-7 أيام',
    treatsConditions: [
      { slug: 'coronary-artery-disease', name: 'مرض الشريان التاجي (CAD)', description: 'تضيق أو انسداد الشرايين التاجية.' },
      { slug: 'heart-attack', name: 'نوبة قلبية', description: 'انسداد مفاجئ لتدفق الدم إلى جزء من القلب.' },
      { slug: 'angina', name: 'الذبحة الصدرية', description: 'ألم في الصدر بسبب انخفاض تدفق الدم إلى القلب.' }
    ],
    subTreatments: [
      { slug: 'off-pump-cabg', name: 'جراحة تحويل المسار بدون مضخة (القلب النابض)', image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070&auto=format&fit=crop', description: 'جراحة تُجرى بينما لا يزال القلب ينبض، دون استخدام جهاز القلب والرئتين.' },
      { slug: 'minimally-invasive-cabg', name: 'جراحة تحويل المسار طفيفة التوغل', image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=2070&auto=format&fit=crop', description: 'تُجرى من خلال شقوق أصغر بدلاً من فتح الصدر بالكامل.' }
    ]
  },
  'brain-tumor-surgery': {
    hospitalStay: '5-10 أيام',
    treatsConditions: [
      { slug: 'brain-tumor', name: 'ورم الدماغ', description: 'نمو غير طبيعي للخلايا في الدماغ، يمكن أن يكون حميدًا أو خبيثًا.' },
      { slug: 'glioblastoma', name: 'الورم الأرومي الدبقي', description: 'نوع عدواني من السرطان يمكن أن يحدث في الدماغ أو الحبل الشوكي.' },
      { slug: 'meningioma', name: 'الورم السحائي', description: 'ورم ينشأ من السحايا، الأغشية المحيطة بالدماغ.' }
    ],
    subTreatments: [
      { slug: 'craniotomy', name: 'حج القحف (Craniotomy)', image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070&auto=format&fit=crop', description: 'الإجراء الأكثر شيوعًا حيث يتم إزالة قطعة من الجمجمة للوصول إلى الدماغ.' },
      { slug: 'neuroendoscopy', name: 'التنظير العصبي', image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=2070&auto=format&fit=crop', description: 'إجراء طفيف التوغل يتم من خلال ثقب صغير في الجمجمة.' }
    ]
  }
};

async function main() {
  const treatments = await prisma.treatment.findMany();
  for (const treatment of treatments) {
    const translation = translationsData[treatment.slug];
    if (translation) {
      // Merge with existing translations if any
      const existing = (treatment.translations as any) || {};
      existing.ar = {
        ...existing.ar,
        ...translation
      };
      
      await prisma.treatment.update({
        where: { id: treatment.id },
        data: { translations: existing }
      });
      console.log(`Translated mock additions for ${treatment.slug}`);
    }
  }
  console.log("All extra mock data translated successfully");
}

main().catch(console.error).finally(() => prisma.$disconnect());
