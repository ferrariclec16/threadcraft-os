'use client';

import React from 'react';
import { X, Check, Sparkles, Zap, ShieldCheck } from 'lucide-react';

interface ProPricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProPricingModal: React.FC<ProPricingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl rounded-3xl border border-white/10 bg-[#0d0f17] p-6 sm:p-8 shadow-2xl text-white space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full p-2 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
            <Sparkles className="h-3.5 w-3.5" />
            <span>외주 대행비 90% 절감 솔루션</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            매일 3시간의 SNS 노가다를 끝내세요
          </h2>
          <p className="text-xs text-zinc-400">
            월 150만 원짜리 마케팅 대행사 대신, 상위 1% 크리에이터 알고리즘 공식이 탑재된 나만의 인텔리전스 OS를 구독하세요.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          {/* 1. Starter (Free) */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-bold text-white">Starter</h3>
                <p className="text-[11px] text-zinc-400">기본적인 텍스트 변환 체험</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white">0원</span>
                <span className="text-xs text-zinc-500">/ 영구 무료</span>
              </div>
              <ul className="space-y-2 text-xs text-zinc-300 pt-2 border-t border-white/10">
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-400" /> 월 5회 옴니채널 변환</li>
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-400" /> 기본 훅 점수 측정</li>
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-400" /> 비주얼 카드 (워터마크 포함)</li>
              </ul>
            </div>
            <button
              onClick={onClose}
              className="w-full rounded-xl bg-white/10 py-2.5 text-xs font-bold text-white hover:bg-white/15 transition-all"
            >
              현재 이용 중
            </button>
          </div>

          {/* 2. Creator Pro (Recommended) */}
          <div className="relative rounded-2xl border-2 border-indigo-500 bg-gradient-to-b from-[#181a2e] to-[#0d0f17] p-6 flex flex-col justify-between space-y-4 shadow-[0_0_40px_rgba(99,102,241,0.25)]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-md">
              가장 인기 (BEST)
            </div>
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  Creator Pro
                  <Zap className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                </h3>
                <p className="text-[11px] text-indigo-300">1인 창업가, 인플루언서, 마케터 필수</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white">39,000원</span>
                <span className="text-xs text-zinc-400">/ 월 ($29)</span>
              </div>
              <ul className="space-y-2 text-xs text-zinc-200 pt-2 border-t border-white/10">
                <li className="flex items-center gap-2 font-semibold text-white"><Check className="h-3.5 w-3.5 text-indigo-400" /> 옴니채널 변환 무제한</li>
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-indigo-400" /> 4대 바이럴 훅 진단 & 1클릭 교체</li>
                <li className="flex items-center gap-2 font-semibold text-white"><Check className="h-3.5 w-3.5 text-indigo-400" /> 비주얼 카드 무제한 PNG 추출 (워터마크 X)</li>
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-indigo-400" /> 칸반 배포 파이프라인 & 캘린더</li>
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-indigo-400" /> 알고리즘 골든타임 분석기</li>
              </ul>
            </div>
            <button
              onClick={() => alert('Stripe / 토스 결제 연동 준비 완료! (.env에 STRIPE_SECRET_KEY만 입력하면 즉시 실결제 활성화)')}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 py-3 text-xs font-black text-white shadow-lg shadow-indigo-500/30 hover:opacity-90 active:scale-95 transition-all"
            >
              7일 무료 체험 시작하기
            </button>
          </div>

          {/* 3. Agency & Team */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-bold text-white">Agency & Team</h3>
                <p className="text-[11px] text-zinc-400">마케팅 대행사 및 다계정 관리</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white">99,000원</span>
                <span className="text-xs text-zinc-500">/ 월 ($79)</span>
              </div>
              <ul className="space-y-2 text-xs text-zinc-300 pt-2 border-t border-white/10">
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-400" /> Pro의 모든 기능 포함</li>
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-400" /> 최대 10개 브랜드/프로필 동시 운영</li>
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-400" /> 클라이언트 보고용 CSV/JSON 추출</li>
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-400" /> 전용 웹훅 & API 엔드포인트 연동</li>
              </ul>
            </div>
            <button
              onClick={() => alert('Stripe / 토스 결제 연동 준비 완료!')}
              className="w-full rounded-xl bg-white/10 py-2.5 text-xs font-bold text-white hover:bg-white/15 transition-all"
            >
              에이전시 플랜 문의
            </button>
          </div>
        </div>

        {/* Security & Guarantee Footer */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-zinc-400 pt-2 border-t border-white/10">
          <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-400" /> 언제든 원클릭 해지 가능</span>
          <span>•</span>
          <span>신용카드 결제 즉시 활성화</span>
          <span>•</span>
          <span>세금계산서 발행 지원</span>
        </div>
      </div>
    </div>
  );
};
