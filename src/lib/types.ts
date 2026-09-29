export type PlatformType = 'THREADS' | 'TWITTER' | 'LINKEDIN' | 'INSTAGRAM';

export type PostStatus = 'IDEA' | 'DRAFTING' | 'SCHEDULED' | 'PUBLISHED';

export type ToneOption =
  | 'conversational'  // 스레드 특화 친근/소통형
  | 'authoritative'   // 링크드인/X용 전문가 인사이트
  | 'contrarian'      // 핫테이크/상식 뒤집기
  | 'storytelling'    // 진솔한 실패 극복 스토리
  | 'builder';        // Build in Public / 지표 공개형

export interface CarouselSlide {
  slideNumber: number;
  badge?: string;
  headline: string;
  body: string;
  bulletPoints?: string[];
  cta?: string;
}

export interface TweetItem {
  index: number;
  text: string;
  charCount: number;
}

export interface PlatformDraft {
  platform: PlatformType;
  content: string;
  characterCount: number;
  slides?: CarouselSlide[];
  slideCount?: number;
  tweets?: TweetItem[];
  isReady: boolean;
  notes?: string;
}

export interface HookSuggestion {
  type: 'contrarian' | 'data_metric' | 'pain_question' | 'curiosity_gap';
  title: string;
  hook: string;
  rationale: string;
}

export interface HookAnalysis {
  originalHook: string;
  totalScore: number;         // 0 ~ 100
  curiosityScore: number;     // 0 ~ 25
  contrastScore: number;      // 0 ~ 25
  rhythmScore: number;        // 0 ~ 25
  specificityScore: number;   // 0 ~ 25
  grade: 'S' | 'A' | 'B' | 'C' | 'D';
  feedback: string[];
  suggestions: HookSuggestion[];
}

export type CardTheme = 'obsidian' | 'clean' | 'neon' | 'paper' | 'gradient';

export interface VisualCardConfig {
  theme: CardTheme;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  showVerified: boolean;
  customBadge: string;
  highlightWords?: string[];
  fontSize?: 'sm' | 'md' | 'lg';
}

export interface Post {
  id: string;
  title: string;
  rawIdea: string;
  tone: ToneOption;
  status: PostStatus;
  pillar: string;
  drafts: Record<PlatformType, PlatformDraft>;
  hookAnalysis?: HookAnalysis;
  visualCard: VisualCardConfig;
  scheduledFor?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContentPillar {
  id: string;
  name: string;
  color: string;
  description: string;
}

export interface OptimalSlot {
  platform: PlatformType;
  day: string;
  time: string;
  reason: string;
}
