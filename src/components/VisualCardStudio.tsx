'use client';

import React, { useRef, useState } from 'react';
import { CardTheme, VisualCardConfig } from '../lib/types';
import { Download, Sparkles, Check, Image as ImageIcon, Palette, Type, ShieldCheck } from 'lucide-react';
import { toPng } from 'html-to-image';

interface VisualCardStudioProps {
  content: string;
  config: VisualCardConfig;
  onUpdateConfig: (newConfig: VisualCardConfig) => void;
}

export const VisualCardStudio: React.FC<VisualCardStudioProps> = ({
  content,
  config,
  onUpdateConfig,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2, // 2x retina crispness (1080x1080 equivalent)
      });

      const link = document.createElement('a');
      link.download = `threadcraft-card-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2500);
    } catch (err) {
      console.error('Failed to export image', err);
    } finally {
      setDownloading(false);
    }
  };

  const getThemeStyles = (theme: CardTheme) => {
    switch (theme) {
      case 'obsidian':
        return {
          cardBg: 'bg-gradient-to-br from-[#0c0d14] via-[#10121d] to-[#07080c]',
          textColor: 'text-zinc-100',
          accentColor: 'text-indigo-400',
          badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
          borderColor: 'border-white/10 shadow-[0_0_50px_rgba(99,102,241,0.15)]',
          quoteBg: 'border-l-2 border-indigo-500 pl-4',
        };
      case 'clean':
        return {
          cardBg: 'bg-[#151722]',
          textColor: 'text-zinc-200',
          accentColor: 'text-teal-400',
          badgeBg: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
          borderColor: 'border-white/10 shadow-2xl',
          quoteBg: 'border-l-2 border-teal-500 pl-4',
        };
      case 'paper':
        return {
          cardBg: 'bg-[#f8f9fa]',
          textColor: 'text-zinc-900',
          accentColor: 'text-zinc-700',
          badgeBg: 'bg-zinc-200 text-zinc-800 border-zinc-300',
          borderColor: 'border-zinc-300 shadow-xl',
          quoteBg: 'border-l-2 border-zinc-800 pl-4',
        };
      case 'neon':
        return {
          cardBg: 'bg-[#0a0c10]',
          textColor: 'text-zinc-100 font-mono',
          accentColor: 'text-emerald-400',
          badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
          borderColor: 'border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.2)]',
          quoteBg: 'border-l-2 border-emerald-400 pl-4',
        };
      case 'gradient':
        return {
          cardBg: 'bg-gradient-to-tr from-purple-900 via-indigo-950 to-slate-900',
          textColor: 'text-white',
          accentColor: 'text-pink-300',
          badgeBg: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
          borderColor: 'border-purple-500/30 shadow-[0_0_50px_rgba(236,72,153,0.2)]',
          quoteBg: 'border-l-2 border-pink-500 pl-4',
        };
    }
  };

  const currentTheme = getThemeStyles(config.theme);

  // Clean and limit preview content for graphic card
  const previewText = content
    .split('\n')
    .filter(l => l.trim().length > 0)
    .slice(0, 7)
    .join('\n\n');

  return (
    <div className="rounded-2xl border border-white/10 bg-[#121520]/90 p-5 shadow-xl backdrop-blur-md space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/30">
            <ImageIcon className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              비주얼 카드 스튜디오 (1초 카드뉴스 이미지 엔진)
            </h3>
            <p className="text-[11px] text-zinc-400">Canva/Figma 없이 고해상도 SNS 공유 카드(1080x1080) 즉시 렌더링</p>
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          disabled={downloading}
          className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-md active:scale-95 ${
            downloadSuccess
              ? 'bg-emerald-500 text-white shadow-emerald-500/30'
              : 'bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white hover:opacity-90 shadow-pink-500/25'
          }`}
        >
          {downloadSuccess ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>저장 완료!</span>
            </>
          ) : downloading ? (
            <span>렌더링 중...</span>
          ) : (
            <>
              <Download className="h-3.5 w-3.5" />
              <span>고해상도 PNG 다운로드</span>
            </>
          )}
        </button>
      </div>

      {/* Control Bar: Theme Switcher & Settings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-white/[0.03] p-3 rounded-xl border border-white/5">
        {/* Theme Picker */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
            <Palette className="h-3 w-3" /> 테마 프리셋
          </label>
          <select
            value={config.theme}
            onChange={(e) => onUpdateConfig({ ...config, theme: e.target.value as CardTheme })}
            className="w-full rounded-lg bg-black/50 px-2.5 py-1.5 text-xs text-white border border-white/10 focus:outline-none focus:border-indigo-500"
          >
            <option value="obsidian">옵시디언 다크 (Obsidian)</option>
            <option value="clean">에디토리얼 슬레이트 (Clean)</option>
            <option value="paper">미니멀 페이퍼 화이트 (Paper)</option>
            <option value="neon">사이버 네온 터미널 (Neon)</option>
            <option value="gradient">선셋 바이올렛 (Gradient)</option>
          </select>
        </div>

        {/* Badge Text Input */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> 카테고리 뱃지
          </label>
          <input
            type="text"
            value={config.customBadge}
            onChange={(e) => onUpdateConfig({ ...config, customBadge: e.target.value })}
            className="w-full rounded-lg bg-black/50 px-2.5 py-1.5 text-xs text-white border border-white/10 focus:outline-none focus:border-indigo-500"
            placeholder="예: THREADS ALGORITHM"
          />
        </div>

        {/* Author Name */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
            <Type className="h-3 w-3" /> 작성자명
          </label>
          <input
            type="text"
            value={config.authorName}
            onChange={(e) => onUpdateConfig({ ...config, authorName: e.target.value })}
            className="w-full rounded-lg bg-black/50 px-2.5 py-1.5 text-xs text-white border border-white/10 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Verified Badge Toggle */}
        <div className="space-y-1 flex flex-col justify-end">
          <label className="flex items-center gap-2 cursor-pointer py-1.5 text-xs text-zinc-300">
            <input
              type="checkbox"
              checked={config.showVerified}
              onChange={(e) => onUpdateConfig({ ...config, showVerified: e.target.checked })}
              className="rounded bg-black border-white/20 text-indigo-600 focus:ring-0"
            />
            <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
            <span>인증 마크(뱃지) 표시</span>
          </label>
        </div>
      </div>

      {/* Render Canvas Wrapper (Export Target) */}
      <div className="flex justify-center py-4 bg-black/40 rounded-2xl border border-white/5 overflow-hidden">
        <div
          ref={cardRef}
          className={`w-[480px] h-[480px] p-8 rounded-3xl border flex flex-col justify-between transition-all select-none ${currentTheme.cardBg} ${currentTheme.borderColor}`}
        >
          {/* Top Author Branding Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={config.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt="author"
                className="h-11 w-11 rounded-full object-cover border border-white/20 shadow-md"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className={`text-sm font-black tracking-tight ${config.theme === 'paper' ? 'text-zinc-900' : 'text-white'}`}>
                    {config.authorName}
                  </span>
                  {config.showVerified && (
                    <span className="h-3.5 w-3.5 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[9px] font-bold">
                      ✓
                    </span>
                  )}
                </div>
                <span className={`text-xs ${config.theme === 'paper' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                  {config.authorHandle}
                </span>
              </div>
            </div>

            {/* Custom Badge */}
            {config.customBadge && (
              <span className={`rounded-lg px-2.5 py-1 text-[10px] font-black uppercase tracking-wider border ${currentTheme.badgeBg}`}>
                {config.customBadge}
              </span>
            )}
          </div>

          {/* Main Core Insight Body */}
          <div className={`my-auto space-y-3 ${currentTheme.quoteBg}`}>
            <p className={`text-base font-bold leading-relaxed whitespace-pre-line ${currentTheme.textColor}`}>
              {previewText || '당신의 핵심 생각과 인사이트를 입력하면 아름다운 비주얼 카드로 자동 렌더링됩니다.'}
            </p>
          </div>

          {/* Bottom Watermark / Brand Signature */}
          <div className={`pt-4 border-t ${config.theme === 'paper' ? 'border-zinc-200' : 'border-white/10'} flex items-center justify-between text-[11px] ${config.theme === 'paper' ? 'text-zinc-500' : 'text-zinc-500'}`}>
            <span>ThreadCraft OS • Viral Quote</span>
            <span className="font-semibold">저장 🔖 후 나중에 다시보기</span>
          </div>
        </div>
      </div>
    </div>
  );
};
