import { Post, ToneOption } from './types';
import { synthesizeAllPlatforms } from './platformAdapters';
import { analyzeViralHook } from './hookEngine';

const STORAGE_KEY = 'threadcraft_os_posts_v1';

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-sample-1',
    title: '스레드에서 무조건 실패하는 글쓰기 vs 떡상하는 글쓰기',
    rawIdea: `대부분의 사람들이 스레드에 인스타그램이나 블로그 글을 그대로 복사해서 올립니다.
결과는 처참하게 노출 0회입니다.
스레드 알고리즘은 텍스트의 '호흡'과 '첫 30분의 댓글 소통'을 최우선으로 봅니다.
성공하는 3가지 공식:
1. 30자 이내의 호기심 공백 후킹 (첫 줄에 결론 다 말하지 말 것)
2. 모바일 가독성을 위한 2줄 단위 빈 줄 줄바꿈
3. 마지막에 무조건 댓글을 유도하는 열린 질문 던지기`,
    tone: 'contrarian',
    status: 'PUBLISHED',
    pillar: '성장 전략',
    drafts: synthesizeAllPlatforms({
      rawIdea: `대부분의 사람들이 스레드에 인스타그램이나 블로그 글을 그대로 복사해서 올립니다.
결과는 처참하게 노출 0회입니다.
스레드 알고리즘은 텍스트의 '호흡'과 '첫 30분의 댓글 소통'을 최우선으로 봅니다.
성공하는 3가지 공식:
1. 30자 이내의 호기심 공백 후킹 (첫 줄에 결론 다 말하지 말 것)
2. 모바일 가독성을 위한 2줄 단위 빈 줄 줄바꿈
3. 마지막에 무조건 댓글을 유도하는 열린 질문 던지기`,
      tone: 'contrarian',
      customHook: '열심히 글 쓰는 사람일수록 스레드에서 90% 망합니다. 이유는 딱 1가지입니다.',
    }),
    hookAnalysis: analyzeViralHook('열심히 글 쓰는 사람일수록 스레드에서 90% 망합니다. 이유는 딱 1가지입니다.'),
    visualCard: {
      theme: 'obsidian',
      authorName: '브랜드 빌더',
      authorHandle: '@brand_architect',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      showVerified: true,
      customBadge: 'ALGORITHM HACK',
      fontSize: 'md',
    },
    scheduledFor: '2026-09-30T10:00:00Z',
    publishedAt: '2026-09-28T09:30:00Z',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'post-sample-2',
    title: '1인 창업가가 피그마/캔바 끄고 월 500만 원 만든 자동화 원칙',
    rawIdea: `디자인에 목숨 걸지 마세요.
콘텐츠의 본질은 화려한 폰트가 아니라 '독자의 문제 해결'입니다.
텍스트 캡처 스타일의 미니멀 카드가 오히려 3배 더 많은 저장과 공유를 부릅니다.
시간을 아끼는 3가지 시스템:
- 모든 생각을 텍스트 한 줄로 먼저 메모하기
- 하나의 메시지를 4개 플랫폼 문법으로 1초 만에 쪼개기
- 화려한 그래픽 대신 고대비 다크모드 미니멀 카드로 끝내기`,
    tone: 'builder',
    status: 'SCHEDULED',
    pillar: '1인 창업 & SaaS',
    drafts: synthesizeAllPlatforms({
      rawIdea: `디자인에 목숨 걸지 마세요.
콘텐츠의 본질은 화려한 폰트가 아니라 '독자의 문제 해결'입니다.
텍스트 캡처 스타일의 미니멀 카드가 오히려 3배 더 많은 저장과 공유를 부릅니다.
시간을 아끼는 3가지 시스템:
- 모든 생각을 텍스트 한 줄로 먼저 메모하기
- 하나의 메시지를 4개 플랫폼 문법으로 1초 만에 쪼개기
- 화려한 그래픽 대신 고대비 다크모드 미니멀 카드로 끝내기`,
      tone: 'builder',
      customHook: '디자인 감각 0인 개발자가 콘텐츠 하나로 월 500만 원 파이프라인을 만든 방법',
    }),
    hookAnalysis: analyzeViralHook('디자인 감각 0인 개발자가 콘텐츠 하나로 월 500만 원 파이프라인을 만든 방법'),
    visualCard: {
      theme: 'neon',
      authorName: '테크 크리에이터',
      authorHandle: '@tech_craftsman',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      showVerified: true,
      customBadge: 'SOLO SAAS',
      fontSize: 'md',
    },
    scheduledFor: '2026-10-01T14:30:00Z',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function getStoredPosts(): Post[] {
  if (typeof window === 'undefined') return INITIAL_POSTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_POSTS));
      return INITIAL_POSTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse stored posts', err);
    return INITIAL_POSTS;
  }
}

export function savePosts(posts: Post[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (err) {
    console.error('Failed to save posts', err);
  }
}

export function createNewPost(rawIdea: string, tone: ToneOption = 'conversational', title?: string): Post {
  const lines = rawIdea.trim().split('\n').filter(Boolean);
  const postTitle = title || (lines[0] ? (lines[0].length > 30 ? lines[0].slice(0, 30) + '...' : lines[0]) : '새로운 콘텐츠 기획');
  const hookAnalysis = analyzeViralHook(rawIdea);
  const drafts = synthesizeAllPlatforms({ rawIdea, tone });

  const newPost: Post = {
    id: `post-${Date.now()}`,
    title: postTitle,
    rawIdea,
    tone,
    status: 'DRAFTING',
    pillar: '기본 카테고리',
    drafts,
    hookAnalysis,
    visualCard: {
      theme: 'obsidian',
      authorName: '나의 브랜드',
      authorHandle: '@my_brand',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      showVerified: true,
      customBadge: 'CURATED INSIGHT',
      fontSize: 'md',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return newPost;
}
