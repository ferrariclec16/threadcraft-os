import { HookAnalysis, HookSuggestion } from './types';

// Regular expressions and heuristics for viral hook analysis
const NUMBER_REGEX = /(\d+([,\.]\d+)?(%|배|원|달러|\$|만|억|개월|일|시간|분|초|단계|가지|개|명|곳|권)?)/;
const CURRENCY_OR_PERCENT_REGEX = /(\$|\%|원|억|만|k|m)\b/i;
const CONTRARIAN_KEYWORDS = [
  '하지 마세요', '그만두세요', '실수', '착각', '실패', '반대로', '오히려',
  '대부분', '거짓말', '속지 마세요', '진실', '비밀', '안 알려주는',
  'stop', 'never', 'mistake', 'wrong', 'myth', 'truth', 'secret', 'unpopular opinion'
];
const CURIOSITY_KEYWORDS = [
  '이유', '방법', '결과', '어떻게', '알고 계셨나요', '충격', '비결', '원리',
  '1가지', '비법', '깨달았습니다', '놀라운', 'why', 'how', 'revealed', 'lesson'
];
const QUESTION_REGEX = /(\?|까요|가요|습니까|나요|했더니|보셨나요)/;

export function analyzeViralHook(text: string): HookAnalysis {
  if (!text || text.trim().length === 0) {
    return {
      originalHook: '',
      totalScore: 0,
      curiosityScore: 0,
      contrastScore: 0,
      rhythmScore: 0,
      specificityScore: 0,
      grade: 'D',
      feedback: ['훅 텍스트를 입력해 주세요.'],
      suggestions: [],
    };
  }

  // Extract the first 1-2 lines as the hook
  const lines = text.trim().split('\n').filter(l => l.trim().length > 0);
  const firstLine = lines[0] || '';
  const secondLine = lines[1] || '';
  const hookCandidate = firstLine.length < 20 && secondLine ? `${firstLine} ${secondLine}` : firstLine;

  const feedback: string[] = [];

  // 1. Curiosity Gap Score (0-25)
  let curiosityScore = 10;
  const hasQuestion = QUESTION_REGEX.test(hookCandidate);
  const hasCuriosityWord = CURIOSITY_KEYWORDS.some(k => hookCandidate.includes(k));
  if (hasQuestion) curiosityScore += 7;
  if (hasCuriosityWord) curiosityScore += 8;
  if (hookCandidate.length > 80 && !hasQuestion) {
    curiosityScore -= 5;
    feedback.push('호기심을 유발하기 전에 결론이 모두 노출되어 궁금증이 반감됩니다.');
  } else {
    feedback.push(hasQuestion ? '질문형 후킹으로 독자의 적극적인 뇌 반응을 유도하고 있습니다.' : '호기심을 자극하는 열린 결말 요소를 조금 더 보강할 수 있습니다.');
  }
  curiosityScore = Math.min(25, Math.max(0, curiosityScore));

  // 2. Contrast & Conflict Score (0-25)
  let contrastScore = 8;
  const hasContrarian = CONTRARIAN_KEYWORDS.some(k => hookCandidate.includes(k));
  if (hasContrarian) {
    contrastScore += 14;
    feedback.push('상식을 뒤집는 대조(Contrarian) 키워드가 독자의 스크롤을 강력하게 멈춥니다.');
  } else {
    feedback.push('일반적인 서술문입니다. "대부분이 착각하는 ~" 같은 역발상 프레임을 더하면 효과가 2배 증가합니다.');
  }
  contrastScore = Math.min(25, Math.max(0, contrastScore));

  // 3. Rhythm & Mobile Readability Score (0-25)
  let rhythmScore = 12;
  const charLen = hookCandidate.length;
  if (charLen >= 15 && charLen <= 45) {
    rhythmScore += 13;
    feedback.push('모바일 화면에서 1초 만에 인지 가능한 최적의 글자 수(15~45자)입니다.');
  } else if (charLen < 15) {
    rhythmScore += 3;
    feedback.push('첫 문장이 다소 짧아 핵심 가치나 맥락이 충분히 전달되지 않을 수 있습니다.');
  } else {
    rhythmScore -= 4;
    feedback.push(`첫 줄이 ${charLen}자로 다소 깁니다. 40자 이내로 줄바꿈을 주면 엄지손가락 스크롤 멈춤률이 상승합니다.`);
  }
  rhythmScore = Math.min(25, Math.max(0, rhythmScore));

  // 4. Specificity & Data Density Score (0-25)
  let specificityScore = 5;
  const hasNumber = NUMBER_REGEX.test(hookCandidate);
  const hasCurrency = CURRENCY_OR_PERCENT_REGEX.test(hookCandidate);
  if (hasNumber) specificityScore += 12;
  if (hasCurrency) specificityScore += 8;
  if (hasNumber || hasCurrency) {
    feedback.push('구체적인 숫자와 데이터가 포함되어 신뢰성과 클릭 유인이 매우 높습니다.');
  } else {
    feedback.push('추상적인 표현 대신 구체적인 숫자(기간, 금액, 비율 등)를 넣으면 신뢰도가 급상승합니다.');
  }
  specificityScore = Math.min(25, Math.max(0, specificityScore));

  const totalScore = curiosityScore + contrastScore + rhythmScore + specificityScore;

  let grade: HookAnalysis['grade'] = 'D';
  if (totalScore >= 88) grade = 'S';
  else if (totalScore >= 78) grade = 'A';
  else if (totalScore >= 65) grade = 'B';
  else if (totalScore >= 50) grade = 'C';

  // Generate 3 algorithmic psychological rewrite suggestions
  const suggestions: HookSuggestion[] = generateHookSuggestions(hookCandidate);

  return {
    originalHook: hookCandidate,
    totalScore,
    curiosityScore,
    contrastScore,
    rhythmScore,
    specificityScore,
    grade,
    feedback,
    suggestions,
  };
}

function generateHookSuggestions(raw: string): HookSuggestion[] {
  const clean = raw.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').trim();
  const coreTopic = clean.length > 20 ? clean.slice(0, 20) + '...' : clean;

  return [
    {
      type: 'contrarian',
      title: '상식 뒤집기형 (Stop-Loss Frame)',
      hook: `열심히 ${coreTopic}하는 사람일수록 90%는 실패합니다. 반대로 생각하세요.`,
      rationale: '일반적인 통념을 부정하여 독자의 인지 부조화를 유발하고 "더 보기" 클릭을 유도합니다.',
    },
    {
      type: 'data_metric',
      title: '0 to 1 데이터형 (Specific Proof)',
      hook: `${coreTopic}, 3개월 만에 성과를 3배로 바꾼 결정적인 3가지 원칙`,
      rationale: '구체적인 기간과 배수를 제시해 독자에게 명확한 보상(ROI)을 약속합니다.',
    },
    {
      type: 'pain_question',
      title: '결핍 자극형 (Self-Diagnosis)',
      hook: `혹시 아직도 ${coreTopic} 때문에 매일 밤 2시간씩 날리고 계신가요?`,
      rationale: '독자가 겪고 있는 실질적인 고통과 시간 낭비를 정면으로 지적하여 깊은 공감을 이끕니다.',
    },
    {
      type: 'curiosity_gap',
      title: '호기심 공백형 (Insider Secret)',
      hook: `상위 1% 크리에이터들이 절대 밖으로 발설하지 않는 ${coreTopic}의 진실`,
      rationale: '소외에 대한 두려움(FOMO)을 자극하여 글 끝까지 읽게 만듭니다.',
    },
  ];
}
