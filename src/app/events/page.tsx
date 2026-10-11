import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "行事・活動 | 立石諏訪会",
  description: "立石諏訪会の行事・活動をご案内します。前橋まつりの神輿かつぎなど。",
};

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-[#f6f7f7] text-[#142127]">
      <header className="bg-[#101f28] text-white"><nav aria-label="ナビゲーション" className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-6 sm:px-8"><Link href="/" className="font-black tracking-widest">立石諏訪会</Link><Link href="/join" className="text-sm font-bold">会員募集 ↗</Link></nav></header>
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="text-xs font-black tracking-[0.2em] text-[#497282]">EVENTS & ACTIVITIES</p>
        <h1 className="mt-4 text-4xl font-black sm:text-5xl">行事・活動</h1>
        <p className="mt-5 max-w-2xl leading-8 text-[#51616a]">立石諏訪会の地域行事や活動をご紹介します。行事の詳細は各ページからご覧いただけます。</p>
        <div className="mt-12">
          <Link href="/events/mikoshi" className="group block rounded-2xl border border-[#dce4e7] bg-white p-7 transition hover:border-[#6d95a3] hover:shadow-lg sm:p-10">
            <p className="text-xs font-bold tracking-widest text-[#61818f]">2026.10.10 / 前橋まつり</p>
            <h2 className="mt-4 text-2xl font-black">神輿かつぎ</h2>
            <p className="mt-3 leading-8 text-[#51616a]">2026年の参加者向け案内を記録として掲載しています。記載の集合時刻・連絡事項は開催当時の情報です。</p>
            <p className="mt-5 text-sm font-bold text-[#244f60]">2026年の案内を見る ↗</p>
          </Link>
        </div>
        <div className="mt-12 rounded-2xl bg-[#dce7e9] p-7 sm:p-9"><h2 className="text-xl font-black">一緒に活動しませんか？</h2><p className="mt-3 leading-7 text-[#44535b]">地域の行事を通じて、立石に顔なじみを増やしてみませんか。</p><Link href="/join" className="mt-5 inline-block font-bold text-[#244f60] underline underline-offset-4">会員募集ページへ ↗</Link></div>
      </div>
    </main>
  );
}
