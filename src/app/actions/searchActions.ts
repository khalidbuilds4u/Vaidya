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

  const normalizedQuery = query.toLowerCase().trim();
  
  // Check for generic terms
  const isDoctorGeneric = ['doc', 'doctor', 'surge', 'surgeon', 'dr', 'dr.'].some(term => normalizedQuery.includes(term));
  const isHospitalGeneric = ['hosp', 'hospital', 'clinic'].some(term => normalizedQuery.includes(term));
  const isTreatmentGeneric = ['treat', 'treatment', 'surgery', 'procedure', 'operation'].some(term => normalizedQuery.includes(term));

  const treatments = await prisma.treatment.findMany({
    where: {
      isPublished: true,
      ...(isTreatmentGeneric ? {} : { name: { contains: query, mode: "insensitive" } })
    },
    take: 3,
    select: { name: true, slug: true },
  });

  const doctors = await prisma.doctor.findMany({
    where: {
      isPublished: true,
      ...(isDoctorGeneric ? {} : {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { specialty: { name: { contains: query, mode: "insensitive" } } }
        ]
      }),
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
      ...(isHospitalGeneric ? {} : { name: { contains: query, mode: "insensitive" } }),
      ...cityFilter
    },
    take: 3,
    select: { name: true, slug: true, city: { select: { name: true } } },
  });

  return { treatments, doctors, hospitals };
}
