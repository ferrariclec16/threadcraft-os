import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { INITIAL_POSTS } from '@/lib/store';

export async function GET() {
  try {
    if (prisma) {
      const posts = await prisma.post.findMany({
        include: {
          drafts: true,
          hookAnalysis: true,
          visualCard: true,
        },
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json({ success: true, data: posts, source: 'database' });
    }

    return NextResponse.json({ success: true, data: INITIAL_POSTS, source: 'fallback_memory' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown database error';
    return NextResponse.json({ success: true, data: INITIAL_POSTS, source: 'fallback_error', error: message });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (prisma) {
      const created = await prisma.post.create({
        data: {
          title: body.title || '새 콘텐츠 기획',
          rawIdea: body.rawIdea || '',
          tone: body.tone || 'conversational',
          status: body.status || 'DRAFTING',
        },
      });
      return NextResponse.json({ success: true, data: created, source: 'database' });
    }

    return NextResponse.json({ success: true, data: body, source: 'client_store' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to save post';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
