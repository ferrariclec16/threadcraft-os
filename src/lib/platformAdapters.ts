import { PlatformType, ToneOption, PlatformDraft, CarouselSlide, TweetItem } from './types';

interface SynthesizerInput {
  rawIdea: string;
  tone: ToneOption;
  customHook?: string;
}

export function synthesizeAllPlatforms(input: SynthesizerInput): Record<PlatformType, PlatformDraft> {
  return {
    THREADS: synthesizeThreads(input),
    TWITTER: synthesizeTwitter(input),
    LINKEDIN: synthesizeLinkedIn(input),
    INSTAGRAM: synthesizeInstagram(input),
  };
}

// 1. Threads Engine (Max 500 chars, high whitespace, reply-seeking ending question)
export function synthesizeThreads({ rawIdea, tone, customHook }: SynthesizerInput): PlatformDraft {
  const hook = customHook || extractHookLine(rawIdea, tone, 'THREADS');
  const points = extractKeyPoints(rawIdea);

  let closingQuestion = '여러분의 생각은 어떠신가요? 댓글로 편하게 나눠주세요.';

  if (tone === 'conversational') {
    closingQuestion = '다들 공감하시나요? 비슷한 경험 있으시면 댓글로 알려주세요 💬';
  } else if (tone === 'contrarian') {
    closingQuestion = '솔직히 반박 환영합니다. 어떻게 생각하시나요? 👇';
  } else if (tone === 'builder') {
    closingQuestion = '다음 주에 실제 데이터와 함께 후속 공유해 드릴게요. 궁금한 점 편하게 남겨주세요!';
  }

  const bodyParagraphs = points.length > 0 
    ? points.map(p => `• ${p}`).join('\n\n')
    : rawIdea.trim();

  const formattedContent = `${hook}\n\n${bodyParagraphs}\n\n${closingQuestion}`.slice(0, 495);

  return {
    platform: 'THREADS',
    content: formattedContent,
    characterCount: formattedContent.length,
    isReady: true,
    notes: '스레드 알고리즘은 댓글 반응(Velocity)을 1순위로 봅니다. 등록 직후 첫 30분 동안 달리는 댓글에 즉시 답글을 달아주세요.',
  };
}

// 2. Twitter / X Engine (Thread structure 1/N, tweet split, repost CTA)
export function synthesizeTwitter({ rawIdea, tone, customHook }: SynthesizerInput): PlatformDraft {
  const hook = customHook || extractHookLine(rawIdea, tone, 'TWITTER');
  const points = extractKeyPoints(rawIdea);

  const tweets: TweetItem[] = [];

  // Tweet 1: Hook Tweet
  const tweet1Text = `${hook}\n\n자세한 핵심 인사이트를 타래로 정리했습니다 🧵 (1/${Math.max(3, points.length + 2)})`;
  tweets.push({ index: 1, text: tweet1Text, charCount: tweet1Text.length });

  // Tweets 2...N: Value Tweets
  points.forEach((point, idx) => {
    const tweetText = `${idx + 1}. ${point}\n\n당장 실행할 수 있는 가장 작은 단위부터 적용해 보세요. (${idx + 2}/${points.length + 2})`;
    tweets.push({ index: idx + 2, text: tweetText, charCount: tweetText.length });
  });

  // Final Tweet: CTA
  const finalIndex = tweets.length + 1;
  const finalTweetText = `💡 요약 및 행동 지침:\n\n이 인사이트가 도움이 되셨다면:\n1. 타래의 첫 번째 트윗을 RT(리트윗)해 주세요.\n2. 나중에 다시 보려면 📌 북마크해 두세요.\n3. 더 많은 실전 팁을 보려면 팔로우해 주세요. (${finalIndex}/${finalIndex})`;
  tweets.push({ index: finalIndex, text: finalTweetText, charCount: finalTweetText.length });

  const fullContent = tweets.map(t => `[트윗 ${t.index}]\n${t.text}`).join('\n\n---\n\n');

  return {
    platform: 'TWITTER',
    content: fullContent,
    characterCount: fullContent.length,
    tweets,
    isReady: true,
    notes: 'X 알고리즘은 첫 트윗의 북마크 및 RT 비율을 가장 중요하게 평가합니다.',
  };
}

// 3. LinkedIn Engine (Professional framework, whitespace, career/business lesson)
export function synthesizeLinkedIn({ rawIdea, tone, customHook }: SynthesizerInput): PlatformDraft {
  const hook = customHook || extractHookLine(rawIdea, tone, 'LINKEDIN');
  const points = extractKeyPoints(rawIdea);

  const bodyContent = `많은 분들이 이 부분을 간과하지만, 실제로 비즈니스 현장에서 적용해 보면 결과는 완전히 달라집니다.\n\n제가 현업에서 검증한 핵심 실행 프레임워크 3가지:\n\n${
    points.map((p, i) => `${i + 1}️⃣ ${p}`).join('\n\n')
  }\n\n결국 중요한 것은 화려한 기교가 아니라, 지속 가능한 기본기와 실행 속도입니다.\n\n현업 리더분들과 실무자분들의 시각이 궁금합니다. 여러분의 조직에서는 이 문제를 어떻게 풀고 계신가요?\n\n#생산성 #비즈니스인사이트 #스타트업 #성장전략 #커리어`;

  const fullContent = `${hook}\n\n${bodyContent}`;

  return {
    platform: 'LINKEDIN',
    content: fullContent,
    characterCount: fullContent.length,
    isReady: true,
    notes: '상위 3줄이 모바일에서 "더 보기(see more)" 전에 노출되는 영역입니다.',
  };
}

