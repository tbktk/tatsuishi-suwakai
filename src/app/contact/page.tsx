"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

const apiBaseUrl =
  process.env.NEXT_PUBLIC_WINDSHIFT_API_BASE_URL ?? "https://wind-shift.jp";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const startedAt = useRef(Date.now());
  const submissionToken = useRef<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = new FormData(event.currentTarget);
    submissionToken.current ??= crypto.randomUUID();

    const payload = {
      submissionToken: submissionToken.current,
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      message: String(form.get("message") ?? ""),
      website: String(form.get("website") ?? ""),
      startedAt: startedAt.current,
    };

    try {
      const response = await fetch(`${apiBaseUrl}/api/suwakai/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "送信に失敗しました。");
      }

      setStatus("success");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "送信に失敗しました。時間をおいて再度お試しください。",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <main className="min-h-screen bg-stone-50 px-4 py-12 text-slate-900 sm:py-20">
        <section className="mx-auto max-w-2xl rounded-3xl bg-white p-7 text-center shadow-sm ring-1 ring-black/5 sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky-100 text-2xl font-black text-sky-800">
            ✓
          </div>
          <h1 className="mt-5 text-3xl font-black">お問い合わせを受け付けました</h1>
          <p className="mt-4 leading-8 text-slate-600">
            内容を確認のうえ、ご連絡します。
          </p>
          <Link
            href="/join/"
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-emerald-800 px-6 py-3 font-bold text-white"
          >
            会員募集ページへ戻る
          </Link>
        </section>
      </main>
    );
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-sky-700 focus:ring-2 focus:ring-sky-700/15";

  return (
    <main className="min-h-screen bg-stone-50 text-slate-900">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-8 sm:py-12">
        <Link
          href="/join/"
          className="text-sm font-bold text-emerald-800 underline decoration-emerald-300 underline-offset-4"
        >
          ← 会員募集ページへ戻る
        </Link>

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-9">
          <p className="text-xs font-bold tracking-[0.16em] text-sky-700">
            CONTACT
          </p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">お問い合わせ</h1>
          <p className="mt-4 leading-8 text-slate-600">
            活動内容や入会について、確認したいことがある方はこちらからお問い合わせください。
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="name" className="font-bold">
                氏名 <span className="text-red-700">必須</span>
              </label>
              <input id="name" name="name" required autoComplete="name" className={inputClass} />
            </div>

            <div>
              <label htmlFor="email" className="font-bold">
                メールアドレス <span className="text-red-700">必須</span>
              </label>
              <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
            </div>

            <div>
              <label htmlFor="phone" className="font-bold">
                電話番号 <span className="text-sm font-normal text-slate-500">任意</span>
              </label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" className={inputClass} />
            </div>

            <div>
              <label htmlFor="message" className="font-bold">
                お問い合わせ内容 <span className="text-red-700">必須</span>
              </label>
              <textarea id="message" name="message" required rows={7} className={inputClass} />
            </div>

            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            {status === "error" && (
              <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-800">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="flex min-h-14 w-full items-center justify-center rounded-full bg-sky-800 px-6 py-3 text-lg font-black text-white transition hover:bg-sky-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "送信中…" : "問い合わせを送信する"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
