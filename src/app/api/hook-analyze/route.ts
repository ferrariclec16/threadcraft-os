import { NextResponse } from 'next/server';
import { analyzeViralHook } from '@/lib/hookEngine';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    const analysis = analyzeViralHook(text || '');
    return NextResponse.json({ success: true, data: analysis });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Analysis failed';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
