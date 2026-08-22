import { prisma } from '../src/lib/prisma'

async function main() {
  console.log("Seeding Dummy Patient Cases...")

  // Create 2 Patients
  const patient1 = await prisma.patient.create({
    data: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1 234 567 8900",
      country: "USA",
      age: 45,
    }
  })

  const patient2 = await prisma.patient.create({
    data: {
      firstName: "Sarah",
      lastName: "Smith",
      email: "sarah.smith@example.com",
      phone: "+44 7700 900077",
      country: "United Kingdom",
      age: 32,
    }
  })

  // Get random cities and treatments if they exist
  const cities = await prisma.city.findMany()
  const treatments = await prisma.treatment.findMany()

  // Create 3 Cases for Patient 1
  await prisma.patientCase.create({
    data: {
      referenceId: "CASE-1001",
      patientId: patient1.id,
      medicalCondition: "Severe knee pain, needs replacement",
      budget: 15000,
      status: "NEW",
      preferredCityId: cities[0]?.id || null,
      treatmentId: treatments[0]?.id || null,
    }
  })

  await prisma.patientCase.create({
    data: {
      referenceId: "CASE-1002",
      patientId: patient1.id,
      medicalCondition: "Dental implants consultation",
      budget: 5000,
      status: "UNDER_REVIEW",
    }
  })

  // Create 2 Cases for Patient 2
  await prisma.patientCase.create({
    data: {
      referenceId: "CASE-2001",
      patientId: patient2.id,
      medicalCondition: "Rhinoplasty inquiry",
      budget: 8000,
      status: "HOSPITAL_CONTACTED",
      preferredCityId: cities[1]?.id || null,
    }
  })

  await prisma.patientCase.create({
    data: {
      referenceId: "CASE-2002",
      patientId: patient2.id,
      medicalCondition: "Lasik Eye Surgery",
      budget: 2000,
      status: "QUOTE_RECEIVED",
    }
  })

  console.log("✅ Seeded Patient Cases!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
