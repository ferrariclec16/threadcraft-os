'use client';

import React, { useState } from 'react';
import { PlatformType, PlatformDraft } from '../lib/types';
import { Copy, Check, Info, ChevronLeft, ChevronRight, MessageSquare, Repeat2, Heart, Send, Bookmark, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MultiPlatformViewerProps {
  drafts: Record<PlatformType, PlatformDraft>;
  onUpdateDraftContent: (platform: PlatformType, newContent: string) => void;
  authorName?: string;
  authorHandle?: string;
  authorAvatar?: string;
}

export const MultiPlatformViewer: React.FC<MultiPlatformViewerProps> = ({
  drafts,
  onUpdateDraftContent,
  authorName = '크리에이터',
  authorHandle = '@creator',
  authorAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType>('THREADS');
  const [copied, setCopied] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const activeDraft = drafts[selectedPlatform];

  const handleCopy = () => {
    if (!activeDraft) return;
    navigator.clipboard.writeText(activeDraft.content);
    setCopied(true);

    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch {
      // fallback
    }

    setTimeout(() => setCopied(false), 2000);
  };

  const getCharLimit = (platform: PlatformType) => {
    switch (platform) {
      case 'THREADS': return 500;
      case 'TWITTER': return 280;
      case 'LINKEDIN': return 3000;
      case 'INSTAGRAM': return 2200;
    }
  };

  const charLimit = getCharLimit(selectedPlatform);
  const isOverLimit = activeDraft.characterCount > charLimit;

  return (
    <div className="rounded-2xl border border-white/10 bg-[#121520]/90 p-5 shadow-xl backdrop-blur-md space-y-4">
      {/* Platform Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
          <button
            onClick={() => { setSelectedPlatform('THREADS'); setCurrentSlideIndex(0); }}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              selectedPlatform === 'THREADS'
                ? 'bg-black text-white shadow-md border border-white/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>@ 스레드 (Threads)</span>
          </button>
          <button
            onClick={() => { setSelectedPlatform('TWITTER'); setCurrentSlideIndex(0); }}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              selectedPlatform === 'TWITTER'
                ? 'bg-[#1d9bf0] text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>𝕏 트위터 (타래)</span>
          </button>
          <button
            onClick={() => { setSelectedPlatform('LINKEDIN'); setCurrentSlideIndex(0); }}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              selectedPlatform === 'LINKEDIN'
                ? 'bg-[#0a66c2] text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>in 링크드인</span>
          </button>
          <button
            onClick={() => { setSelectedPlatform('INSTAGRAM'); setCurrentSlideIndex(0); }}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              selectedPlatform === 'INSTAGRAM'
                ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>인스타 카드뉴스</span>
          </button>
        </div>

        {/* Copy Button & Character Count */}
        <div className="flex items-center gap-3">
          <div className="text-[11px] font-semibold text-zinc-400">
            <span className={isOverLimit ? 'text-rose-400 font-bold' : 'text-zinc-200'}>
              {activeDraft.characterCount}
            </span>
            <span className="text-zinc-500"> / {charLimit}자</span>
          </div>

          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-md active:scale-95 ${
              copied
                ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                : 'bg-gradient-to-r from-indigo-500 via-violet-600 to-purple-600 text-white hover:opacity-90 shadow-indigo-500/25'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>복사 완료!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>네이티브 포맷 복사</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Platform Optimization Advice Note */}
      {activeDraft.notes && (
        <div className="flex items-start gap-2 rounded-xl bg-indigo-500/10 p-3 border border-indigo-500/20 text-xs text-indigo-300">
          <Info className="h-4 w-4 flex-shrink-0 mt-0.5 text-indigo-400" />
          <p>{activeDraft.notes}</p>
        </div>
      )}

      {/* Main Content Area: Editor + Native Feed Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left Column: Direct Text Edit Area */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="font-semibold text-zinc-300">플랫폼 맞춤 텍스트 에디터</span>
            <span className="text-[10px] text-zinc-500">직접 수정하면 시뮬레이터에 실시간 반영</span>
          </div>

          <textarea
            value={activeDraft.content}
            onChange={(e) => onUpdateDraftContent(selectedPlatform, e.target.value)}
            rows={14}
            className="w-full rounded-xl bg-black/40 p-4 font-mono text-xs leading-relaxed text-zinc-100 border border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all resize-y"
            placeholder="콘텐츠 내용을 입력하세요..."
          />
        </div>

        {/* Right Column: Pixel-Perfect Native Feed Simulator */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="font-semibold text-zinc-300">실제 피드(Feed) 미리보기</span>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              네이티브 뷰포트
            </span>
          </div>

          {/* 1. THREADS SIMULATOR */}
          {selectedPlatform === 'THREADS' && (
            <div className="rounded-2xl bg-[#101010] p-4 border border-white/10 shadow-2xl text-white font-sans max-w-md mx-auto">
              <div className="flex gap-3">
                <img
                  src={authorAvatar}
                  alt="avatar"
                  className="h-10 w-10 rounded-full object-cover border border-white/10 flex-shrink-0"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs">{authorHandle.replace('@', '')}</span>
                      <span className="h-3 w-3 rounded-full bg-indigo-500 flex items-center justify-center text-[8px] text-white">✓</span>
                    </div>
                    <span className="text-[10px] text-zinc-500">방금 전</span>
                  </div>

                  <div className="text-xs text-zinc-100 whitespace-pre-wrap leading-relaxed">
                    {activeDraft.content}
                  </div>

                  {/* Threads Action Bar */}
                  <div className="flex items-center gap-4 pt-2 text-zinc-400 text-xs">
                    <button className="flex items-center gap-1 hover:text-pink-400 transition-colors">
                      <Heart className="h-4 w-4" />
                      <span className="text-[10px]">124</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-sky-400 transition-colors">
                      <MessageSquare className="h-4 w-4" />
                      <span className="text-[10px]">38</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
                      <Repeat2 className="h-4 w-4" />
                      <span className="text-[10px]">19</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-white transition-colors">
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. TWITTER / X SIMULATOR */}
          {selectedPlatform === 'TWITTER' && (
            <div className="rounded-2xl bg-black p-4 border border-white/10 shadow-2xl text-white font-sans max-w-md mx-auto space-y-3">
              <div className="flex items-start gap-3">
                <img
                  src={authorAvatar}
                  alt="avatar"
                  className="h-10 w-10 rounded-full object-cover border border-white/10 flex-shrink-0"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="font-bold text-white">{authorName}</span>
                    <span className="text-zinc-500">{authorHandle}</span>
                    <span className="text-zinc-600">· 1분</span>
                  </div>

                  <div className="text-xs text-zinc-100 whitespace-pre-wrap leading-relaxed">
                    {activeDraft.tweets && activeDraft.tweets[0] ? activeDraft.tweets[0].text : activeDraft.content.slice(0, 200)}
                  </div>

                  <div className="flex items-center justify-between text-zinc-500 text-xs pt-2">
                    <span className="flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" /> 42</span>
                    <span className="flex items-center gap-1"><Repeat2 className="h-3.5 w-3.5" /> 88</span>
                    <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5" /> 312</span>
                    <span className="flex items-center gap-1"><Bookmark className="h-3.5 w-3.5" /> 154</span>
                    <span className="flex items-center gap-1"><Share2 className="h-3.5 w-3.5" /></span>
                  </div>
                </div>
              </div>

              {activeDraft.tweets && activeDraft.tweets.length > 1 && (
                <div className="border-t border-white/10 pt-2 text-center">
                  <span className="text-[10px] text-zinc-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                    🧵 총 {activeDraft.tweets.length}개의 트윗으로 연결된 타래입니다
                  </span>
                </div>
              )}
            </div>
          )}

          {/* 3. LINKEDIN SIMULATOR */}
          {selectedPlatform === 'LINKEDIN' && (
            <div className="rounded-2xl bg-[#1b1f23] p-4 border border-white/10 shadow-2xl text-white font-sans max-w-md mx-auto space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={authorAvatar}
                  alt="avatar"
                  className="h-11 w-11 rounded-full object-cover border border-white/10 flex-shrink-0"
                />
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1">
                    {authorName}
                    <span className="text-[10px] text-zinc-400 font-normal">· 1촌</span>
                  </h4>
                  <p className="text-[10px] text-zinc-400">Founder & Content Architect | B2B Growth</p>
                  <p className="text-[9px] text-zinc-500">1시간 전 · 🌐</p>
                </div>
              </div>

              <div className="text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed line-clamp-6">
                {activeDraft.content}
              </div>
              <p className="text-xs text-indigo-400 font-semibold cursor-pointer">...더 보기</p>

              <div className="border-t border-white/10 pt-2 flex items-center justify-between text-zinc-400 text-xs">
                <span>👍 158명</span>
                <span>댓글 24개 · 공유 11회</span>
              </div>
            </div>
          )}

          {/* 4. INSTAGRAM CAROUSEL SLIDE VIEWER */}
          {selectedPlatform === 'INSTAGRAM' && (
            <div className="space-y-3">
              {activeDraft.slides && activeDraft.slides.length > 0 ? (
                <div className="relative rounded-2xl bg-gradient-to-br from-zinc-900 via-black to-zinc-950 p-6 border border-white/15 shadow-2xl text-white aspect-square flex flex-col justify-between max-w-sm mx-auto">
                  {/* Top Badge & Slide Indicator */}
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      {activeDraft.slides[currentSlideIndex]?.badge || 'SLIDE'}
                    </span>
                    <span className="text-xs font-bold text-zinc-400">
                      {currentSlideIndex + 1} / {activeDraft.slides.length}
                    </span>
                  </div>

                  {/* Slide Main Content */}
                  <div className="space-y-3 my-auto">
                    <h3 className="text-lg font-black text-white leading-tight">
                      {activeDraft.slides[currentSlideIndex]?.headline}
                    </h3>
                    <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line">
                      {activeDraft.slides[currentSlideIndex]?.body}
                    </p>

                    {activeDraft.slides[currentSlideIndex]?.bulletPoints && (
                      <ul className="space-y-1.5 pt-2">
                        {activeDraft.slides[currentSlideIndex]?.bulletPoints?.map((bp, i) => (
                          <li key={i} className="text-xs text-indigo-300 flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
                            {bp}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Navigation Arrows */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <button
                      onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
                      disabled={currentSlideIndex === 0}
                      className="rounded-full bg-white/10 p-1.5 text-white disabled:opacity-30 hover:bg-white/20 transition-all"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    {/* Dots */}
                    <div className="flex items-center gap-1">
                      {activeDraft.slides.map((_, i) => (
                        <span
                          key={i}
                          className={`h-1.5 rounded-full transition-all ${
                            i === currentSlideIndex ? 'w-4 bg-pink-500' : 'w-1.5 bg-white/20'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentSlideIndex(Math.min(activeDraft.slides!.length - 1, currentSlideIndex + 1))}
                      disabled={currentSlideIndex === activeDraft.slides.length - 1}
                      className="rounded-full bg-white/10 p-1.5 text-white disabled:opacity-30 hover:bg-white/20 transition-all"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-zinc-400">
                  슬라이드 데이터가 없습니다.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