// 4. Instagram Carousel Engine (Slide by slide script for card graphics)
export function synthesizeInstagram({ rawIdea, tone, customHook }: SynthesizerInput): PlatformDraft {
  const hook = customHook || extractHookLine(rawIdea, tone, 'INSTAGRAM');
  const points = extractKeyPoints(rawIdea);

  const slides: CarouselSlide[] = [
    {
      slideNumber: 1,
      badge: 'PRO INSIGHT',
      headline: hook.length > 40 ? hook.slice(0, 40) + '...' : hook,
      body: '상위 1% 크리에이터와 비즈니스가 실천하는 검증된 원칙 ➔ (옆으로 넘겨서 확인)',
    },
    {
      slideNumber: 2,
      badge: 'PROBLEM',
      headline: '왜 대부분 실패할까요?',
      body: '열심히는 하지만 방향이 맞지 않기 때문입니다. 비효율적인 반복 작업에 시간의 70%를 쏟고 있습니다.',
    },
    {
      slideNumber: 3,
      badge: 'KEY PRINCIPLE 01',
      headline: points[0] ? points[0].slice(0, 25) : '작은 성공 공식의 반복',
      body: points[0] || '가장 중요한 단 하나의 핵심 가치에 집중하세요.',
      bulletPoints: ['불필요한 작업 80% 제거', '단일 워크플로우 집중'],
    },
    {
      slideNumber: 4,
      badge: 'KEY PRINCIPLE 02',
      headline: points[1] ? points[1].slice(0, 25) : '시스템화와 자동화',
      body: points[1] || '매번 처음부터 새로 만드는 대신 재사용 가능한 템플릿을 구축하세요.',
      bulletPoints: ['일관된 톤앤매너 유지', '제작 시간 90% 단축'],
    },
    {
      slideNumber: 5,
      badge: 'ACTION CHECKLIST',
      headline: '오늘부터 바로 적용할 3가지',
      body: '1. 불필요한 단계 삭제\n2. 핵심 프로세스 표준화\n3. 매일 30분씩 꾸준히 발행',
    },
    {
      slideNumber: 6,
      badge: 'SAVE & SHARE',
      headline: '필요할 때 다시 꺼내보세요',
      body: '오른쪽 아래 [저장 🔖] 버튼을 눌러두고, 팀원이나 동료와 함께 공유해 보세요!\n\n더 많은 인사이트는 프로필 링크를 확인해 주세요.',
      cta: '저장하기 & 팔로우',
    },
  ];

  const caption = `${hook}\n\n카드뉴스로 정리한 핵심 가이드를 확인해 보세요.\n\n도움이 되셨다면 [저장 🔖] 해두시고 필요할 때마다 꺼내보세요!\n\n#카드뉴스 #인스타그램마케팅 #자기계발 #생산성 #브랜딩`;

  return {
    platform: 'INSTAGRAM',
    content: caption,
    characterCount: caption.length,
    slides,
    slideCount: slides.length,
    isReady: true,
    notes: '인스타그램 캐러셀은 마지막 슬라이드 완독률과 저장(Save) 수가 알고리즘 배포를 결정합니다.',
  };
}

// Helper: Extract or build a hook line based on tone and platform
function extractHookLine(raw: string, tone: ToneOption, platform: PlatformType): string {
  const lines = raw.trim().split('\n').filter(l => l.trim().length > 0);
  if (lines.length > 0 && lines[0].length < 60) {
    return lines[0].trim();
  }

  const topicSnippet = raw.slice(0, 30).trim();

  switch (tone) {
    case 'contrarian':
      return `대부분이 ${topicSnippet}에 대해 완전히 반대로 알고 있습니다.`;
    case 'builder':
      return `0에서 시작해 ${topicSnippet}을(를) 직접 구축하며 배운 3가지 교훈.`;
    case 'storytelling':
      return `지난달 ${topicSnippet} 때문에 큰 실패를 겪고 난 뒤에야 깨달았습니다.`;
    case 'authoritative':
      return `상위 1% 전문가들이 ${topicSnippet}을(를) 다루는 3가지 절대 원칙.`;
    case 'conversational':
    default:
      return platform === 'THREADS'
        ? `솔직히 ${topicSnippet}, 다들 어떻게 생각하시나요?`
        : `${topicSnippet}으로 확실한 성과를 만드는 실전 가이드`;
  }
}

// Helper: Extract clean bullet points from user thoughts
function extractKeyPoints(raw: string): string[] {
  const lines = raw.trim().split('\n').map(l => l.trim()).filter(Boolean);
  const bulletLines = lines.filter(l => l.startsWith('-') || l.startsWith('•') || l.startsWith('*') || /^\d+\./.test(l));

  if (bulletLines.length >= 2) {
    return bulletLines.map(l => l.replace(/^[-•*\d.]+\s*/, '').trim());
  }

  // If no explicit bullets, split by sentence or paragraphs
  const sentences = raw.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 10);
  if (sentences.length >= 2) {
    return sentences.slice(0, 3).map(s => s.trim());
  }

  return [
    '핵심 본질에 집중하고 불필요한 장식을 걷어내세요.',
    '타깃 오디언스가 직면한 가장 아픈 문제를 먼저 건드리세요.',
    '지속 가능한 루틴을 만들어 매일 복리의 효과를 누리세요.',
  ];
}
