import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { buildTranslations } from '@/lib/translator';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const type = url.searchParams.get('type');

  try {
    let updatedCount = 0;

    // Helper to check if translation exists
    const needsTranslation = (item: any) => {
      if (!item.translations) return true;
      const t = item.translations as any;
      if (!t.ar) return true;
      // Simple check if it's mostly empty
      return Object.keys(t.ar).length < 2; 
    };

    if (!type || type === 'city') {
      const cities = await prisma.city.findMany();
      for (const city of cities) {
        if (needsTranslation(city)) {
          const trans = await buildTranslations({
            name: city.name,
            state: city.state,
            country: city.country,
            description: city.description || ''
          }, city.translations);
          await prisma.city.update({ where: { id: city.id }, data: { translations: trans } });
          updatedCount++;
        }
      }
    }

    if (!type || type === 'hospital') {
      const hospitals = await prisma.hospital.findMany();
      for (const h of hospitals) {
        if (needsTranslation(h)) {
          const trans = await buildTranslations({
            name: h.name,
            address: h.address,
            description: h.description,
            premiumFacilities: h.premiumFacilities,
            multiSpecialties: h.multiSpecialties,
            advancedTechnologies: h.advancedTechnologies,
            connectivityLocation: h.connectivityLocation,
            excellenceInCare: h.excellenceInCare
          }, h.translations);
          await prisma.hospital.update({ where: { id: h.id }, data: { translations: trans } });
          updatedCount++;
        }
      }
    }

    if (!type || type === 'doctor') {
      const doctors = await prisma.doctor.findMany();
      for (const d of doctors) {
        if (needsTranslation(d)) {
          const trans = await buildTranslations({
            name: d.name,
            qualifications: d.qualifications,
            biography: d.biography
          }, d.translations);
          await prisma.doctor.update({ where: { id: d.id }, data: { translations: trans } });
          updatedCount++;
        }
      }
    }

    if (!type || type === 'treatment') {
      const treatments = await prisma.treatment.findMany();
      for (const t of treatments) {
        if (needsTranslation(t)) {
          const trans = await buildTranslations({
            name: t.name,
            description: t.description,
            recovery: t.recovery,
            causesAndSymptoms: t.causesAndSymptoms,
            diagnosis: t.diagnosis,
            preOpPrep: t.preOpPrep,
            postOpCare: t.postOpCare,
            procedureDetails: t.procedureDetails,
            risks: t.risks,
            faqs: t.faqs ? JSON.stringify(t.faqs) : "" 
          }, t.translations);
          await prisma.treatment.update({ where: { id: t.id }, data: { translations: trans } });
          updatedCount++;
        }
      }
    }

    if (!type || type === 'condition') {
      const conditions = await prisma.condition.findMany();
      for (const c of conditions) {
        if (needsTranslation(c)) {
          const trans = await buildTranslations({
            name: c.name,
            description: c.description
          }, c.translations);
          await prisma.condition.update({ where: { id: c.id }, data: { translations: trans } });
          updatedCount++;
        }
      }
    }

    return NextResponse.json({ success: true, updatedCount });
  } catch (error) {
    console.error("Backfill failed", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
