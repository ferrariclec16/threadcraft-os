import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'ThreadCraft OS - 옴니채널 바이럴 콘텐츠 엔진 & 리퍼포징 SaaS',
  description: '스레드(Threads), X(트위터), 링크드인, 인스타그램 카드뉴스를 1초 만에 기획·진단·변환·배포하는 차세대 소셜 성장 운영체제',
  keywords: ['스레드', 'Threads', '바이럴 훅', '카드뉴스 자동생성', '인스타그램 마케팅', 'SaaS', '크리에이터'],
  authors: [{ name: 'ThreadCraft Team' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#090b12] text-zinc-100 min-h-screen selection:bg-indigo-500 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
