const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const { PrismaClient } = require('@prisma/client');

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function fixBiography() {
  const doctor = await prisma.doctor.findUnique({
    where: { slug: 'dr-hitesh-garg-1787657727224' }
  });

  const translations = doctor.translations || {};
  if (!translations.ar) translations.ar = {};

  translations.ar.biography = "الدكتور هيتيش جارج هو جراح عظام وعمود فقري ذو مهارة وخبرة عالية، يتمتع بأكثر من 15 عامًا من الخبرة في علاج مجموعة واسعة من حالات العمود الفقري. يُعرف بنهجه الذي يركز على المريض، حيث يجمع بين التقنيات الجراحية المتقدمة والرعاية الرحيمة لتقديم أفضل النتائج الممكنة. لقد نجح في علاج المرضى المحليين والدوليين، مما جعله اسمًا موثوقًا به في رعاية العمود الفقري.";

  await prisma.doctor.update({
    where: { id: doctor.id },
    data: { translations }
  });

  console.log("Updated translation for Dr. Hitesh Garg");
}

fixBiography().catch(console.error).finally(() => prisma.$disconnect());
