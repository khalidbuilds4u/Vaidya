import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { buildTranslations } from '@/lib/translator';

export async function GET(request: Request) {
  try {
    const doctor = await prisma.doctor.findFirst({
      where: { slug: 'dr-viney-jetley-1787491065608' }
    });
    
    if (!doctor) return NextResponse.json({ error: 'Doctor not found' });
    
    const trans = await buildTranslations({
      medicalQualifications: doctor.medicalQualifications
    }, doctor.translations);
    
    return NextResponse.json({ result: trans });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
