'use client';

import React from 'react';
import { Sparkles, Layers, Sliders, Database, ExternalLink, PlusCircle } from 'lucide-react';

interface NavbarProps {
  activeTab: 'editor' | 'kanban' | 'analytics';
  setActiveTab: (tab: 'editor' | 'kanban' | 'analytics') => void;
  onNewPost: () => void;
  onOpenPricing: () => void;
  onOpenSettings: () => void;
  isDbConnected?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onNewPost,
  onOpenPricing,
  onOpenSettings,
  isDbConnected = false,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0d0f17]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-pink-500 shadow-lg shadow-indigo-500/25">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-white">ThreadCraft</span>
                <span className="rounded-md bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 px-2 py-0.5 text-[11px] font-bold text-violet-300 border border-violet-500/30">
                  OS v2.0
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-medium hidden sm:block">
                Omnichannel Viral Content Engine
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 rounded-xl bg-white/5 p-1 border border-white/10">
            <button
              onClick={() => setActiveTab('editor')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'editor'
                  ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              바이럴 스튜디오
            </button>
            <button
              onClick={() => setActiveTab('kanban')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'kanban'
                  ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              배포 파이프라인
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'analytics'
                  ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sliders className="h-3.5 w-3.5" />
              골든타임 분석기
            </button>
          </nav>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          {/* DB Status Badge */}
          <div
            onClick={onOpenSettings}
            className="hidden sm:flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-medium text-zinc-300 border border-white/10 cursor-pointer hover:border-white/20 transition-colors"
            title="클릭하여 DB 및 API 설정 확인"
          >
            <span className={`h-2 w-2 rounded-full ${isDbConnected ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-amber-400'}`} />
            <Database className="h-3 w-3 text-zinc-400" />
            <span>{isDbConnected ? 'Postgres 연동' : '로컬 모드 (DB 준비됨)'}</span>
          </div>

          {/* Pricing Upgrade Button */}
          <button
            onClick={onOpenPricing}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 px-3 py-1.5 text-xs font-bold text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>PRO 업그레이드</span>
          </button>

          {/* New Post Button */}
          <button
            onClick={onNewPost}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-500 via-violet-600 to-purple-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 hover:opacity-90 active:scale-95 transition-all"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">새 글 작성</span>
          </button>

          {/* GitHub Repo Link */}
          <a
            href="https://github.com/ferrariclec16/threadcraft-os"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-white/5 p-2 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors border border-white/10"
            title="GitHub 저장소 보기"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
};
