"use client";

import { useEffect, useState } from "react";

const schedule = [
  { time: "12:00", label: "本部役員・班長以上", detail: "諏訪神社集合" },
  { time: "13:30", label: "神社集合組", detail: "諏訪神社集合" },
  {
    time: "15:50",
    label: "現地集合組",
    detailPrefix: "現地（",
    linkLabel: "前橋中央駐車場",
    detailSuffix: "）集合",
    href: "https://maps.app.goo.gl/VWade1oVejywEgs16",
  },
];

const tasks = [
  "神輿や食料品など、当日使用する物品の準備",
  "準備した物品をトラックへ積み込み",
  "出発式終了後、送迎バスで現地へ移動",
];

const notes = [
  "参加者の中から、本部がリアカー係をお願いする場合があります。",
  "事故や保険の面から、法被を着用していない「参加者でない方」による運搬や飲食物の配布は禁止します。",
  "参加者からは参加費をお支払いいただいておりますので、参加者以外の飲食については節度をもった対応をお願いします。",
];

type ClothingImage = {
  src: string;
  alt: string;
  label: string;
};

type WeatherForecast = {
  weatherCode: number;
  temperatureMax: number;
  temperatureMin: number;
  precipitationProbability: number;
};

const weatherCodeLabel = (code: number) => {
  if (code === 0) return { icon: "☀️", label: "晴れ" };
  if (code <= 2) return { icon: "🌤️", label: "晴れ時々くもり" };
  if (code === 3) return { icon: "☁️", label: "くもり" };
  if (code === 45 || code === 48) return { icon: "🌫️", label: "霧" };
  if (code >= 51 && code <= 67) return { icon: "🌧️", label: "雨" };
  if (code >= 71 && code <= 77) return { icon: "🌨️", label: "雪" };
  if (code >= 80 && code <= 82) return { icon: "🌦️", label: "にわか雨" };
  if (code >= 85 && code <= 86) return { icon: "🌨️", label: "にわか雪" };
  if (code >= 95) return { icon: "⛈️", label: "雷雨" };
  return { icon: "🌥️", label: "天気" };
};

