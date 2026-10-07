import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "諏訪会員募集 | 立石諏訪会",
  description:
    "前橋市総社町立石で暮らす子育て世帯の皆さまへ。立石諏訪会の活動や、地域とつながることの魅力をご紹介します。",
};

const benefits = [
  {
    title: "子どもに、地域の顔なじみを",
    body: "家と園・学校だけではなく、近所にも知っている大人や子どもがいる。そんなつながりを、地域の行事を通じて少しずつつくれます。",
    icon: "子",
  },
  {
    title: "親にも、近所のつながりを",
    body: "同じ地域で暮らす人と顔を合わせる機会が増えると、地域のことを知るきっかけも増えていきます。",
    icon: "親",
  },
  {
    title: "立石を、もっと身近な場所に",
    body: "お祭りなどの地域行事に参加すると、普段暮らしている立石の人や活動が、ぐっと身近になります。",
    icon: "町",
  },
];

const recommendedFor = [
  "立石で子育てをしている方",
  "引っ越してきて、地域とのつながりをつくりたい方",
  "子どもに地域の行事や人との交流を経験させたい方",
  "近所に親子で顔なじみを増やしたい方",
];

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-slate-900">
      <section className="overflow-hidden border-b border-emerald-900/10 bg-[linear-gradient(145deg,#f0fdf4_0%,#ecfdf5_48%,#fefce8_100%)]">
        <div className="mx-auto max-w-4xl px-5 py-6 sm:px-8">
          <p className="text-sm font-bold text-emerald-800">立石諏訪会</p>
        </div>

        <div className="mx-auto max-w-4xl px-5 pb-14 pt-8 sm:px-8 sm:pb-20 sm:pt-12">
          <p className="text-sm font-bold tracking-[0.16em] text-emerald-800">
            立石で子育てをしている皆さまへ
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[1.2] tracking-tight text-slate-950 sm:text-6xl">
            子どもと一緒に、
            <span className="block text-emerald-800">地域に顔なじみを。</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg sm:leading-9">
            立石諏訪会では、地域の行事を通じて、
            同じ地域で暮らす人どうしが顔を合わせる機会があります。
            子どもにとっても、親にとっても、住んでいる場所に知っている人が増えることは、
            地域を少し身近に感じるきっかけになります。
          </p>

        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-8 sm:py-12">
        <section
          id="about"
          aria-labelledby="about-heading"
          className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-9"
        >
          <p className="text-xs font-bold tracking-[0.16em] text-emerald-700">
            ABOUT SUWAKAI
          </p>
          <h2
            id="about-heading"
            className="mt-2 text-2xl font-black leading-tight sm:text-3xl"
          >
            諏訪会は、立石の地域活動を支えるつながりです
          </h2>
          <p className="mt-5 leading-8 text-slate-700">
            立石諏訪会は、地域の行事や活動を通じて、立石で暮らす人どうしが関わる場のひとつです。
            前橋まつりでは「諏訪連」として神輿に参加するなど、地域の皆さんと一緒に活動しています。
          </p>
          <p className="mt-4 leading-8 text-slate-700">
            地域の会というと少し堅く感じるかもしれませんが、
            まずは「近所に知っている人が増える場所」と考えていただければ十分です。
          </p>
        </section>

        <section aria-labelledby="benefits-heading">
          <div className="px-2">
            <p className="text-xs font-bold tracking-[0.16em] text-amber-700">
              FAMILY &amp; COMMUNITY
            </p>
            <h2
              id="benefits-heading"
              className="mt-2 text-2xl font-black leading-tight sm:text-3xl"
            >
              子育て世帯にとっての、地域とのつながり
            </h2>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-lg font-black text-emerald-900">
                  {benefit.icon}
                </div>
                <h3 className="mt-5 text-xl font-black leading-snug">
                  {benefit.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">{benefit.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="scene-heading"
          className="overflow-hidden rounded-3xl bg-slate-900 text-white"
        >
          <div className="p-6 sm:p-9">
            <p className="text-xs font-bold tracking-[0.16em] text-emerald-300">
              LOCAL EXPERIENCE
            </p>
            <h2
              id="scene-heading"
              className="mt-2 max-w-2xl text-2xl font-black leading-tight sm:text-3xl"
            >
              子どものころの「地元の思い出」を、立石で
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-slate-200">
              お祭りのにぎわい、近所の人とのあいさつ、地域で一緒に何かをする経験。
              大きな特別行事でなくても、そうした積み重ねが子どもにとっての「地元」になっていきます。
            </p>
          </div>
        </section>

        <section
          aria-labelledby="recommended-heading"
          className="rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-9"
        >
          <p className="text-xs font-bold tracking-[0.16em] text-amber-800">
            こんな方へ
          </p>
          <h2
            id="recommended-heading"
            className="mt-2 text-2xl font-black leading-tight sm:text-3xl"
          >
            ひとつでも当てはまったら、諏訪会を知ってみてください
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {recommendedFor.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-2xl bg-white/80 p-4 leading-7 text-slate-800"
              >
                <span
                  aria-hidden="true"
                  className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-200 text-sm font-black text-amber-900"
                >
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="before-join-heading"
          className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-9"
        >
          <p className="text-xs font-bold tracking-[0.16em] text-sky-700">
            入会をご検討の方へ
          </p>
          <h2
            id="before-join-heading"
            className="mt-2 text-2xl font-black leading-tight sm:text-3xl"
          >
            入会希望の方も、まず確認したい方もこちらから
          </h2>
          <p className="mt-5 leading-8 text-slate-700">
            入会をご希望の場合は、住所など必要事項を入力してお申し込みください。
            お住まいの地域などを確認したうえで、諏訪会からご連絡します。
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <a
              href="./apply/"
              className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-slate-900 shadow-sm transition hover:bg-emerald-100"
            >
              <p className="text-lg font-black text-emerald-950">入会を申し込む</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                氏名・連絡先・住所を入力して申込みを送信します。
              </p>
              <p className="mt-4 font-bold text-emerald-800">申込みフォームへ →</p>
            </a>

            <a
              href="../contact/"
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-slate-900 shadow-sm transition hover:bg-slate-100"
            >
              <p className="text-lg font-black text-slate-950">まず質問・相談したい</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                活動内容や入会について、確認したいことを送れます。
              </p>
              <p className="mt-4 font-bold text-slate-700">問い合わせフォームへ →</p>
            </a>
          </div>
        </section>

        <section className="rounded-3xl bg-[linear-gradient(135deg,#065f46_0%,#047857_100%)] p-6 text-white shadow-sm sm:p-9">
          <p className="text-sm font-bold text-emerald-100">
            立石での暮らしに、地域とのつながりを。
          </p>
          <h2 className="mt-2 text-2xl font-black leading-tight sm:text-3xl">
            地域とのつながりは、少しずつで構いません。
          </h2>
          <p className="mt-4 max-w-2xl leading-8 text-emerald-50">
            入会を希望される方は申込みフォームへ、まだ確認したいことがある方は問い合わせフォームへお進みください。
          </p>
        </section>

        <footer className="px-2 py-4 text-center text-sm text-slate-500">
          <p className="font-semibold text-slate-700">立石諏訪会</p>
          <p className="mt-1">諏訪会員募集</p>
          <p className="mt-3 text-xs text-slate-400">
            制作：
            <a
              href="https://wind-shift.jp/local"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-500 underline decoration-slate-300 underline-offset-4"
            >
              WindShift
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
