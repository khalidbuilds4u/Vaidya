import { NextResponse } from 'next/server';
import { translateText } from '@/lib/translator';

export async function GET(request: Request) {
  try {
    const result = await translateText("Highly Experienced", "ar");
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