export default function Home() {
  const [clothingImage, setClothingImage] = useState<ClothingImage | null>(null);
  const [weather, setWeather] = useState<WeatherForecast | null>(null);
  const [weatherError, setWeatherError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadWeather = async () => {
      try {
        const params = new URLSearchParams({
          latitude: "36.39",
          longitude: "139.06",
          daily:
            "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
          timezone: "Asia/Tokyo",
          start_date: "2026-10-10",
          end_date: "2026-10-10",
        });

        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Weather request failed");
        }

        const data = (await response.json()) as {
          daily?: {
            weather_code?: number[];
            temperature_2m_max?: number[];
            temperature_2m_min?: number[];
            precipitation_probability_max?: number[];
          };
        };

        const daily = data.daily;
        if (
          !daily?.weather_code?.length ||
          !daily.temperature_2m_max?.length ||
          !daily.temperature_2m_min?.length ||
          !daily.precipitation_probability_max?.length
        ) {
          throw new Error("Weather data unavailable");
        }

        setWeather({
          weatherCode: daily.weather_code[0],
          temperatureMax: daily.temperature_2m_max[0],
          temperatureMin: daily.temperature_2m_min[0],
          precipitationProbability: daily.precipitation_probability_max[0],
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setWeatherError(true);
      }
    };

    void loadWeather();

    return () => controller.abort();
  }, []);

  return (
    <main className="min-h-screen bg-stone-50 text-slate-900">
      <section className="border-b border-red-900/10 bg-[linear-gradient(135deg,#7f1d1d_0%,#991b1b_52%,#5f1212_100%)] text-white">
        <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-12">
          <div className="sm:flex sm:items-start sm:justify-between sm:gap-8">
            <div className="min-w-0">
              <p className="text-sm font-semibold tracking-[0.18em] text-red-100">
                立石諏訪会
              </p>
              <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
                前橋まつり
                <span className="mt-1 block">神輿担ぎのお知らせ</span>
              </h1>
              <p className="mt-4 text-base font-medium text-red-50 sm:text-lg">
                2026年10月10日（土）
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-red-100 sm:text-base">
                集合時刻・当日の作業・服装・注意事項をまとめています。
                当日はこのページをご確認ください。
              </p>
            </div>

            <div className="mt-6 shrink-0 sm:mt-0 sm:w-48">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 shadow-lg backdrop-blur-sm">
                <p className="text-xs font-bold tracking-[0.12em] text-red-100">
                  10/10 前橋市の天気
                </p>
                {weather ? (
                  <>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="text-4xl" aria-hidden="true">
                        {weatherCodeLabel(weather.weatherCode).icon}
                      </span>
                      <div>
                        <p className="font-bold text-white">
                          {weatherCodeLabel(weather.weatherCode).label}
                        </p>
                        <p className="mt-1 text-sm text-red-50">
                          最高 {Math.round(weather.temperatureMax)}℃ / 最低{" "}
                          {Math.round(weather.temperatureMin)}℃
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm font-medium text-red-50">
                      降水確率 {weather.precipitationProbability}%
                    </p>
                  </>
                ) : weatherError ? (
                  <p className="mt-3 text-sm text-red-100">
                    天気予報を取得できませんでした
                  </p>
                ) : (
                  <p className="mt-3 text-sm text-red-100">天気予報を取得中…</p>
                )}
                <a
                  href="https://open-meteo.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-[11px] text-red-100 underline decoration-white/40 underline-offset-2"
                >
                  Weather data: Open-Meteo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-8 sm:py-10">
        <section
          aria-labelledby="meeting-heading"
          className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5"
        >
          <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
            <p className="text-xs font-bold tracking-[0.16em] text-red-700">
              まず確認
            </p>
            <h2 id="meeting-heading" className="mt-1 text-2xl font-bold">
              集合時刻・集合場所
            </h2>
          </div>

          <div className="divide-y divide-slate-100">
            {schedule.map((item) => (
              <div
                key={item.time}
                className="grid grid-cols-[82px_1fr] gap-4 px-5 py-5 sm:grid-cols-[110px_1fr] sm:px-6"
              >
                <p className="font-time text-2xl font-black tabular-nums text-red-700 sm:text-3xl">
                  {item.time}
                </p>
                <div>
                  <p className="font-bold text-slate-900">{item.label}</p>
                  {item.href ? (
                    <p className="mt-1 text-sm font-medium text-slate-600 sm:text-base">
                      {item.detailPrefix}
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-sky-700 underline decoration-sky-300 underline-offset-4"
                      >
                        {item.linkLabel}
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="h-4 w-4 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14 3h7v7" />
                          <path d="M10 14 21 3" />
                          <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
                        </svg>
                      </a>
                      {item.detailSuffix}
                    </p>
                  ) : (
                    <p className="mt-1 text-sm font-medium text-slate-600 sm:text-base">
                      {item.detail}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="tasks-heading"
          className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6"
        >
          <p className="text-xs font-bold tracking-[0.16em] text-amber-700">
            諏訪神社集合後
          </p>
          <h2 id="tasks-heading" className="mt-1 text-2xl font-bold">
            当日の作業
          </h2>
          <ol className="mt-5 space-y-4">
            {tasks.map((task, index) => (
              <li key={task} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-900">
                  {index + 1}
                </span>
                <p className="pt-0.5 leading-7 text-slate-700">{task}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          aria-labelledby="clothing-heading"
          className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6"
        >
          <p className="text-xs font-bold tracking-[0.16em] text-sky-700">
            服装
          </p>
          <h2 id="clothing-heading" className="mt-1 text-2xl font-bold">
            当日の服装について
          </h2>
          <ul className="mt-5 space-y-3">
            <li className="flex gap-3 leading-7 text-slate-700">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-600" />
              <span>
                頭部には、
                <button
                  type="button"
                  onClick={() =>
                    setClothingImage({
                      src: "./images/tenugui.png",
                      alt: "指定の手ぬぐい",
                      label: "指定の手ぬぐい",
                    })
                  }
                  className="font-bold text-sky-700 underline decoration-sky-300 underline-offset-4"
                >
                  指定の手ぬぐい
                </button>
                を「ねじり鉢巻き」にして着用してください。
              </span>
            </li>
            <li className="flex gap-3 leading-7 text-slate-700">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-600" />
              <span>
                鯉口シャツ・ダボシャツを着用する場合は、
                <button
                  type="button"
                  onClick={() =>
                    setClothingImage({
                      src: "./images/haragake.jpg",
                      alt: "紺色の腹掛け",
                      label: "腹掛け",
                    })
                  }
                  className="font-bold text-sky-700 underline decoration-sky-300 underline-offset-4"
                >
                  腹掛け
                </button>
                の下に着用してください。
              </span>
            </li>
            <li className="flex gap-3 leading-7 text-slate-700">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-600" />
              <div>
                <p>足袋は、紺または黒の地下足袋で統一してください。</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  ※神社集合組は、靴を公民館の下駄箱に置いておくと、公民館に帰着してから履き替えられます。靴を持参するのがおすすめです。
                </p>
              </div>
            </li>
            <li className="flex gap-3 leading-7 text-slate-700">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-600" />
              <span>
                神輿を担ぐ際の肩当て用に、厚手のフェイスタオル持参をおすすめします。
              </span>
            </li>
            <li className="flex gap-3 leading-7 text-slate-700">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-600" />
              <span>
                服装が指定から大きく外れている場合、当日に確認や参加見合わせをお願いすることがあります。
              </span>
            </li>
          </ul>
        </section>

        <section
          aria-labelledby="notes-heading"
          className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6"
        >
          <p className="text-xs font-bold tracking-[0.16em] text-amber-800">
            ご協力ください
          </p>
          <h2 id="notes-heading" className="mt-1 text-2xl font-bold">
            注意事項
          </h2>
          <ul className="mt-5 space-y-3">
            {notes.map((note) => (
              <li key={note} className="flex gap-3 leading-7 text-slate-800">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-600" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="participants-heading"
          className="rounded-2xl bg-slate-900 p-5 text-white sm:p-6"
        >
          <p className="text-xs font-bold tracking-[0.16em] text-slate-300">
            今年の参加予定
          </p>
          <h2 id="participants-heading" className="mt-1 text-2xl font-bold">
            総勢93名で参加します
          </h2>
          <p className="mt-4 leading-7 text-slate-200">
            諏訪会員29名に加え、立石地域から自治会・公民館・氏子・獅子舞保存会などの皆さんが参加予定です。
          </p>
        </section>

        <footer className="px-2 py-4 text-center text-sm text-slate-500">
          <p className="font-semibold text-slate-700">立石諏訪会</p>
          <p className="mt-1">前橋まつり 神輿参加者向け案内</p>
        </footer>
      </div>

      {clothingImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${clothingImage.label}の画像`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label="画像を閉じる"
            onClick={() => setClothingImage(null)}
            className="absolute inset-0 bg-black/70"
          />
          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white p-3 shadow-2xl">
            <img
              src={clothingImage.src}
              alt={clothingImage.alt}
              className="h-auto w-full rounded-xl"
            />
          </div>
        </div>
      )}
    </main>
  );
}
