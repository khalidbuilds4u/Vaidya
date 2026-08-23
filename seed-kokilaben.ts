import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

let connectionString = process.env.DATABASE_URL;
let pgConnectionString = connectionString;
pgConnectionString = pgConnectionString.replace(
  /tourism2026-0-([a-z0-9-]+)\.pooler\.supabase\.com/,
  'aws-0-$1.pooler.supabase.com'
);
const url = new URL(pgConnectionString);
url.searchParams.delete("pgbouncer");
url.searchParams.delete("connection_limit");
url.searchParams.delete("pool_timeout");
pgConnectionString = url.toString();

const pool = new Pool({ 
  connectionString: pgConnectionString, 
  max: 2,
  ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const premiumFacilities = [
    "The hospital has 539+ beds with digitally enabled ICUs, modular OTs, and hybrid cath-labs that allow complex surgeries to be performed with minimal patient transfer.",
    "Apart from that, the hospital has a dedicated international patient care unit, infection-controlled transplant units, and 24/7 advanced imaging (PET-CT, 3 Tesla MRI)."
  ];

  const multiSpecialties = [
    "Bariatric Surgery / Metabolic",
    "Cancer Care / Oncology",
    "Endocrinology & Diabetes",
    "Gastroenterology, Hepatology & Endoscopy",
    "Neurosciences",
    "Orthopaedics & Joint Replacement",
    "Urology",
    "Cardiology",
    "Dermatology",
    "Emergency & Trauma",
    "Liver Transplant and Biliary Sciences",
    "Cardiac Sciences",
    "Anaesthesia",
    "Dental Care"
  ];

  const advancedTechnologies = [
    "TrueBeam Linac with Exactrac",
    "Endoscopic Ultrasound (EUS)",
    "Bi-Plane Digital Cathlab",
    "Extra-Corporeal Membrane Therapy (ECMO)",
    "4D ECHO Machine",
    "Da Vinci Xi Robotic System",
    "Brachytherapy",
    "MRI 3.0 Tesla",
    "Interventional Radiology Suite (Cath Lab) | X-ray",
    "Mammography",
    "CT Scan",
    "Optical Coherence Tomography (OCT)"
  ];

  const connectivityLocation = [
    "The airport is located 13 kilometers away, it takes approximately 40 minutes to reach.",
    "Metro Station is situated 3 kilometers away, it is only a 10-minute drive.",
    "The nearest accommodation facilities availability is withing walking distance and also about 11 km away."
  ];

  const excellenceInCare = [
    "The hospital is accredited by both JCI and NABH, and it follows international safety protocols that make it India's highest-rated hospital for quality and patient safety.",
    "Additionally, the hospital has a center of excellence in oncology, cardiac sciences, neurosciences, orthopaedics, and more, which ensures every case is reviewed by professionals, physicians, and rehabilitation experts under one roof."
  ];

  const hospitalFacilities = {
    "Food": [
      "Diet on Request",
      "Restaurant",
      "International Cuisine"
    ],
    "Comfort During Stay": [
      "TV in room",
      "Private room",
      "Free wifi",
      "Phone in room",
      "Mobility accessible rooms",
      "Family accommodation",
      "Laundry"
    ],
    "Transportation": [
      "Airport pickup",
      "Local tourism options",
      "Local transportation booking",
      "Car Hire",
      "Private driver / Limousine services"
    ],
    "Language": [
      "Interpretation",
      "Translation services"
    ],
    "Money Matters": [
      "Health insurance coordination",
      "Medical travel insurance",
      "Foreign currency exchange",
      "ATM",
      "Credit Card",
      "Debit Card",
      "Netbanking"
    ]
  };

  const description = `Kokilaben Dhirubhai Ambani Hospital, Mumbai, is a state-of-the-art multi-specialty tertiary care hospital. We are committed to providing the best healthcare facilities using the most advanced medical technology and a highly skilled medical team.

Furthermore, the hospital is a hub for complex procedures such as targeted cancer treatments, heart surgeries, neurovascular intervention, orthopedic surgeries, liver and kidney transplants, and fertility treatments as well.`;

  await prisma.hospital.update({
    where: { slug: 'kokilaben-hospital-mumbai' },
    data: {
      description,
      premiumFacilities,
      multiSpecialties,
      advancedTechnologies,
      connectivityLocation,
      excellenceInCare,
      hospitalFacilities
    }
  });
  console.log("Updated kokilaben hospital");
}

main().catch(console.error).finally(() => prisma.$disconnect());
