import Link from "next/link";

const activities = [
  {
    no: "01",
    name: "前橋まつり・神輿かつぎ",
    text: "立石諏訪会（諏訪連）として参加する、地域の仲間と力を合わせる行事です。",
    href: "/events/mikoshi",
    action: "神輿かつぎの案内を見る",
  },
  {
    no: "02",
    name: "地域の行事",
    text: "地域で行われる行事や活動への入口をまとめています。",
    href: "/events",
    action: "行事一覧を見る",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f7f7] text-[#142127]">
      <header className="absolute inset-x-0 top-0 z-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-6 sm:px-10">
          <Link href="/" className="text-base font-black tracking-[0.14em] text-white sm:text-lg">立石諏訪会</Link>
          <nav aria-label="メインナビゲーション" className="flex items-center gap-4 text-xs font-bold text-white sm:gap-7 sm:text-sm">
            <Link href="/events" className="hover:underline">行事案内</Link>
            <Link href="/join" className="rounded-full border border-white/60 px-4 py-2 hover:bg-white hover:text-[#142127]">会員募集 ↗</Link>
          </nav>
        </div>
      </header>

      <section className="relative flex min-h-[620px] items-center overflow-hidden bg-[#101f28] text-white sm:min-h-[740px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_48%,#405863_0%,transparent_55%),linear-gradient(140deg,#101f28_10%,#172d35_58%,#0d161c_100%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-32 h-[520px] w-[520px] rotate-45 border border-white/15 sm:right-[-70px] sm:h-[680px] sm:w-[680px]" />
        <div aria-hidden="true" className="pointer-events-none absolute right-6 top-48 h-[350px] w-[350px] rotate-45 border border-white/10 sm:right-36 sm:h-[450px] sm:w-[450px]" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-44 sm:px-10 sm:pb-28">
          <p className="text-xs font-bold tracking-[0.32em] text-[#9fbac5] sm:text-sm">TATSUISHI SUWAKAI / MAEBASHI</p>
          <h1 className="mt-8 text-[clamp(2.9rem,8vw,6rem)] font-black leading-[1.23] tracking-tight">
            この街で、<br />つながる。<br /><span className="text-[#9ec2d1]">楽しむ。</span>
          </h1>
          <p className="mt-8 max-w-xl text-sm leading-8 text-[#e0e9ec] sm:text-base">
            立石諏訪会は、前橋市総社町立石で、祭りや地域の活動を通じて人がつながる場です。
            近所に知り合いが増える。地域の行事が、少し身近になる。
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/join" className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-[#142127] transition hover:bg-[#d8e8ed]">会員募集について <span className="ml-3">↗</span></Link>
            <Link href="/events" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/50 px-6 text-sm font-bold text-white transition hover:bg-white/10">行事・活動を見る <span className="ml-3">→</span></Link>
          </div>
        </div>
        <p className="absolute bottom-7 left-5 text-[10px] font-bold tracking-[0.3em] text-white/50 sm:left-10">COMMUNITY / FESTIVAL / CONNECTION</p>
      </section>

      <section id="about" className="mx-auto grid max-w-6xl gap-8 px-5 py-20 sm:px-10 sm:py-28 md:grid-cols-[1fr_1.4fr] md:gap-20">
        <div><p className="text-xs font-black tracking-[0.2em] text-[#497282]">ABOUT US</p><h2 className="mt-4 text-3xl font-black leading-snug sm:text-4xl">立石諏訪会<br />について</h2></div>
        <div className="space-y-5 text-base leading-9 text-[#44535b]">
          <p>立石諏訪会は、地域の行事や活動を通じて、立石で暮らす人どうしが関わる場のひとつです。</p>
          <p>同じ地域に住んでいても、普段はなかなか顔を合わせないもの。行事に参加し、一緒に準備し、楽しむことが、顔なじみをつくるきっかけになります。</p>
          <Link href="/join" className="inline-block border-b border-[#497282] pb-1 text-sm font-bold text-[#244f60]">参加を考えている方へ ↗</Link>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-10">
          <p className="text-xs font-black tracking-[0.2em] text-[#497282]">ACTIVITIES</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4"><h2 className="text-3xl font-black sm:text-4xl">活動・行事</h2><Link href="/events" className="text-sm font-bold text-[#244f60] underline underline-offset-4">行事一覧を見る ↗</Link></div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {activities.map((item) => (
              <Link key={item.no} href={item.href} className="group flex min-h-64 flex-col justify-between rounded-2xl border border-[#dfe5e8] bg-[#f6f7f7] p-7 transition hover:-translate-y-1 hover:border-[#6d95a3] hover:shadow-xl sm:p-9">
                <span className="font-mono text-xs font-bold text-[#61818f]">{item.no} / ACTIVITY</span>
                <div><h3 className="text-2xl font-black">{item.name}</h3><p className="mt-4 max-w-md text-sm leading-7 text-[#51616a]">{item.text}</p><p className="mt-6 text-sm font-bold text-[#244f60]">{item.action} <span aria-hidden="true">↗</span></p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#dce7e9] py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-10 md:grid-cols-[1.2fr_1fr]">
          <div><p className="text-xs font-black tracking-[0.2em] text-[#436a7a]">JOIN US</p><h2 className="mt-5 text-3xl font-black leading-snug sm:text-5xl">近所に、<br />一緒に楽しめる仲間を。</h2><p className="mt-6 max-w-xl leading-8 text-[#3a535e]">子どもにも、大人にも。地域の行事をきっかけに、立石に顔なじみを増やしてみませんか。</p></div>
          <div className="rounded-2xl bg-white p-7 shadow-sm sm:p-10"><p className="text-sm font-bold text-[#547381]">立石諏訪会 会員募集</p><p className="mt-4 text-2xl font-black leading-snug">はじめての方も、<br />まずは活動を知るところから。</p><Link href="/join" className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#172d35] px-6 text-sm font-bold text-white hover:bg-[#315363]">会員募集ページを見る ↗</Link></div>
        </div>
      </section>
      <footer className="bg-[#101f28] px-5 py-9 text-white sm:px-10"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4"><p className="text-sm font-bold tracking-[0.12em]">立石諏訪会</p><nav aria-label="フッターナビゲーション" className="flex gap-6 text-xs text-white/75"><Link href="/events">行事案内</Link><Link href="/join">会員募集</Link></nav></div></footer>
    </main>
  );
}
