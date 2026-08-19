import { useMemo, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import {
  FlaskConical,
  ShoppingCart,
  Sparkles,
  Truck,
  Zap,
  Coffee,
  Check,
} from "lucide-react";
import { IMAGES } from "@/lib/images";
import { useCart, whatsappLink } from "@/lib/store";
import { formatPrice } from "@/lib/products";
import { useImageCandidates } from "./BagVisual";
import { WhatsAppIcon } from "./art";
import { cn } from "@/lib/utils";

/* ============================================================
   خلطتك الخاصة — ROVENTO BLEND LAB
   ============================================================ */

const ARABICA_GOLD = "#c9a227";
const ROBUSTA_BROWN = "#4a2c1a";

const ROASTS = [
  { id: "light", label: "فاتح", desc: "حموضة مشرقة", emoji: "☀️" },
  { id: "medium", label: "متوسط", desc: "التوازن المثالي", emoji: "⚖️" },
  { id: "dark", label: "غامق", desc: "كاكاو وجسم قوي", emoji: "🌑" },
] as const;

type RoastId = (typeof ROASTS)[number]["id"];

const GRINDS = [
  { id: "whole", label: "حبوب كاملة", emoji: "🫘" },
  { id: "espresso", label: "إسبريسو", emoji: "☕" },
  { id: "filter", label: "V60 / فلتر", emoji: "Filter" },
  { id: "turkish", label: "تركي", emoji: "🫖" },
] as const;

const WEIGHTS = [
  { id: "250g", label: "250 جم", mult: 0.3 },
  { id: "500g", label: "500 جم", mult: 0.55 },
  { id: "1kg", label: "1 كجم", mult: 1 },
] as const;

/** وصفات جاهزة سريعة */
const PRESETS = [
  { a: 70, label: "بريميم 70/30", desc: "same as Premium", star: true },
  { a: 50, label: "كلاسيك 50/50", desc: "same as Classic", star: false },
  { a: 30, label: "إنتنسو 30/70", desc: "same as Intenso", star: false },
  { a: 100, label: "أرابيكا 100%", desc: "specialty pure", star: false },
] as const;

const round5 = (n: number) => Math.round(n / 5) * 5;
const round10 = (n: number) => Math.round(n / 10) * 10;
const kgPrice = (a: number) => round5(700 + a * 6);
const clamp10 = (n: number) => Math.min(10, Math.max(1, Math.round(n)));

function blendNotes(a: number, roastId: RoastId): string {
  if (a >= 90)
    return roastId === "light"
      ? "فواكه وزهور وحموضة مشرقة — متعة محبي القهوة المختصة."
      : "أصل فاخر: حلاوة الأرابيكا ونكهات راقية في كل كوب.";
  if (a >= 60)
    return roastId === "dark"
      ? "توازن فاخر: حلاوة الأرابيكا مع كريما غنية وجسم مخملي."
      : "كوب متوازن حلو المذاق غني بالكريما — الخيار المميز الآمن.";
  if (a >= 40)
    return "جسم أقوى وكافيين أعلى مع كريما كثيفة — قهوة يومية بطابع إسبريسو.";
  return "قوة وكافيين وكريما كثيفة جدًا — لعشاق الإسبريسو الجريء.";
}

/** حبة بن SVG */
function BeanSvg({
  color,
  className,
  style,
}: {
  color: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg viewBox="0 0 48 48" className={className} style={style} aria-hidden="true">
      <ellipse cx="24" cy="24" rx="15" ry="20" fill={color} />
      <ellipse cx="24" cy="24" rx="15" ry="20" fill="none" stroke="rgba(0,0,0,0.28)" strokeWidth="1.5" />
      <path d="M24 4 C 18 13, 18 35, 24 44" stroke="rgba(0,0,0,0.4)" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M20 12 C 23 16, 25 20, 27 24" stroke="rgba(0,0,0,0.18)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** بطاقة حبة */
function BeanTile({
  base,
  label,
  pct,
  hint,
  tone,
}: {
  base: string;
  label: string;
  pct: number;
  hint: string;
  tone: "gold" | "dark";
}) {
  const { src, onError } = useImageCandidates(base);
  const gold = tone === "gold";
  return (
    <div
      className={cn(
        "relative flex flex-col items-center gap-2 rounded-xl border p-3 text-center transition-all",
        gold
          ? "border-rv-gold/40 bg-rv-gold/[0.08]"
          : "border-stone-600/40 bg-stone-800/40",
      )}
    >
      <div
        className={cn(
          "grid size-14 place-items-center overflow-hidden rounded-full",
          gold ? "bg-rv-gold/10" : "bg-black/30",
        )}
      >
        {src ? (
          <img src={src} onError={onError} alt={label} className="size-full object-cover" />
        ) : (
          <BeanSvg
            color={gold ? ARABICA_GOLD : ROBUSTA_BROWN}
            className="size-10 drop-shadow-[0_4px_8px_rgba(0,0,0,0.45)]"
          />
        )}
      </div>
      <div>
        <p className={cn("font-mono text-xl font-black leading-none", gold ? "text-rv-gold" : "text-stone-200")}>
          {pct}%
        </p>
        <p className="mt-1 text-xs font-bold">{label}</p>
        <p className="mt-0.5 text-[10px] leading-snug text-muted-foreground">{hint}</p>
      </div>
    </div>
  );
}

function FlavorBar({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-bold">{label}</span>
        <span className="font-mono text-muted-foreground">{value}/10</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${value * 10}%`, background: accent }}
        />
      </div>
    </div>
  );
}

/* ============ البانر المخصص للخدمة ============ */

function StudioBanner() {
  const { src, onError } = useImageCandidates(IMAGES.banners.customBlend);

  return (
    <div className="relative overflow-hidden border-b border-white/10 bg-coffee-950">
      {src ? (
        <>
          <img src={src} alt="" onError={onError} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 grid-editorial opacity-50" />
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 75% 65% at 50% -10%, rgba(212,175,55,0.28), transparent 62%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-coffee-950 to-transparent" />
        </>
      )}

      <div className="relative mx-auto w-full max-w-[1200px] px-4 py-12 text-center md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-rv-gold/40 bg-black/40 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.4em] text-rv-gold backdrop-blur-sm">
            <FlaskConical className="size-3.5" />
            ROVENTO · Blend Lab
          </p>

          <h2 className="mx-auto mt-5 max-w-3xl text-2xl font-black leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
            خلطتك الخاصة…
            <span className="gold-gradient-text block">بنسب إنت تحددها</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-stone-300 md:text-base">
            حدد نسبة الأرابيكا والروبوستا، اختار التحميص والطحن والوزن — واحنا
            نحمّص طازجًا وندمج ونغلّف خلطتك يدويًا ونتوصّلها لكل محافظات مصر خلال 24-72 ساعة.
          </p>

          <button
            type="button"
            onClick={() => document.getElementById("blend-studio")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-gold mt-6 inline-flex h-12 items-center gap-2 rounded-full px-8 text-sm font-black shadow-lg"
          >
            <Zap className="size-4" />
            ابدأ الخلط دلوقتي
          </button>
        </motion.div>
      </div>
    </div>
  );
}

/* ============ خطوات الخدمة ============ */

const STEPS = [
  { icon: Coffee, title: "حدد نسبك", desc: "اسحب المؤشر واختار التحميص والطحن" },
  { icon: Zap, title: "نحمّصها طازج", desc: "على دفعات صغيرة في نفس يوم الطلب" },
  { icon: FlaskConical, title: "ندمجها بدقة", desc: "خلط يدوي بالنسب المطلوبة بالضبط" },
  { icon: Truck, title: "نوصلها ليك", desc: "تغليف + شحن لكل مصر 24-72 ساعة" },
];

function StudioSteps() {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {STEPS.map((s, i) => (
        <div
          key={s.title}
          className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-3 transition-colors hover:border-rv-gold/40 md:p-4"
        >
          <div className="flex items-center justify-between">
            <s.icon className="size-4 text-rv-gold" />
            <span className="font-mono text-[10px] tracking-widest text-stone-500">0{i + 1}</span>
          </div>
          <p className="mt-2 text-sm font-black md:text-base">{s.title}</p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{s.desc}</p>
        </div>
      ))}
    </div>
  );
}

/* ============ الاستوديو التفاعلي ============ */

export function CustomBlendStudio() {
  const { add } = useCart();
  const [arabica, setArabica] = useState(70);
  const [roastId, setRoastId] = useState<RoastId>("medium");
  const [grindId, setGrindId] = useState<(typeof GRINDS)[number]["id"]>("espresso");
  const [weightId, setWeightId] = useState<(typeof WEIGHTS)[number]["id"]>("1kg");

  const robusta = 100 - arabica;
  const roast = ROASTS.find((r) => r.id === roastId)!;
  const weight = WEIGHTS.find((w) => w.id === weightId)!;
  const grind = GRINDS.find((g) => g.id === grindId)!;

  const price = useMemo(() => round10(kgPrice(arabica) * weight.mult), [arabica, weight.mult]);
  const oldPrice = useMemo(() => round10(price / 0.85), [price]);
  const closestPreset = PRESETS.find((p) => p.a === arabica);

  const profile = useMemo(() => {
    const acid = roastId === "light" ? 2 : roastId === "medium" ? 0.5 : -1;
    const sweet = roastId === "light" ? 1 : roastId === "medium" ? 1.5 : 0;
    const body = roastId === "light" ? -1 : roastId === "medium" ? 0.5 : 1.5;
    const crema = roastId === "light" ? -1 : roastId === "medium" ? 0 : 1;
    return [
      { label: "الحموضة", value: clamp10(arabica / 10 + acid), accent: "#f59e0b" },
      { label: "الحلاوة", value: clamp10(arabica / 12 + sweet), accent: "#d4af37" },
      { label: "الجسم", value: clamp10(robusta / 10 + body), accent: "#a16207" },
      { label: "الكريما", value: clamp10(robusta / 6 + crema), accent: "#b45309" },
      { label: "الكافيين", value: clamp10(robusta / 7), accent: "#78350f" },
    ];
  }, [arabica, robusta, roastId]);

  const intensity = useMemo(
    () => Math.min(5, Math.max(1, Math.round(1 + robusta / 30 + (roastId === "dark" ? 1.5 : roastId === "medium" ? 0.75 : 0)))),
    [robusta, roastId],
  );

  const recipeKey = `cb-${arabica}-${roastId}-${grindId}-${weightId}`;
  const spec = {
    label: `خلطة مخصصة ${arabica}/${robusta} — ${weight.label}`,
    detail: `${arabica}٪ أرابيكا · ${robusta}٪ روبوستا · تحميص ${roast.label} · ${grind.label}`,
    price,
    arabica,
  };

  function handleAdd() {
    add("custom-blend", 1, recipeKey, spec);
  }

  const waLink = whatsappLink(
    `مرحبًا ROVENTO ☕ عايز أطلب خلطتي المخصصة:\n${spec.label}\n${spec.detail}\nالسعر: ${formatPrice(price)}`,
  );

  return (
    <section id="blend-lab" aria-label="خلطتك الخاصة — استوديو خلط القهوة" className="border-b border-white/10 bg-coffee-950">
      <StudioBanner />

      <div className="mx-auto w-full max-w-[1200px] px-4 py-12 md:px-6 md:py-16">
        <StudioSteps />

        {/* ===== الاستوديو ===== */}
        <div id="blend-studio" className="mt-10 grid scroll-mt-28 gap-6 lg:grid-cols-[1fr_400px]">
          {/* عمود التحكم */}
          <div className="rounded-3xl border border-white/10 bg-coffee-900/70 p-4 backdrop-blur-sm md:p-6">
            {/* 01 — النسب */}
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-rv-gold">01 · النسب</p>
              <h3 className="mt-1 text-lg font-black md:text-xl">
                أرابيكا × روبوستا — <span className="text-rv-gold">{arabica}/{robusta}</span>
              </h3>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <BeanTile base={IMAGES.beans.arabica} label="أرابيكا" pct={arabica} hint="حلاوة، حموضة، نكهات راقية" tone="gold" />
                <BeanTile base={IMAGES.beans.robusta} label="روبوستا" pct={robusta} hint="كريما كثيفة، قوة، كافيين" tone="dark" />
              </div>

              {/* السلايدر */}
              <div className="mt-5" dir="ltr">
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={arabica}
                  onChange={(e) => setArabica(Number(e.target.value))}
                  aria-label="نسبة الأرابيكا في الخلطة"
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r from-[#4a2c1a] via-stone-600 to-[#c9a227] [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-rv-gold [&::-moz-range-thumb]:shadow-[0_0_12px_rgba(212,175,55,0.7)] [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-rv-gold [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(212,175,55,0.7)]"
                />
                <div className="mt-2 flex items-center justify-between text-[11px] font-bold">
                  <span className="text-stone-400">روبوستا</span>
                  <span className="font-mono text-[10px] tracking-widest text-stone-500">0% ← أرابيكا → 100%</span>
                  <span className="text-rv-gold">أرابيكا</span>
                </div>
              </div>

              {/* وصفات جاهزة — بسيطة */}
              <div className="mt-4 flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.a}
                    type="button"
                    onClick={() => setArabica(p.a)}
                    className={cn(
                      "group flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-bold transition-all",
                      arabica === p.a
                        ? "border-rv-gold bg-rv-gold/15 text-rv-gold shadow-[0_0_18px_rgba(212,175,55,0.2)]"
                        : "border-white/10 bg-white/[0.03] text-stone-300 hover:border-rv-gold/50",
                    )}
                  >
                    {p.star && <Sparkles className="size-3 text-rv-gold" />}
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 02 — التحميص */}
            <div className="mt-6 border-t border-white/5 pt-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-rv-gold">02 · التحميص</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {ROASTS.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRoastId(r.id)}
                    className={cn(
                      "rounded-xl border p-3 text-center transition-all",
                      roastId === r.id
                        ? "border-rv-gold bg-rv-gold/15 text-rv-gold"
                        : "border-white/10 bg-white/[0.03] text-stone-300 hover:border-white/25",
                    )}
                  >
                    <span className="block text-lg">{r.emoji}</span>
                    <span className="mt-1 block text-sm font-black">{r.label}</span>
                    <span className="mt-0.5 block text-[10px] text-muted-foreground">{r.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 03 — الطحن */}
            <div className="mt-6 border-t border-white/5 pt-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-rv-gold">03 · الطحن</p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {GRINDS.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGrindId(g.id)}
                    className={cn(
                      "rounded-xl border p-3 text-center transition-all",
                      grindId === g.id
                        ? "border-rv-gold bg-rv-gold/15 text-rv-gold"
                        : "border-white/10 bg-white/[0.03] text-stone-300 hover:border-white/25",
                    )}
                  >
                    <span className="block text-xs font-black">{g.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 04 — الوزن */}
            <div className="mt-6 border-t border-white/5 pt-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-rv-gold">04 · الوزن</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {WEIGHTS.map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => setWeightId(w.id)}
                    className={cn(
                      "rounded-xl border p-3 text-center transition-all",
                      weightId === w.id
                        ? "border-rv-gold bg-rv-gold/15 text-rv-gold"
                        : "border-white/10 bg-white/[0.03] text-stone-300 hover:border-white/25",
                    )}
                  >
                    <span className="block text-sm font-black">{w.label}</span>
                    <span className="mt-1 block font-mono text-[11px] font-bold text-muted-foreground">
                      {formatPrice(round10(kgPrice(arabica) * w.mult))}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* عمود المعاينة */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-3xl border border-rv-gold/25 bg-gradient-to-b from-coffee-800/80 to-coffee-950 shadow-[0_0_50px_rgba(212,175,55,0.08)]">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5 sm:py-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-rv-gold">خليطتك الحية</p>
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-400">
                  <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                  جاهزة للطلب
                </span>
              </div>

              <div className="p-4 sm:p-5 md:p-6">
                {/* قرص النسب */}
                <div className="mx-auto grid size-40 place-items-center rounded-full transition-all duration-500 sm:size-44 md:size-52"
                  style={{
                    background: `conic-gradient(${ARABICA_GOLD} 0deg ${arabica * 3.6}deg, ${ROBUSTA_BROWN} ${arabica * 3.6}deg 360deg)`,
                    boxShadow: "0 0 45px rgba(212,175,55,0.18)",
                  }}
                >
                  <div className="grid size-32 place-items-center rounded-full border border-white/15 bg-coffee-950/90 text-center md:size-40">
                    <div>
                      <p className="font-mono text-2xl font-black text-rv-gold sm:text-3xl">{arabica}/{robusta}</p>
                      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.3em] text-stone-400">أرابيكا/روبوستا</p>
                    </div>
                  </div>
                </div>

                {/* ملف النكهة */}
                <div className="mt-5 space-y-2.5">
                  {profile.map((f) => (
                    <FlavorBar key={f.label} {...f} />
                  ))}
                </div>

                {/* شدة الاستخلاص */}
                <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                  <span className="text-xs font-bold">شدة القهوة</span>
                  <div className="flex gap-1.5" aria-label={`شدة ${intensity} من 5`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={cn("size-2 rounded-full transition-colors", i < intensity ? "bg-rv-gold" : "bg-white/15")} />
                    ))}
                  </div>
                </div>

                {/* توقعات النكهة */}
                <p className="mt-4 rounded-xl border border-rv-gold/15 bg-rv-gold/[0.06] p-3 text-xs leading-relaxed text-stone-200">
                  <span className="font-black text-rv-gold">توقعات الكوب: </span>
                  {blendNotes(arabica, roastId)}
                </p>

                {closestPreset && (
                  <p className="mt-2 flex items-center gap-1.5 text-[11px] text-stone-400">
                    <Sparkles className="size-3 text-rv-gold" />
                    نسبك مطابقة لـ<span className="font-bold text-rv-gold">{closestPreset.label}</span>
                  </p>
                )}

                {/* السعر + الإضافة للسلة */}
                <div className="mt-5 border-t border-white/10 pt-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[11px] text-muted-foreground">سعر {weight.label}</p>
                      <p className="mt-0.5 text-2xl font-black text-rv-gold sm:text-3xl">{formatPrice(price)}</p>
                      <p className="mt-1 text-[11px]">
                        <span className="text-stone-500 line-through">{formatPrice(oldPrice)}</span>
                        <span className="ms-2 rounded bg-red-600/20 px-1.5 py-0.5 font-bold text-red-400">خصم أول طلب 15%</span>
                      </p>
                    </div>
                    <p className="pb-1 font-mono text-[10px] text-stone-500">{formatPrice(kgPrice(arabica))} / كجم</p>
                  </div>

                  <button type="button" onClick={handleAdd} className="btn-gold mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-black">
                    <ShoppingCart className="size-4.5" />
                    ضيف خلطتك للسلة
                  </button>

                  <a href={waLink} target="_blank" rel="noopener noreferrer" className="mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/40 text-sm font-bold text-emerald-400 transition-colors hover:bg-emerald-500/10">
                    <WhatsAppIcon className="size-4" />
                    اطلبها عبر واتساب
                  </a>

                  <p className="mt-2 text-center text-[10px] leading-relaxed text-stone-500">
                    تحميص طازج يوم الطلب · تغليف بصمام أحادي · شحن لكل مصر
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
