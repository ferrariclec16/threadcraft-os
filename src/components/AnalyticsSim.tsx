'use client';

import React from 'react';
import { Post } from '../lib/types';
import { TrendingUp, Users, Clock, Flame, Calendar, CheckCircle2 } from 'lucide-react';

interface AnalyticsSimProps {
  posts: Post[];
  activePost?: Post;
}

export const AnalyticsSim: React.FC<AnalyticsSimProps> = ({
  posts,
  activePost,
}) => {
  const hookScore = activePost?.hookAnalysis?.totalScore || 75;

  // Algorithmic engagement prediction based on hook score
  const predictedImpressions = Math.round(1200 * (hookScore / 50) ** 1.8);
  const predictedEngagementRate = (3.2 * (hookScore / 60)).toFixed(1);
  const predictedReplies = Math.round(18 * (hookScore / 60) ** 1.5);
  const predictedSaves = Math.round(45 * (hookScore / 60) ** 1.6);

  const goldenTimeSlots = [
    { platform: '@ 스레드 (Threads)', time: '오전 08:30 / 밤 10:30', reason: '출근길 및 취침 전 대화형 댓글 티키타카가 가장 활발한 시간', tag: '최고 인게이지먼트' },
    { platform: '𝕏 트위터 (X)', time: '오전 08:00 / 오후 06:30', reason: '출퇴근 타래(Thread) 저장 및 RT 북마크 집중 구간', tag: '바이럴 리트윗' },
    { platform: 'in 링크드인 (LinkedIn)', time: '화·수·목 오전 09:30', reason: '업무 시작 직후 B2B 의사결정권자들의 피드 정독 시간대', tag: 'B2B 리드' },
    { platform: '📸 인스타그램 카드뉴스', time: '오후 08:30 ~ 10:00', reason: '퇴근 후 여유 시간에 카드뉴스 완독 및 저장(Save) 급증', tag: '저장수 극대화' },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
          알고리즘 골든타임 & 성과 예측 시뮬레이터
        </h2>
        <p className="text-xs text-zinc-400">
          총 {posts.length}개의 기획 자산과 바이럴 훅 점수 가중치를 기반으로 예상 도달 성과를 시뮬레이션합니다.
        </p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-[#121526] to-[#0c0d15] p-5 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>예상 도달수 (Impressions)</span>
            <Users className="h-4 w-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-black text-white">~{predictedImpressions.toLocaleString()}회</p>
          <p className="text-[10px] text-emerald-400 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> 평균 대비 2.4배 높은 노출 기대
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-[#0f1f1a] to-[#0c0d15] p-5 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>예상 인게이지먼트율</span>
            <Flame className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-emerald-300">{predictedEngagementRate}%</p>
          <p className="text-[10px] text-zinc-400">
            댓글 유도형 훅 구조 반영됨
          </p>
        </div>

        <div className="rounded-2xl border border-pink-500/20 bg-gradient-to-br from-[#1f1019] to-[#0c0d15] p-5 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>예상 댓글 (티키타카)</span>
            <TrendingUp className="h-4 w-4 text-pink-400" />
          </div>
          <p className="text-2xl font-black text-pink-300">~{predictedReplies}개</p>
          <p className="text-[10px] text-zinc-400">
            초기 30분 내 실시간 답글 필수
          </p>
        </div>

        <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-[#1f190f] to-[#0c0d15] p-5 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>예상 저장 및 북마크</span>
            <CheckCircle2 className="h-4 w-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-amber-300">~{predictedSaves}회</p>
          <p className="text-[10px] text-zinc-400">
            비주얼 카드 동시 발행 시 3배 증가
          </p>
        </div>
      </div>

      {/* Golden Time Recommendation Slots */}
      <div className="rounded-2xl border border-white/10 bg-[#121520]/80 p-5 backdrop-blur-md space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Clock className="h-4 w-4 text-indigo-400" />
          플랫폼별 알고리즘 추천 배포 골든타임
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {goldenTimeSlots.map((slot, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex flex-col justify-between space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{slot.platform}</span>
                <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-300 border border-indigo-500/30">
                  {slot.tag}
                </span>
              </div>
              <p className="text-sm font-black text-indigo-300 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                {slot.time}
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {slot.reason}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
