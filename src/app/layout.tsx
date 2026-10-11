import type { Metadata } from "next";
import { Noto_Sans_JP, Roboto_Mono, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  display: "swap",
});
const zenKakuGothic = Zen_Kaku_Gothic_New({
  variable: "--font-zen-kaku-gothic",
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
});
const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "立石諏訪会 | 前橋市総社町立石の地域活動",
  description: "前橋市総社町立石の立石諏訪会。地域の行事や活動、会員募集についてご案内します。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`${notoSansJp.variable} ${robotoMono.variable} ${zenKakuGothic.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
