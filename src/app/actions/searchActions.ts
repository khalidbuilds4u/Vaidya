"use server";

import { prisma } from "@/lib/prisma";

export async function getSearchSuggestions(query: string, cityName: string) {
  if (!query || query.length < 2) return { treatments: [], doctors: [], hospitals: [] };

  const cityFilter = cityName ? { city: { name: cityName } } : {};
  const cityFilterDoctor = cityName ? { 
    OR: [
      { city: { name: cityName } },
      { hospital: { city: { name: cityName } } }
    ]
  } : {};

  const treatments = await prisma.treatment.findMany({
    where: {
      name: { contains: query, mode: "insensitive" },
      isPublished: true,
    },
    take: 3,
    select: { name: true, slug: true },
  });

  const doctors = await prisma.doctor.findMany({
    where: {
      isPublished: true,
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { specialty: { name: { contains: query, mode: "insensitive" } } }
      ],
      ...cityFilterDoctor
    },
    take: 3,
    select: { 
      name: true, 
      slug: true, 
      specialty: { select: { name: true } },
      hospital: { select: { name: true } }
    },
  });

  const hospitals = await prisma.hospital.findMany({
    where: {
      isPublished: true,
      name: { contains: query, mode: "insensitive" },
      ...cityFilter
    },
    take: 3,
    select: { name: true, slug: true, city: { select: { name: true } } },
  });

  return { treatments, doctors, hospitals };
}
