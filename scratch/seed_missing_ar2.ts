import { prisma } from '../src/lib/prisma';
import { config } from 'dotenv';
import path from 'path';

config({ path: path.resolve(__dirname, '../.env.test4') });

const allDoctors = {
  'dr-asad-khan': {
    name: 'الدكتور أسد خان',
    qualifications: 'بكالوريوس طب وجراحة، ماجستير (جراحة العظام)'
  },
  'sandeep-guleria': {
    name: 'الدكتور سانديب جوليريا',
    qualifications: 'بكالوريوس طب وجراحة، ماجستير (الجراحة العامة)'
  },
  'devi-shetty': {
    name: 'الدكتور ديفي شيتي',
    qualifications: 'بكالوريوس طب وجراحة، زمالة كلية الجراحين الملكية'
  },
  'arvinder-singh-soin': {
    name: 'الدكتور أرفيندر سينغ سوين',
    qualifications: 'بكالوريوس طب وجراحة، زمالة كلية الجراحين الملكية'
  },
  'viney-jetley': {
    name: 'الدكتور فيني جيتلي',
    qualifications: 'بكالوريوس طب وجراحة، دكتوراه في الطب'
  }
};

async function seedMissingDoctors() {
  console.log("Updating all remaining Doctors...");
  const doctors = await prisma.doctor.findMany();
  for (const doc of doctors) {
    for (const [key, transData] of Object.entries(allDoctors)) {
      if (doc.slug.includes(key) || doc.name.toLowerCase().includes(key.replace(/-/g, ' '))) {
        const currentTrans = (doc.translations as Record<string, any>) || {};
        currentTrans['ar'] = { ...currentTrans['ar'], ...transData };
        await prisma.doctor.update({
          where: { id: doc.id },
          data: { translations: currentTrans }
        });
        console.log(`Updated doctor: ${doc.name} (Matched: ${key})`);
      }
    }
  }
}

seedMissingDoctors().catch(console.error).finally(() => prisma.$disconnect());
