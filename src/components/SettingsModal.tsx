'use client';

import React from 'react';
import { X, Database, Server, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDbConnected?: boolean;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  isDbConnected = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0d0f17] p-6 sm:p-8 shadow-2xl text-white space-y-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full p-2 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            시스템 설정 & 데이터베이스 연동 안내
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            DB와 배포만 연결하면 바로 실서비스 출시가 가능한 프로덕션 아키텍처 상태입니다.
          </p>
        </div>

        {/* 1. Database Connection Status */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <Database className="h-4 w-4 text-indigo-400" />
              PostgreSQL / Supabase 연동 상태
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="h-3 w-3" />
              {isDbConnected ? '클라우드 DB 활성화' : 'Prisma 스키마 준비 완료'}
            </span>
          </div>

          <div className="rounded-xl bg-black/50 p-3 font-mono text-[11px] text-zinc-300 border border-white/5 space-y-1">
            <p className="text-zinc-500">&#47;&#47; .env.local 파일에 Supabase 또는 Neon URL을 넣으시면 즉시 영구 저장됩니다.</p>
            <p className="text-indigo-300">DATABASE_URL=&quot;postgresql://postgres:[PW]@db.[REF].supabase.co:5432/postgres&quot;</p>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            💡 <strong className="text-zinc-200">현재 상태:</strong> DB 연결 문자열이 없어도 브라우저 내장 스토리지 및 클라이언트 캐시 엔진으로 100% 완벽히 작동합니다. 실배포 시 위의 한 줄만 환경 변수로 지정하면 Supabase와 자동 동기화됩니다.
          </p>
        </div>

        {/* 2. 1-Minute Deployment Guide */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <Server className="h-4 w-4 text-purple-400" />
              Vercel 1분 원클릭 배포 방법
            </span>
          </div>

          <ol className="space-y-2 text-xs text-zinc-300 list-decimal list-inside leading-relaxed">
            <li>
              현재 저장소 (<a href="https://github.com/ferrariclec16/threadcraft-os" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline inline-flex items-center gap-0.5">ferrariclec16/threadcraft-os <ArrowUpRight className="h-3 w-3" /></a>)를 Vercel에서 Import 합니다.
            </li>
            <li>
              Vercel 대시보드의 Environment Variables에 <code className="bg-white/10 px-1.5 py-0.5 rounded text-indigo-300">DATABASE_URL</code>과 <code className="bg-white/10 px-1.5 py-0.5 rounded text-indigo-300">OPENAI_API_KEY</code>(선택사항)를 입력합니다.
            </li>
            <li>
              <strong>Deploy</strong> 버튼을 누르면 즉시 고유 도메인(https://threadcraft-os.vercel.app)으로 전 세계에 런칭됩니다.
            </li>
          </ol>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition-all shadow-md"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
