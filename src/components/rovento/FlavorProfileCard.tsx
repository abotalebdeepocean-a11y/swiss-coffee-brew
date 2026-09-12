import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * FLAVOR PROFILE CARD — reusable cupping-style profile.
 * مصدر واحد للحقيقة: نفس المقاييس السبعة وبنفس الترتيب لكل المنتجات
 * حتى تتطابق الصفوف أفقيًا عند المقارنة جنبًا إلى جنب على الديسكتوب.
 *
 * الترتيب الموحد (لا يتغير أبدًا):
 *   1. BODY / الجسم          5. ACIDITY / الحمضية
 *   2. CREMA / الكريما       6. BITTERNESS / المرارة
 *   3. AROMA / الرائحة       7. AFTERTASTE / ما بعد التذوق
 *   4. SWEETNESS / الحلاوة
 *
 * القيم من 10 — الكسور مثل 8.5 مدعومة.
 */

export interface FlavorMetric {
  en: string;
  ar: string;
  value: number;
}

export interface FlavorProfileSpec {
  /** اسم البلند — مثل PREMIUM ESPRESSO BLEND */
  blend: string;
  fill: string;
  track: string;
  metrics: FlavorMetric[];
}

/* ═════ القيم النهائية المعتمدة — لا تُعدل الترتيب، عدّل القيم فقط ═════ */

export const FLAVOR_PROFILES = {
  /** BAR INTENSO — 70% روبوستا 30% أرابيكا (القوي) */
  intenso: {
    blend: "BAR INTENSO ESPRESSO BLEND",
    // كحلي → دهبي — يطابق هوية كيس الببغاء
    fill: "linear-gradient(to left, #16304f, #c9a84c, #f0dfa0)",
    track: "rgba(27,47,72,0.65)",
    metrics: [
      { en: "Body", ar: "الجسم", value: 9 },
      { en: "Crema", ar: "الكريما", value: 9 },
      { en: "Aroma", ar: "الرائحة", value: 8 },
      { en: "Sweetness", ar: "الحلاوة", value: 6 },
      { en: "Acidity", ar: "الحمضية", value: 8 },
      { en: "Bitterness", ar: "المرارة", value: 8 },
      { en: "Aftertaste", ar: "ما بعد التذوق", value: 8 },
    ],
  },
  /** PREMIUM — 50% أرابيكا 50% روبوستا (الفاخر — أفضل) */
  premium: {
    blend: "PREMIUM ESPRESSO BLEND",
    // دهبي → كريمي — يطابق هوية كيس النسر
    fill: "linear-gradient(to left, #a8843c, #f3e5c0)",
    track: "rgba(201,168,76,0.14)",
    metrics: [
      { en: "Body", ar: "الجسم", value: 9 },
      { en: "Crema", ar: "الكريما", value: 9 },
      { en: "Aroma", ar: "الرائحة", value: 8 },
      { en: "Sweetness", ar: "الحلاوة", value: 8 },
      { en: "Acidity", ar: "الحمضية", value: 7 },
      { en: "Bitterness", ar: "المرارة", value: 8 },
      { en: "Aftertaste", ar: "ما بعد التذوق", value: 9 },
    ],
  },
} satisfies Record<string, FlavorProfileSpec>;

export type FlavorProfileKey = keyof typeof FLAVOR_PROFILES;

/** تلميح المقارنة — يظهر أسفل البطاقتين */
export const FLAVOR_COMPARISON_HINT =
  "PREMIUM أعلى في الحلاوة والكريما - BAR INTENSO أعلى في المرارة والقوة";

/* ══════════════════════════════════════════════════════════════════════ */

function formatScore(value: number): string {
  return Number.isInteger(value) ? `${value}` : value.toFixed(1);
}

function FlavorDotRow({
  metric,
  fill,
  track,
  animate,
  delayMs,
}: {
  metric: FlavorMetric;
  fill: string;
  track: string;
  animate: boolean;
  delayMs: number;
}) {
  const filledCount = Math.round(metric.value);
  return (
    <div className="flex items-center gap-2">
      {/* الاسم الإنجليزي — يمين + العربي تحته */}
      <span className="w-[92px] shrink-0 leading-tight">
        <span className="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#f5efe6]/75">
          {metric.en}
        </span>
        <span className="block text-[9px] font-bold text-[#b0a898]/70">
          {metric.ar}
        </span>
      </span>

      {/* 10 نقاط ذهبية تُملأ تدريجيًا عند التمرير */}
      <div
        className="flex flex-1 items-center justify-between gap-[3px]"
        role="img"
        aria-label={`${metric.ar}: ${formatScore(metric.value)} من 10`}
      >
        {Array.from({ length: 10 }, (_, i) => {
          const filled = i < filledCount;
          return (
            <span
              key={i}
              className="size-[7px] shrink-0 rounded-full transition-all duration-500 ease-out"
              style={{
                background: animate && filled ? "#c49b34" : track,
                boxShadow:
                  animate && filled ? "0 0 6px rgba(196,155,52,0.45)" : "none",
                transitionDelay:
                  animate && filled ? `${delayMs + i * 60}ms` : "0ms",
              }}
            />
          );
        })}
        {/* تدرج ذهبي خفيف تحت النقاط الممتلئة */}
        <span
          aria-hidden
          className="pointer-events-none absolute h-px w-0"
          style={{ background: fill }}
        />
      </div>

      {/* الرقم — يسار */}
      <span className="w-[54px] shrink-0 text-left text-[12px] font-black tabular-nums text-[#c9a84c]">
        {formatScore(metric.value)}{" "}
        <span className="text-[9px] font-bold text-[#f5efe6]/35">/ 10</span>
      </span>
    </div>
  );
}

export function FlavorProfileCard({
  profileKey,
  spec,
}: {
  /** أحد البلندات المعروفة — أو spec مخصص لمنتج مستقبلي */
  profileKey?: FlavorProfileKey;
  /** منتج جديد يستخدم بيانات خاصة — بدل profileKey */
  spec?: FlavorProfileSpec;
}) {
  const profile = spec ?? (profileKey ? FLAVOR_PROFILES[profileKey] : undefined);
  if (!profile) return null;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div
      ref={ref}
      className="mx-auto w-full max-w-[380px] rounded-2xl border border-[#c49b34]/20 bg-[#1a1a1a]/70 p-5 backdrop-blur-xl"
    >
      {/* header */}
      <div className="text-center">
        <p className="text-[11px] font-black tracking-[0.35em] text-[#c49b34]">
          FLAVOR PROFILE
        </p>
        <p className="mt-1.5 text-[9px] font-bold tracking-[0.22em] text-[#f5efe6]/45">
          {profile.blend}
        </p>
        <div className="mx-auto mt-3 h-px w-20 bg-gradient-to-r from-transparent via-[#c49b34]/50 to-transparent" />
      </div>

      {/* meters — صفوف متطابقة بين كل المنتجات بنفس العرض والترتيب */}
      <div className="mt-5 space-y-3">
        {profile.metrics.map((m, i) => (
          <FlavorDotRow
            key={m.en}
            metric={m}
            fill={profile.fill}
            track={profile.track}
            animate={isInView}
            delayMs={i * 60}
          />
        ))}
      </div>
    </div>
  );
}
