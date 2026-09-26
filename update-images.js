const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

function createClient() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL not set");

  if (url.startsWith("prisma+postgres://")) {
    return new PrismaClient({ accelerateUrl: url });
  }

  const adapter = new PrismaPg({ connectionString: url });
  return new PrismaClient({ adapter });
}

const prisma = createClient();

async function getImage(query) {
  try {
    const res = await fetch(`https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=10`);
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      // Find the first one that is from images.unsplash.com (not plus.unsplash.com)
      for (const photo of data.results) {
        const url = photo.urls.regular;
        if (url.includes('images.unsplash.com')) {
          return url;
        }
      }
    }
  } catch (e) {
    console.error(`Failed to fetch image for ${query}`);
  }
  return null;
}

async function main() {
  const specialties = await prisma.specialty.findMany();
  console.log(`Found ${specialties.length} specialties`);
  
  for (const spec of specialties) {
    let query = spec.name;
    if (query === 'ENT') query = 'Ear Nose Throat Medical';
    if (query === 'IVF & Fertility') query = 'Baby Medical Fertility';
    if (query === 'General Surgery') query = 'Surgery Doctor';
    if (!query.toLowerCase().includes('surgery') && !query.toLowerCase().includes('medical')) {
        query += ' medical';
    }

    const imageUrl = await getImage(query);
    if (imageUrl) {
      await prisma.specialty.update({
        where: { id: spec.id },
        data: { imageUrl }
      });
      console.log(`Updated ${spec.name} with ${imageUrl}`);
    } else {
      console.log(`Could not find image for ${spec.name}`);
    }
  }
  
  console.log("✅ All specialty images updated.");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
