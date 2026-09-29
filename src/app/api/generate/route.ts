import { NextResponse } from 'next/server';
import { synthesizeAllPlatforms } from '@/lib/platformAdapters';
import { analyzeViralHook } from '@/lib/hookEngine';
import { ToneOption } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const { rawIdea, tone, customHook } = await req.json();

    if (!rawIdea || typeof rawIdea !== 'string') {
      return NextResponse.json({ success: false, error: 'rawIdea is required' }, { status: 400 });
    }

    const selectedTone: ToneOption = tone || 'conversational';
    const drafts = synthesizeAllPlatforms({ rawIdea, tone: selectedTone, customHook });
    const hookAnalysis = analyzeViralHook(customHook || rawIdea);

    return NextResponse.json({
      success: true,
      data: {
        drafts,
        hookAnalysis,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Generation failed';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
