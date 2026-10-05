import type { Metadata } from "next";
import { Noto_Sans_JP, Roboto_Mono } from "next/font/google";
import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "前橋まつり 神輿担ぎのお知らせ | 立石諏訪会",
  description:
    "2026年10月10日の前橋まつり神輿参加者向けに、集合時刻・当日の作業・服装・注意事項をまとめています。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${notoSansJp.variable} ${robotoMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
