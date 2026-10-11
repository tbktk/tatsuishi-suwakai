"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useRef, useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

function normalizeHalfWidthSpaces(value: string) {
  return value.replace(/　/g, " ").trim();
}

function removeAllSpaces(value: string) {
  return value.replace(/[ 　]/g, "");
}

function createSubmissionToken() {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }

  const bytes = new Uint8Array(16);

  if (typeof globalThis.crypto?.getRandomValues === "function") {
    globalThis.crypto.getRandomValues(bytes);
  } else {
    for (let index = 0; index < bytes.length; index += 1) {
      bytes[index] = Math.floor(Math.random() * 256);
    }
  }

  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes, (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");

  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20),
  ].join("-");
}

const apiBaseUrl =
  process.env.NEXT_PUBLIC_WINDSHIFT_API_BASE_URL ?? "https://wind-shift.jp";

export default function MembershipApplicationPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const startedAt = useRef(Date.now());
  const submissionToken = useRef<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = new FormData(event.currentTarget);
    submissionToken.current ??= createSubmissionToken();

    const payload = {
      submissionToken: submissionToken.current,
      name: normalizeHalfWidthSpaces(String(form.get("name") ?? "")),
      nameKana: normalizeHalfWidthSpaces(String(form.get("nameKana") ?? "")),
      email: removeAllSpaces(String(form.get("email") ?? "")),
      phone: removeAllSpaces(String(form.get("phone") ?? "")),
      prefecture: removeAllSpaces(String(form.get("prefecture") ?? "")),
      city: removeAllSpaces(String(form.get("city") ?? "")),
      town: removeAllSpaces(String(form.get("town") ?? "")),
      addressLine: normalizeHalfWidthSpaces(
        String(form.get("addressLine") ?? ""),
      ),
      website: String(form.get("website") ?? "").trim(),
      startedAt: startedAt.current,
    };

    try {
      const response = await fetch(
        `${apiBaseUrl}/api/suwakai/membership-applications`,
        {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=UTF-8" },
          body: JSON.stringify(payload),
        },
      );

      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "送信に失敗しました。");
      }

      setStatus("success");
    } catch (error) {
      const message =
        error instanceof TypeError
          ? "送信できませんでした。時間をおいて再度お試しください。"
          : error instanceof Error
            ? error.message
            : "送信できませんでした。時間をおいて再度お試しください。";

      setErrorMessage(message);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <main className="min-h-screen bg-stone-50 px-4 py-12 text-slate-900 sm:py-20">
        <section className="mx-auto max-w-2xl rounded-3xl bg-white p-7 text-center shadow-sm ring-1 ring-black/5 sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl font-black text-emerald-800">
            ✓
          </div>
          <h1 className="mt-5 text-3xl font-black">
            入会申込みを受け付けました
          </h1>
          <p className="mt-4 leading-8 text-slate-600">
            入力内容を確認のうえ、諏訪会からご連絡します。
            送信した時点で入会が確定するものではありません。
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
    "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15";

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
          <p className="text-xs font-bold tracking-[0.16em] text-emerald-700">
            MEMBERSHIP APPLICATION
          </p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">入会申込み</h1>
          <p className="mt-4 leading-8 text-slate-600">
            入会をご希望の方は、以下をご入力ください。
            お住まいの地域などを確認したうえで、諏訪会からご連絡します。
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-500">
            ※ このフォームの送信だけで入会が確定するものではありません。
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="name" className="font-bold">
                氏名 <span className="text-red-700">必須</span>
              </label>
              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                placeholder="諏訪 太郎"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="nameKana" className="font-bold">
                氏名ふりがな <span className="text-red-700">必須</span>
              </label>
              <input
                id="nameKana"
                name="nameKana"
                required
                autoComplete="off"
                inputMode="text"
                pattern="[ぁ-ゖ ]+"
                title="ひらがなまたは半角スペースのみで入力してください。"
                placeholder="すわ たろう"
                onInput={(event) => {
                  event.currentTarget.value = event.currentTarget.value.replace(
                    /　/g,
                    " ",
                  );
                }}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="email" className="font-bold">
                メールアドレス <span className="text-red-700">必須</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="suwa.taro@example.com"
                title="正しいメールアドレス形式で入力してください。"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="phone" className="font-bold">
                電話番号 <span className="text-red-700">必須</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                inputMode="numeric"
                pattern="[0-9]{10,11}"
                maxLength={11}
                placeholder="09012345678"
                title="電話番号はハイフンなしの10〜11桁の数字で入力してください。"
                className={inputClass}
              />
            </div>

            <fieldset className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <legend className="px-2 font-black">
                住所 <span className="text-red-700">必須</span>
              </legend>
              <div className="mt-2 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="prefecture" className="text-sm font-bold">
                    都道府県
                  </label>
                  <input
                    id="prefecture"
                    name="prefecture"
                    required
                    defaultValue="群馬県"
                    placeholder="群馬県"
                    autoComplete="address-level1"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="city" className="text-sm font-bold">
                    市区町村
                  </label>
                  <input
                    id="city"
                    name="city"
                    required
                    defaultValue="前橋市"
                    placeholder="前橋市"
                    autoComplete="address-level2"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="town" className="text-sm font-bold">
                    町名
                  </label>
                  <input
                    id="town"
                    name="town"
                    required
                    defaultValue="総社町植野"
                    placeholder="総社町植野"
                    autoComplete="address-level3"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="addressLine" className="text-sm font-bold">
                    番地・建物名
                  </label>
                  <input
                    id="addressLine"
                    name="addressLine"
                    required
                    autoComplete="street-address"
                    placeholder="1-1-1 立石ハイツ101号"
                    className={inputClass}
                  />
                </div>
              </div>
            </fieldset>

            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {status === "error" && (
              <p
                role="alert"
                className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-800"
              >
                {errorMessage}
              </p>
            )}

            <div className="rounded-xl bg-amber-50 px-4 py-3 text-sm leading-7 text-slate-700">
              入力された情報は、入会申込みの確認とご連絡のために使用します。
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="flex min-h-14 w-full items-center justify-center rounded-full bg-emerald-800 px-6 py-3 text-lg font-black text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "送信中…" : "入会申込みを送信する"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
