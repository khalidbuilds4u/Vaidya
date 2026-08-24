import { prisma } from '../src/lib/prisma';
import { config } from 'dotenv';
import path from 'path';

config({ path: path.resolve(__dirname, '../.env.test4') });

const specialtiesTranslations: Record<string, string> = {
  'Cardiology': 'طب القلب',
  'Oncology': 'علم الأورام',
  'Orthopedics': 'جراحة العظام',
  'Neurology': 'طب الأعصاب',
  'Gastroenterology': 'أمراض الجهاز الهضمي',
  'Organ Transplant': 'زراعة الأعضاء',
  'Cosmetic Surgery': 'الجراحة التجميلية',
  'Dental': 'طب الأسنان',
  'IVF & Fertility': 'أطفال الأنابيب والخصوبة',
  'Bariatric Surgery': 'جراحة السمنة',
  'Ophthalmology': 'طب العيون',
  'Urology': 'المسالك البولية'
};

const hospitalsTranslations: Record<string, string> = {
  'Kokilaben Dhirubhai Ambani Hospital': 'مستشفى كوكيلابين ديروبهاي أمباني',
  'Gleneagles Global Health City': 'مدينة جلين إيجلز جلوبال هيلث',
  'BLK-Max Super Speciality Hospital': 'مستشفى بي إل كي ماكس التخصصي',
  'Fortis Memorial Research Institute': 'معهد فورتيس التذكاري للأبحاث',
  'Medanta - The Medicity': 'ميدانتا - المدينة الطبية'
};

const citiesTranslations: Record<string, string> = {
  'Mumbai': 'مومباي',
  'Chennai': 'تشيناي',
  'New Delhi': 'نيودلهي',
  'Gurugram': 'جوروجرام'
};

async function seed() {
  console.log("Updating Specialties...");
  const specialties = await prisma.specialty.findMany();
  for (const spec of specialties) {
    if (specialtiesTranslations[spec.name]) {
      const currentTrans = (spec.translations as Record<string, any>) || {};
      currentTrans['ar'] = { name: specialtiesTranslations[spec.name] };
      await prisma.specialty.update({
        where: { id: spec.id },
        data: { translations: currentTrans }
      });
      console.log(`Updated specialty: ${spec.name}`);
    }
  }

  console.log("Updating Cities...");
  const cities = await prisma.city.findMany();
  for (const city of cities) {
    if (citiesTranslations[city.name]) {
      const currentTrans = (city.translations as Record<string, any>) || {};
      currentTrans['ar'] = { name: citiesTranslations[city.name] };
      await prisma.city.update({
        where: { id: city.id },
        data: { translations: currentTrans }
      });
      console.log(`Updated city: ${city.name}`);
    }
  }

  console.log("Updating Hospitals...");
  const hospitals = await prisma.hospital.findMany();
  for (const hosp of hospitals) {
    if (hospitalsTranslations[hosp.name]) {
      const currentTrans = (hosp.translations as Record<string, any>) || {};
      currentTrans['ar'] = { name: hospitalsTranslations[hosp.name] };
      await prisma.hospital.update({
        where: { id: hosp.id },
        data: { translations: currentTrans }
      });
      console.log(`Updated hospital: ${hosp.name}`);
    }
  }
}

seed().catch(console.error);
