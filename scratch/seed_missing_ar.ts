import { prisma } from '../src/lib/prisma';
import { config } from 'dotenv';
import path from 'path';

config({ path: path.resolve(__dirname, '../.env.test4') });

const doctorsTranslations: Record<string, any> = {
  'dr-ashok-rajgopal': {
    name: 'الدكتور أشوك راجغوبال',
    qualifications: 'بكالوريوس طب وجراحة، ماجستير (جراحة العظام)'
  },
  'ashok-rajgopal': {
    name: 'الدكتور أشوك راجغوبال',
    qualifications: 'بكالوريوس طب وجراحة، ماجستير (جراحة العظام)'
  },
  'dr-asad-khan': {
    name: 'الدكتور أسد خان',
    qualifications: 'بكالوريوس طب وجراحة، ماجستير (جراحة العظام)'
  },
  'asad-khan': {
    name: 'الدكتور أسد خان',
    qualifications: 'بكالوريوس طب وجراحة، ماجستير (جراحة العظام)'
  },
  'naresh-trehan': {
    name: 'الدكتور ناريش تريهان',
    qualifications: 'بكالوريوس طب وجراحة، دبلوم في جراحة القلب والصدر'
  },
  'dr-naresh-trehan': {
    name: 'الدكتور ناريش تريهان',
    qualifications: 'بكالوريوس طب وجراحة، دبلوم في جراحة القلب والصدر'
  },
  'sandeep-vaishya': {
    name: 'الدكتور سانديب فايشيا',
    qualifications: 'بكالوريوس طب وجراحة، ماجستير (الجراحة العامة)، ماجستير (جراحة الأعصاب)'
  },
  'dr-sandeep-vaishya': {
    name: 'الدكتور سانديب فايشيا',
    qualifications: 'بكالوريوس طب وجراحة، ماجستير (الجراحة العامة)، ماجستير (جراحة الأعصاب)'
  }
};

const hospitalsTranslations: Record<string, any> = {
  'Indraprastha Apollo Hospitals': 'مستشفيات إندرابراستا أبولو',
  'Artemis Hospital': 'مستشفى أرتميس',
  'Max Super Speciality Hospital, Saket': 'مستشفى ماكس التخصصي الفائق، ساكيت',
  'Apollo Hospitals, Greams Road': 'مستشفيات أبولو، طريق جريمز',
  'Fortis Escorts Heart Institute': 'معهد فورتيس إسكورتس للقلب',
  'Manipal Hospital, Old Airport Road': 'مستشفى مانيبال، طريق المطار القديم'
};

async function seedMissingTranslations() {
  console.log("Updating Doctors...");
  const doctors = await prisma.doctor.findMany();
  for (const doc of doctors) {
    if (doctorsTranslations[doc.slug] || doctorsTranslations[doc.name]) {
      const transData = doctorsTranslations[doc.slug] || doctorsTranslations[doc.name];
      const currentTrans = (doc.translations as Record<string, any>) || {};
      currentTrans['ar'] = { ...currentTrans['ar'], ...transData };
      await prisma.doctor.update({
        where: { id: doc.id },
        data: { translations: currentTrans }
      });
      console.log(`Updated doctor: ${doc.name}`);
    } else {
       console.log(`No translation mapping for doctor: ${doc.name} (${doc.slug})`);
    }
  }

  console.log("Updating Hospitals...");
  const hospitals = await prisma.hospital.findMany();
  for (const hosp of hospitals) {
    if (hospitalsTranslations[hosp.name]) {
      const currentTrans = (hosp.translations as Record<string, any>) || {};
      currentTrans['ar'] = { ...currentTrans['ar'], name: hospitalsTranslations[hosp.name] };
      await prisma.hospital.update({
        where: { id: hosp.id },
        data: { translations: currentTrans }
      });
      console.log(`Updated hospital: ${hosp.name}`);
    }
  }
}

seedMissingTranslations().catch(console.error).finally(() => prisma.$disconnect());
