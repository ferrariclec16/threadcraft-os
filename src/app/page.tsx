'use client';

import React, { useState, useEffect } from 'react';
import { Post, PlatformType, PostStatus, VisualCardConfig, ToneOption } from '@/lib/types';
import { getStoredPosts, savePosts, createNewPost } from '@/lib/store';
import { synthesizeAllPlatforms } from '@/lib/platformAdapters';
import { analyzeViralHook } from '@/lib/hookEngine';
import { Navbar } from '@/components/Navbar';
import { IngestionStudio } from '@/components/IngestionStudio';
import { HookAnalyzer } from '@/components/HookAnalyzer';
import { MultiPlatformViewer } from '@/components/MultiPlatformViewer';
import { VisualCardStudio } from '@/components/VisualCardStudio';
import { KanbanPipeline } from '@/components/KanbanPipeline';
import { AnalyticsSim } from '@/components/AnalyticsSim';
import { ProPricingModal } from '@/components/ProPricingModal';
import { SettingsModal } from '@/components/SettingsModal';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activePostId, setActivePostId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'editor' | 'kanban' | 'analytics'>('editor');
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  // Initialize from storage
  useEffect(() => {
    const loaded = getStoredPosts();
    setPosts(loaded);
    if (loaded.length > 0) {
      setActivePostId(loaded[0].id);
    }
  }, []);

  // Sync to storage on change
  useEffect(() => {
    if (posts.length > 0) {
      savePosts(posts);
    }
  }, [posts]);

  const activePost = posts.find((p) => p.id === activePostId) || posts[0];

  // Create brand new post
  const handleNewPost = () => {
    const freshPost = createNewPost(
      '여기에 새롭게 떠오른 인사이트나 경험을 자유롭게 적어보세요.',
      'conversational',
      '새로운 바이럴 콘텐츠 기획'
    );
    const updated = [freshPost, ...posts];
    setPosts(updated);
    setActivePostId(freshPost.id);
    setActiveTab('editor');
  };

  // Update active post fields
  const updateActivePost = (patch: Partial<Post>) => {
    if (!activePost) return;
    const updatedPost = { ...activePost, ...patch, updatedAt: new Date().toISOString() };
    const newPosts = posts.map((p) => (p.id === activePost.id ? updatedPost : p));
    setPosts(newPosts);
  };

  // Trigger full multi-platform synthesis
  const handleSynthesize = () => {
    if (!activePost) return;
    setIsSynthesizing(true);

    setTimeout(() => {
      const hookAnalysis = analyzeViralHook(activePost.rawIdea);
      const drafts = synthesizeAllPlatforms({
        rawIdea: activePost.rawIdea,
        tone: activePost.tone,
        customHook: hookAnalysis.originalHook,
      });

      updateActivePost({
        drafts,
        hookAnalysis,
        status: activePost.status === 'IDEA' ? 'DRAFTING' : activePost.status,
      });
      setIsSynthesizing(false);
    }, 350);
  };

  // Apply suggested viral hook
  const handleApplyHook = (newHook: string) => {
    if (!activePost) return;
    const newAnalysis = analyzeViralHook(newHook);
    const updatedDrafts = synthesizeAllPlatforms({
      rawIdea: activePost.rawIdea,
      tone: activePost.tone,
      customHook: newHook,
    });

    updateActivePost({
      hookAnalysis: newAnalysis,
      drafts: updatedDrafts,
    });
  };

  // Update specific platform text
  const handleUpdateDraftContent = (platform: PlatformType, newContent: string) => {
    if (!activePost) return;
    const currentDraft = activePost.drafts[platform];
    const updatedDraft = {
      ...currentDraft,
      content: newContent,
      characterCount: newContent.length,
    };

    updateActivePost({
      drafts: {
        ...activePost.drafts,
        [platform]: updatedDraft,
      },
    });
  };

  // Update Visual Card Config
  const handleUpdateCardConfig = (newConfig: VisualCardConfig) => {
    updateActivePost({ visualCard: newConfig });
  };

  // Update status in Kanban
  const handleUpdateStatus = (postId: string, newStatus: PostStatus) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, status: newStatus, updatedAt: new Date().toISOString() } : p))
    );
  };

  // Delete post
  const handleDeletePost = (postId: string) => {
    if (confirm('이 포스트를 삭제하시겠습니까?')) {
      const filtered = posts.filter((p) => p.id !== postId);
      setPosts(filtered);
      if (activePostId === postId && filtered.length > 0) {
        setActivePostId(filtered[0].id);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#090b12] text-zinc-100 flex flex-col">
      {/* Top Global Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNewPost={handleNewPost}
        onOpenPricing={() => setIsPricingOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isDbConnected={false}
      />

      {/* Main App Workspace */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab 1: Studio (Editor, Diagnostics, Feed Simulators, Card Studio) */}
        {activeTab === 'editor' && activePost && (
          <div className="space-y-6">
            {/* Top Workspace Bar: Active Post Title & Status Indicator */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-zinc-500">현재 작업물:</span>
                  <input
                    type="text"
                    value={activePost.title}
                    onChange={(e) => updateActivePost({ title: e.target.value })}
                    className="bg-transparent text-sm sm:text-base font-bold text-white border-b border-white/10 hover:border-white/30 focus:border-indigo-500 focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                  <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-indigo-300 font-semibold border border-indigo-500/30">
                    {activePost.pillar}
                  </span>
                  <span>•</span>
                  <span>상태: <strong className="text-zinc-200">{activePost.status}</strong></span>
                  <span>•</span>
                  <span>최종 수정: {new Date(activePost.updatedAt).toLocaleTimeString()}</span>
                </div>
              </div>

              {/* Status Advancement Quick Selector */}
              <div className="flex items-center gap-2">
                {(['IDEA', 'DRAFTING', 'SCHEDULED', 'PUBLISHED'] as PostStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => updateActivePost({ status: st })}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
                      activePost.status === st
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-white/10'
                    }`}
                  >
                    {st === 'IDEA' && '💡 아이디어'}
                    {st === 'DRAFTING' && '✍️ 초안작성'}
                    {st === 'SCHEDULED' && '⏰ 예약됨'}
                    {st === 'PUBLISHED' && '🚀 발행완료'}
                  </button>
                ))}
              </div>
            </div>

            {/* Split Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column (5 Cols): Ingestion & Hook Diagnostics */}
              <div className="lg:col-span-5 space-y-6">
                <IngestionStudio
                  rawIdea={activePost.rawIdea}
                  setRawIdea={(val) => updateActivePost({ rawIdea: val })}
                  tone={activePost.tone}
                  setTone={(val: ToneOption) => updateActivePost({ tone: val })}
                  pillar={activePost.pillar}
                  setPillar={(val: string) => updateActivePost({ pillar: val })}
                  onSynthesize={handleSynthesize}
                  isSynthesizing={isSynthesizing}
                />

                <HookAnalyzer
                  analysis={activePost.hookAnalysis}
                  onApplyHook={handleApplyHook}
                  activeHook={activePost.hookAnalysis?.originalHook || ''}
                />
              </div>

              {/* Right Column (7 Cols): Multi-Platform Simulator & Visual Card Studio */}
              <div className="lg:col-span-7 space-y-6">
                <MultiPlatformViewer
                  drafts={activePost.drafts}
                  onUpdateDraftContent={handleUpdateDraftContent}
                  authorName={activePost.visualCard.authorName}
                  authorHandle={activePost.visualCard.authorHandle}
                  authorAvatar={activePost.visualCard.authorAvatar}
                />

                <VisualCardStudio
                  content={activePost.drafts.THREADS?.content || activePost.rawIdea}
                  config={activePost.visualCard}
                  onUpdateConfig={handleUpdateCardConfig}
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Kanban Pipeline */}
        {activeTab === 'kanban' && (
          <KanbanPipeline
            posts={posts}
            onSelectPost={(post) => {
              setActivePostId(post.id);
              setActiveTab('editor');
            }}
            onUpdateStatus={handleUpdateStatus}
            onDeletePost={handleDeletePost}
            onNewPost={handleNewPost}
          />
        )}

        {/* Tab 3: Analytics & Golden Time Simulator */}
        {activeTab === 'analytics' && (
          <AnalyticsSim
            posts={posts}
            activePost={activePost}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#07080d] py-6 text-center text-xs text-zinc-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            © 2026 <strong>ThreadCraft OS</strong>. Omnichannel Viral Content Engine. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span
              onClick={() => setIsSettingsOpen(true)}
              className="hover:text-zinc-300 cursor-pointer"
            >
              DB / 배포 상태
            </span>
            <span>•</span>
            <span
              onClick={() => setIsPricingOpen(true)}
              className="hover:text-zinc-300 cursor-pointer"
            >
              요금제 안내
            </span>
            <span>•</span>
            <a
              href="https://github.com/ferrariclec16/threadcraft-os"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-300"
            >
              GitHub 저장소
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProPricingModal isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} isDbConnected={false} />
    </div>
  );
}
