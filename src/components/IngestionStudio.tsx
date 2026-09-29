'use client';

import React from 'react';
import { ToneOption } from '../lib/types';
import { Sparkles, MessageCircle, Flame, ShieldAlert, Cpu, HeartHandshake } from 'lucide-react';

interface IngestionStudioProps {
  rawIdea: string;
  setRawIdea: (val: string) => void;
  tone: ToneOption;
  setTone: (val: ToneOption) => void;
  pillar: string;
  setPillar: (val: string) => void;
  onSynthesize: () => void;
  isSynthesizing?: boolean;
}

export const IngestionStudio: React.FC<IngestionStudioProps> = ({
  rawIdea,
  setRawIdea,
  tone,
  setTone,
  pillar,
  setPillar,
  onSynthesize,
  isSynthesizing = false,
}) => {
  const toneOptions: { id: ToneOption; label: string; desc: string; icon: React.ReactNode }[] = [
    { id: 'conversational', label: '스레드 친근소통형', desc: '자연스러운 구어체와 댓글 티키타카 유도', icon: <MessageCircle className="h-3.5 w-3.5 text-sky-400" /> },
    { id: 'contrarian', label: '상식 뒤집기형', desc: '통념을 부수는 강렬한 핫테이크와 인지부조화', icon: <Flame className="h-3.5 w-3.5 text-rose-400" /> },
    { id: 'builder', label: '솔로 빌더 & 지표형', desc: '구체적 수치와 0에서 1을 만든 실행 교훈', icon: <Cpu className="h-3.5 w-3.5 text-emerald-400" /> },
    { id: 'authoritative', label: '전문가 인사이트', desc: '링크드인형 프레임워크와 비즈니스 인사이트', icon: <ShieldAlert className="h-3.5 w-3.5 text-indigo-400" /> },
    { id: 'storytelling', label: '진솔한 실패극복', desc: '인간적 취약성과 회복 과정을 담은 공감형', icon: <HeartHandshake className="h-3.5 w-3.5 text-pink-400" /> },
  ];

  const pillarOptions = ['성장 전략', '1인 창업 & SaaS', '생산성 & AI', '라이프 & 마인드셋', '브랜드 마케팅'];

  const sampleIdeas = [
    {
      title: '스레드 실패 공식',
      content: `대부분의 사람들이 스레드에 인스타그램이나 블로그 글을 그대로 복사해서 올립니다.
결과는 처참하게 노출 0회입니다.
스레드 알고리즘은 텍스트의 '호흡'과 '첫 30분의 댓글 소통'을 최우선으로 봅니다.
성공하는 3가지 공식:
1. 30자 이내의 호기심 공백 후킹 (첫 줄에 결론 다 말하지 말 것)
2. 모바일 가독성을 위한 2줄 단위 빈 줄 줄바꿈
3. 마지막에 무조건 댓글을 유도하는 열린 질문 던지기`,
      tone: 'contrarian' as ToneOption,
      pillar: '성장 전략',
    },
    {
      title: '1인 창업 자동화',
      content: `디자인에 목숨 걸지 마세요.
콘텐츠의 본질은 화려한 폰트가 아니라 '독자의 문제 해결'입니다.
텍스트 캡처 스타일의 미니멀 카드가 오히려 3배 더 많은 저장과 공유를 부릅니다.
시간을 아끼는 3가지 시스템:
- 모든 생각을 텍스트 한 줄로 먼저 메모하기
- 하나의 메시지를 4개 플랫폼 문법으로 1초 만에 쪼개기
- 화려한 그래픽 대신 고대비 다크모드 미니멀 카드로 끝내기`,
      tone: 'builder' as ToneOption,
      pillar: '1인 창업 & SaaS',
    },
    {
      title: 'AI 시대 생존법',
      content: `AI가 글을 대신 써준다고 해서 내 브랜딩이 저절로 되는 것이 아닙니다.
뻔한 ChatGPT 결과물을 그대로 올리면 독자들은 1초 만에 이탈합니다.
진짜 살아남는 법은:
나만의 고유한 경험과 실패담에, 검증된 심리학적 후킹 프레임워크를 얹는 것입니다.`,
      tone: 'conversational' as ToneOption,
      pillar: '생산성 & AI',
    },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-[#121520]/90 p-5 shadow-xl backdrop-blur-md space-y-4">
      {/* Studio Header & Quick Samples */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            아이디어 인출 스튜디오 (Brain-dump Ingestion)
          </h3>
          <p className="text-[11px] text-zinc-400">
            날것의 생각이나 메모를 적으면, 4대 SNS 알고리즘에 맞춘 네이티브 포맷으로 자동 변환합니다.
          </p>
        </div>

        {/* Quick Sample Presets */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-[10px] text-zinc-500 hidden sm:inline">샘플 불러오기:</span>
          {sampleIdeas.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                setRawIdea(s.content);
                setTone(s.tone);
                setPillar(s.pillar);
              }}
              className="rounded-lg bg-white/5 px-2.5 py-1 text-[11px] font-medium text-zinc-300 hover:bg-indigo-500/20 hover:text-indigo-300 border border-white/5 transition-all"
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Raw Idea Input */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-zinc-400">
          <span>아이디어 / 메모 / 기획 초안</span>
          <span>{rawIdea.length}자 입력됨</span>
        </div>
        <textarea
          value={rawIdea}
          onChange={(e) => setRawIdea(e.target.value)}
          rows={6}
          className="w-full rounded-xl bg-black/40 p-3.5 text-xs text-zinc-100 border border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-zinc-600 leading-relaxed"
          placeholder="여기에 떠오른 영감, 메모, 혹은 고객과의 대화에서 얻은 통찰을 자유롭게 적어보세요..."
        />
      </div>

      {/* Controls: Tone & Pillar Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {/* Tone Options */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            타깃 톤앤매너 (Algorithm Voice)
          </label>
          <div className="grid grid-cols-1 gap-1.5 max-h-36 overflow-y-auto pr-1">
            {toneOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setTone(opt.id)}
                className={`flex items-center justify-between rounded-xl p-2 text-left text-xs transition-all border ${
                  tone === opt.id
                    ? 'border-indigo-500 bg-indigo-500/15 text-white'
                    : 'border-white/5 bg-white/[0.02] text-zinc-400 hover:border-white/10 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  {opt.icon}
                  <span className="font-semibold">{opt.label}</span>
                </div>
                <span className="text-[10px] text-zinc-500 hidden sm:inline">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Pillar & Trigger Button */}
        <div className="flex flex-col justify-between space-y-3">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              콘텐츠 카테고리 (Pillar)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {pillarOptions.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPillar(p)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                    pillar === p
                      ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold shadow-md'
                      : 'bg-white/5 text-zinc-400 hover:text-zinc-200 border border-white/5'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Synthesize Button */}
          <button
            onClick={onSynthesize}
            disabled={isSynthesizing || !rawIdea.trim()}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-violet-600 to-pink-500 py-3 text-xs font-black text-white shadow-xl shadow-indigo-500/25 hover:opacity-95 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            <span>4대 SNS 동시 변환 & 훅 진단 실행 ➔</span>
          </button>
        </div>
      </div>
    </div>
  );
};
