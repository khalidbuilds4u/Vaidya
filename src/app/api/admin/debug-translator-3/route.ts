import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const doctor = await prisma.doctor.findFirst({ where: { slug: 'dr-viney-jetley-1787491065608' }});
  return NextResponse.json({ medicalQualifications: doctor?.medicalQualifications });
}
