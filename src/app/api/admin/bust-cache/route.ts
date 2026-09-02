import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true, message: 'Cache busted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
