import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const doctor = await prisma.doctor.findFirst({
      where: { slug: 'dr-viney-jetley-1787491065608' }
    });
    return NextResponse.json({ translations: doctor?.translations });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
