import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

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

async function main() {
  const email = "admin@asadhealthcare.com";
  const password = "Admin@2026!"; // CHANGE THIS AFTER FIRST LOGIN

  const hashedPassword = await bcrypt.hash(password, 12);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "Asad Healthcare Admin",
      hashedPassword,
      role: "ADMIN",
    },
  });

  const { MOCK_HOSPITALS, MOCK_DOCTORS } = await import("../src/lib/mockData");

  console.log("Seeding Cities...");
  for (const h of MOCK_HOSPITALS) {
    const citySlug = h.city.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    await prisma.city.upsert({
      where: { slug: citySlug },
      update: {},
      create: { name: h.city, slug: citySlug, country: "India" }
    });
  }

  console.log("Seeding Specialties...");
  for (const d of MOCK_DOCTORS) {
    const specSlug = d.specialty.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    await prisma.specialty.upsert({
      where: { slug: specSlug },
      update: {},
      create: { name: d.specialty, slug: specSlug }
    });
  }

  console.log("Seeding Hospitals...");
  for (const h of MOCK_HOSPITALS) {
    const citySlug = h.city.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const city = await prisma.city.findUnique({ where: { slug: citySlug } });
    if (!city) continue;

    await prisma.hospital.upsert({
      where: { slug: h.slug },
      update: {},
      create: {
        name: h.name,
        slug: h.slug,
        cityId: city.id,
        beds: h.beds,
        accreditations: h.accreditations,
        internationalServices: h.specialties // Storing specialties here for now
      }
    });
  }

  console.log("Seeding Doctors...");
  for (const d of MOCK_DOCTORS) {
    const specSlug = d.specialty.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const specialty = await prisma.specialty.findUnique({ where: { slug: specSlug } });
    
    // Find the hospital by name
    const hospital = await prisma.hospital.findFirst({
      where: { name: { contains: d.hospital } }
    });

    if (specialty && hospital) {
      const exp = parseInt(d.experience.replace(/[^0-9]/g, "")) || 0;
      await prisma.doctor.upsert({
        where: { slug: d.slug },
        update: {},
        create: {
          name: d.name,
          slug: d.slug,
          imageUrl: d.image,
          experienceYears: exp,
          specialtyId: specialty.id,
          hospitalId: hospital.id
        }
      });
    }
  }

  console.log("");
  console.log("✅ Admin user seeded successfully:");
  console.log(`   Email:    ${admin.email}`);
  console.log(`   Password: ${password}`);
  console.log(`   Role:     ${admin.role}`);
  console.log("");
  console.log("✅ Mock Data Seeded Successfully! (Cities, Specialties, Hospitals, Doctors)");
  console.log("");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
