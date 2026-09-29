'use client';

import React from 'react';
import { Post, PostStatus, PlatformType } from '../lib/types';
import { Plus, CheckCircle2, FileEdit, ArrowRight, Trash2 } from 'lucide-react';

interface KanbanPipelineProps {
  posts: Post[];
  onSelectPost: (post: Post) => void;
  onUpdateStatus: (postId: string, newStatus: PostStatus) => void;
  onDeletePost: (postId: string) => void;
  onNewPost: () => void;
}

export const KanbanPipeline: React.FC<KanbanPipelineProps> = ({
  posts,
  onSelectPost,
  onUpdateStatus,
  onDeletePost,
  onNewPost,
}) => {
  const columns: { id: PostStatus; title: string; subtitle: string; color: string; badgeBg: string }[] = [
    { id: 'IDEA', title: '💡 아이디어 발굴', subtitle: '날것의 생각 및 메모', color: 'border-amber-500/30', badgeBg: 'bg-amber-500/20 text-amber-300' },
    { id: 'DRAFTING', title: '✍️ 초안 작성', subtitle: '4개 플랫폼 변환 중', color: 'border-indigo-500/30', badgeBg: 'bg-indigo-500/20 text-indigo-300' },
    { id: 'SCHEDULED', title: '⏰ 배포 예약', subtitle: '골든타임 대기열', color: 'border-purple-500/30', badgeBg: 'bg-purple-500/20 text-purple-300' },
    { id: 'PUBLISHED', title: '🚀 발행 완료', subtitle: '성과 데이터 추적', color: 'border-emerald-500/30', badgeBg: 'bg-emerald-500/20 text-emerald-300' },
  ];

  const getPlatformIcon = (platform: PlatformType) => {
    switch (platform) {
      case 'THREADS': return '@';
      case 'TWITTER': return '𝕏';
      case 'LINKEDIN': return 'in';
      case 'INSTAGRAM': return '📸';
    }
  };

  return (
    <div className="space-y-6">
      {/* Kanban Header & Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            콘텐츠 배포 파이프라인 (Notion/Linear 스타일)
          </h2>
          <p className="text-xs text-zinc-400">
            생각 메모부터 4대 SNS 골든타임 스케줄링까지 원스톱으로 관리합니다.
          </p>
        </div>

        <button
          onClick={onNewPost}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 hover:opacity-90 transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>새 아이디어 등록</span>
        </button>
      </div>

      {/* 4 Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {columns.map((col) => {
          const colPosts = posts.filter((p) => p.status === col.id);

          return (
            <div
              key={col.id}
              className={`flex flex-col rounded-2xl border ${col.color} bg-[#121520]/80 p-4 backdrop-blur-md min-h-[500px] space-y-3`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                    {col.title}
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${col.badgeBg}`}>
                      {colPosts.length}
                    </span>
                  </h3>
                  <p className="text-[10px] text-zinc-400 mt-0.5">{col.subtitle}</p>
                </div>
              </div>

              {/* Card List in Column */}
              <div className="flex-1 space-y-2.5 overflow-y-auto">
                {colPosts.length === 0 ? (
                  <div className="flex h-36 items-center justify-center rounded-xl border border-dashed border-white/10 p-4 text-center">
                    <p className="text-[11px] text-zinc-500">포스트가 없습니다.</p>
                  </div>
                ) : (
                  colPosts.map((post) => (
                    <div
                      key={post.id}
                      className="group relative rounded-xl border border-white/10 bg-white/[0.03] p-3.5 hover:border-indigo-500/50 hover:bg-white/[0.06] transition-all space-y-2.5 shadow-sm"
                    >
                      {/* Top Badges: Hook Score & Pillar */}
                      <div className="flex items-center justify-between">
                        <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-zinc-300">
                          {post.pillar}
                        </span>

                        {post.hookAnalysis && (
                          <span
                            className={`rounded-md px-1.5 py-0.5 text-[10px] font-black ${
                              post.hookAnalysis.grade === 'S'
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                : post.hookAnalysis.grade === 'A'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-blue-500/20 text-blue-300'
                            }`}
                          >
                            훅 {post.hookAnalysis.totalScore}점
                          </span>
                        )}
                      </div>

                      {/* Title & Preview */}
                      <div
                        onClick={() => onSelectPost(post)}
                        className="cursor-pointer space-y-1"
                      >
                        <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                          {post.rawIdea}
                        </p>
                      </div>

                      {/* Platforms Ready Badges */}
                      <div className="flex items-center gap-1">
                        {(['THREADS', 'TWITTER', 'LINKEDIN', 'INSTAGRAM'] as PlatformType[]).map((plt) => (
                          <span
                            key={plt}
                            className="flex h-5 w-5 items-center justify-center rounded bg-black/40 text-[10px] font-bold text-zinc-300 border border-white/10"
                            title={plt}
                          >
                            {getPlatformIcon(plt)}
                          </span>
                        ))}
                      </div>

                      {/* Card Bottom Actions: Edit & Move Status */}
                      <div className="flex items-center justify-between border-t border-white/10 pt-2.5 text-[11px]">
                        <button
                          onClick={() => onSelectPost(post)}
                          className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
                        >
                          <FileEdit className="h-3 w-3" />
                          <span>스튜디오 열기</span>
                        </button>

                        <div className="flex items-center gap-1.5">
                          {col.id === 'IDEA' && (
                            <button
                              onClick={() => onUpdateStatus(post.id, 'DRAFTING')}
                              className="flex items-center gap-1 rounded bg-indigo-500/20 px-2 py-1 text-[10px] font-bold text-indigo-300 hover:bg-indigo-500/30 transition-all"
                            >
                              <span>초안</span>
                              <ArrowRight className="h-2.5 w-2.5" />
                            </button>
                          )}
                          {col.id === 'DRAFTING' && (
                            <button
                              onClick={() => onUpdateStatus(post.id, 'SCHEDULED')}
                              className="flex items-center gap-1 rounded bg-purple-500/20 px-2 py-1 text-[10px] font-bold text-purple-300 hover:bg-purple-500/30 transition-all"
                            >
                              <span>예약</span>
                              <ArrowRight className="h-2.5 w-2.5" />
                            </button>
                          )}
                          {col.id === 'SCHEDULED' && (
                            <button
                              onClick={() => onUpdateStatus(post.id, 'PUBLISHED')}
                              className="flex items-center gap-1 rounded bg-emerald-500/20 px-2 py-1 text-[10px] font-bold text-emerald-300 hover:bg-emerald-500/30 transition-all"
                            >
                              <span>발행완료</span>
                              <CheckCircle2 className="h-2.5 w-2.5" />
                            </button>
                          )}
                          <button
                            onClick={() => onDeletePost(post.id)}
                            className="text-zinc-500 hover:text-rose-400 p-1 transition-colors"
                            title="삭제"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
