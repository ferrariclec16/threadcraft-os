'use client';

import React from 'react';
import { HookAnalysis } from '../lib/types';
import { Zap, HelpCircle, Flame, Smartphone, Hash, ArrowRight, Check, Sparkles } from 'lucide-react';

interface HookAnalyzerProps {
  analysis?: HookAnalysis;
  onApplyHook: (newHook: string) => void;
  activeHook: string;
}

export const HookAnalyzer: React.FC<HookAnalyzerProps> = ({
  analysis,
  onApplyHook,
  activeHook,
}) => {
  if (!analysis) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#121520]/80 p-5 backdrop-blur-sm">
        <p className="text-xs text-zinc-400">아이디어를 입력하면 실시간 바이럴 훅 점수가 계산됩니다.</p>
      </div>
    );
  }

  const { totalScore, curiosityScore, contrastScore, rhythmScore, specificityScore, grade, feedback, suggestions } = analysis;

  const getScoreColor = (score: number) => {
    if (score >= 88) return 'from-purple-500 via-pink-500 to-amber-400 text-purple-300 border-purple-500/40';
    if (score >= 78) return 'from-emerald-500 to-teal-400 text-emerald-400 border-emerald-500/30';
    if (score >= 60) return 'from-amber-500 to-yellow-400 text-amber-400 border-amber-500/30';
    return 'from-rose-500 to-red-400 text-rose-400 border-rose-500/30';
  };

  const getGradeBadge = (grade: string) => {
    switch (grade) {
      case 'S': return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30';
      case 'A': return 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20';
      case 'B': return 'bg-blue-500 text-white';
      case 'C': return 'bg-amber-500 text-black font-bold';
      default: return 'bg-rose-500 text-white';
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#121520]/90 p-5 shadow-xl backdrop-blur-md space-y-5">
      {/* Header & Main Score Gauge */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              바이럴 훅(Hook) 진단 엔진
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${getGradeBadge(grade)}`}>
                등급 {grade}
              </span>
            </h3>
            <p className="text-[11px] text-zinc-400">스크롤 멈춤(Scroll-stop) 확률 실시간 연산</p>
          </div>
        </div>

        {/* Score Number Display */}
        <div className="flex items-baseline gap-1">
          <span className={`text-3xl font-black bg-gradient-to-r ${getScoreColor(totalScore)} bg-clip-text text-transparent`}>
            {totalScore}
          </span>
          <span className="text-xs font-semibold text-zinc-500">/100</span>
        </div>
      </div>

      {/* 4-Factor Heuristic Breakdown Bars */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {/* 1. Curiosity */}
        <div className="rounded-xl bg-white/5 p-3 border border-white/5 space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-zinc-400 flex items-center gap-1">
              <HelpCircle className="h-3 w-3 text-sky-400" /> 호기심 공백
            </span>
            <span className="font-bold text-white">{curiosityScore}/25</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-500"
              style={{ width: `${(curiosityScore / 25) * 100}%` }}
            />
          </div>
        </div>

        {/* 2. Contrast */}
        <div className="rounded-xl bg-white/5 p-3 border border-white/5 space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-zinc-400 flex items-center gap-1">
              <Flame className="h-3 w-3 text-rose-400" /> 역발상 대조
            </span>
            <span className="font-bold text-white">{contrastScore}/25</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-rose-500 to-orange-500 transition-all duration-500"
              style={{ width: `${(contrastScore / 25) * 100}%` }}
            />
          </div>
        </div>

        {/* 3. Rhythm */}
        <div className="rounded-xl bg-white/5 p-3 border border-white/5 space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-zinc-400 flex items-center gap-1">
              <Smartphone className="h-3 w-3 text-emerald-400" /> 모바일 가독성
            </span>
            <span className="font-bold text-white">{rhythmScore}/25</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
              style={{ width: `${(rhythmScore / 25) * 100}%` }}
            />
          </div>
        </div>

        {/* 4. Specificity */}
        <div className="rounded-xl bg-white/5 p-3 border border-white/5 space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-zinc-400 flex items-center gap-1">
              <Hash className="h-3 w-3 text-amber-400" /> 데이터 구체성
            </span>
            <span className="font-bold text-white">{specificityScore}/25</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 transition-all duration-500"
              style={{ width: `${(specificityScore / 25) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Actionable Diagnostics Checklist */}
      <div className="rounded-xl bg-white/[0.03] p-3.5 border border-white/5">
        <h4 className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider mb-2">
          알고리즘 최적화 처방전
        </h4>
        <ul className="space-y-1.5">
          {feedback.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
              <span className="text-indigo-400 mt-0.5">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 1-Click Psychological Rewrite Variations */}
      {suggestions.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              검증된 바이럴 공식 원클릭 교체 (3가지 대안)
            </h4>
            <span className="text-[10px] text-zinc-400">클릭 시 전체 플랫폼 자동 반영</span>
          </div>

          <div className="grid gap-2">
            {suggestions.map((sug, idx) => {
              const isCurrent = activeHook === sug.hook;
              return (
                <div
                  key={idx}
                  className={`group relative rounded-xl p-3 border transition-all ${
                    isCurrent
                      ? 'border-indigo-500/80 bg-indigo-500/10'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-[10px] font-bold text-indigo-300 border border-indigo-500/30">
                          {sug.title}
                        </span>
                        <span className="text-[10px] text-zinc-400">{sug.rationale}</span>
                      </div>
                      <p className="text-xs font-medium text-white leading-relaxed">
                        {sug.hook}
                      </p>
                    </div>

                    <button
                      onClick={() => onApplyHook(sug.hook)}
                      disabled={isCurrent}
                      className={`flex-shrink-0 flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-bold transition-all ${
                        isCurrent
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                          : 'bg-indigo-600 text-white hover:bg-indigo-500 active:scale-95 shadow-sm'
                      }`}
                    >
                      {isCurrent ? (
                        <>
                          <Check className="h-3 w-3" />
                          <span>적용됨</span>
                        </>
                      ) : (
                        <>
                          <span>적용</span>
                          <ArrowRight className="h-3 w-3" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
