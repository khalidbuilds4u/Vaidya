import { unstable_cache } from 'next/cache';
import { prisma } from './prisma';

export const getCachedDoctors = unstable_cache(
  async () => {
    return prisma.doctor.findMany({
      where: { isPublished: true },
      include: {
        hospital: { include: { city: true } },
        specialty: true,
      },
    });
  },
  ['public-doctors'],
  { tags: ['doctors'], revalidate: 3600 }
);

export const getCachedHospitals = unstable_cache(
  async () => {
    return prisma.hospital.findMany({
      where: { isPublished: true },
      include: {
        city: true,
        specialties: true,
      },
    });
  },
  ['public-hospitals'],
  { tags: ['hospitals'], revalidate: 3600 }
);

export const getCachedTreatments = unstable_cache(
  async () => {
    return prisma.treatment.findMany({
      where: { isPublished: true },
      include: { specialty: true },
    });
  },
  ['public-treatments'],
  { tags: ['treatments'], revalidate: 3600 }
);

export const getCachedCities = unstable_cache(
  async () => prisma.city.findMany({ orderBy: { name: 'asc' } }),
  ['public-cities'],
  { tags: ['cities'], revalidate: 3600 }
);

export const getCachedSpecialties = unstable_cache(
  async () => prisma.specialty.findMany({ orderBy: { name: 'asc' } }),
  ['public-specialties'],
  { tags: ['specialties'], revalidate: 3600 }
);
