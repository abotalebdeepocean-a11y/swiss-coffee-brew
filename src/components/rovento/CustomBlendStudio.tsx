import { useMemo, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import {
  FlaskConical,
  ShoppingCart,
  Sparkles,
  Truck,
  Zap,
  Coffee,
} from "lucide-react";
import { IMAGES } from "@/lib/images";
import { useCart, whatsappLink } from "@/lib/store";
import { formatPrice } from "@/lib/products";
import { useImageCandidates } from "./BagVisual";
import { WhatsAppIcon } from "./art";
import { cn } from "@/lib/utils";

/* ============================================================
   مختبر روفينتو — صمّم خلطتك الخاصة
   ============================================================ */

const ARABICA_GOLD = "#c9a227";
const ROBUSTA_BROWN = "#4a2c1a";

type RoastId = "light" | "medium" | "dark";

const ROASTS: { id: RoastId; label: string; emoji: string; image: string; desc: string }[] = [
  { id: "light", label: "فاتح", emoji: "☀️", image: IMAGES.roastLevels.light, desc: "حموضة مشرقة" },
  { id: "medium", label: "متوسط", emoji: "🔥", image: IMAGES.roastLevels.medium, desc: "التوازن المثالي" },
  { id: "dark", label: "غامق", emoji: "🌑", image: IMAGES.roastLevels.dark, desc: "كاكاو وجسم قوي" },
];

const GRINDS = [
  { id: "turkish", label: "تركي", desc: "ناعم جدًا" },
  { id: "filter", label: "فلتر / V60", desc: "متوسط الخشونة" },
  { id: "espresso", label: "إسبريسو", desc: "ناعم للماكينات" },
  { id: "whole", label: "حبوب كاملة", desc: "للمطحنة المنزلية" },
] as const;

const WEIGHTS = [
  { id: "250g", label: "250 جم", mult: 0.3 },
  { id: "500g", label: "500 جم", mult: 0.55 },
  { id: "1kg", label: "1 كجم", mult: 1 },
] as const;

const PRESETS = [
  { a: 100, label: "أرابيكا 100%", sub: "فاتح/متوسط", star: true },
  { a: 70, label: "بريميوم 70/30", sub: "متوسط-داكن", star: false },
  { a: 50, label: "كلاسيك 50/50", sub: "متوسط", star: false },
  { a: 30, label: "إنتينسو 30/70", sub: "داكن", star: false },
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
  if (a >= 40) return "جسم أقوى وكافيين أعلى مع كريما كثيفة — قهوة يومية بطابع إسبريسو.";
  return "قوة وكافيين وكريما كثيفة جدًا — لعشاق الإسبريسو الجريء.";
}

/* --- حبة بن SVG --- */
function BeanSvg({ color, className, style }: { color: string; className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 48 48" className={className} style={style} aria-hidden="true">
      <ellipse cx="24" cy="24" rx="15" ry="20" fill={color} />
      <ellipse cx="24" cy="24" rx="15" ry="20" fill="none" stroke="rgba(0,0,0,0.28)" strokeWidth="1.5" />
      <path d="M24 4 C 18 13, 18 35, 24 44" stroke="rgba(0,0,0,0.4)" strokeWidth="2.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* --- صورة حبة في دائرة --- */
function RoastBeanImage({ src, label, isActive }: { src: string; label: string; isActive: boolean }) {
  const { src: imgSrc, onError } = useImageCandidates(src);
  const sz = isActive ? 64 : 48;
  return imgSrc ? (
    <img src={imgSrc} onError={onError} alt={label} className="rounded-full object-cover" style={{ width: sz, height: sz }} />
  ) : (
    <div className="grid place-items-center rounded-full bg-amber-900/30" style={{ width: sz, height: sz }}>
      <Coffee className="text-rv-gold/40" style={{ width: sz * 0.4, height: sz * 0.4 }} />
    </div>
  );
}

/* --- بار النكهة --- */
function FlavorBar({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-bold">{label}</span>
        <span className="font-mono text-stone-500">{value}/10</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full"
          initial={false}
          animate={{ width: `${value * 10}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ background: accent }}
        />
      </div>
    </div>
  );
}

/* ============================================================
   المكون الرئيسي
   ============================================================ */

export function CustomBlendStudio() {
  const { add } = useCart();
  const [arabica, setArabica] = useState(70);
  const [roastId, setRoastId] = useState<RoastId>("medium");
  const [grindId, setGrindId] = useState<string>("espresso");
  const [weightId, setWeightId] = useState<string>("1kg");

  const robusta = 100 - arabica;
  const roast = ROASTS.find((r) => r.id === roastId)!;
  const weight = WEIGHTS.find((w) => w.id === weightId)!;
  const grind = GRINDS.find((g) => g.id === grindId)!;

  const price = useMemo(() => round10(kgPrice(arabica) * weight.mult), [arabica, weight.mult]);
  const closestPreset = PRESETS.find((p) => p.a === arabica);

  const profile = useMemo(() => {
    const ri = { light: -1, medium: 0, dark: 1 }[roastId] ?? 0;
    const acid = ri < 0 ? 2 : ri < 1 ? 0.5 : -0.5;
    const sweet = ri < 0 ? 1 : ri < 1 ? 1.5 : 0.5;
    const body = ri < 0 ? -1 : ri < 1 ? 0.5 : 1.5;
    const crema = ri < 0 ? -1 : ri < 1 ? 0 : 1;
    return [
      { label: "الحموضة", value: clamp10(arabica / 10 + acid), accent: "#f59e0b" },
      { label: "الحلاوة", value: clamp10(arabica / 12 + sweet), accent: "#d4af37" },
      { label: "الجسم", value: clamp10(robusta / 10 + body), accent: "#a16207" },
      { label: "الكريما", value: clamp10(robusta / 6 + crema), accent: "#b45309" },
      { label: "الكافيين", value: clamp10(robusta / 7), accent: "#78350f" },
    ];
  }, [arabica, robusta, roastId]);

  const intensity = useMemo(
    () => Math.min(5, Math.max(1, Math.round(1 + robusta / 30 + ({ light: 0, medium: 0.5, dark: 1.5 }[roastId] ?? 0)))),
    [robusta, roastId],
  );

  const suggestedRoast = useMemo<RoastId>(() => {
    if (arabica >= 80) return "medium";
    if (arabica >= 45) return "dark";
    return "dark";
  }, [arabica]);

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
    <section id="blend-lab" aria-label="مختبر روفينتو — صمّم خلطتك الخاصة" className="border-b border-white/10 bg-coffee-950">
      {/* === البانر === */}
      <div className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-[#0d0b09] via-coffee-950 to-[#0d0b09]">
        {/* توهج ذهبي خفيف */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rv-gold/6 blur-[120px]" />

        <div className="relative mx-auto w-full max-w-[1200px] px-4 py-12 text-center md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-rv-gold/30 bg-black/40 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.4em] text-rv-gold backdrop-blur-sm">
              <FlaskConical className="size-3.5" />
              ROVENTO · Blend Lab
            </p>

            <h2 className="mx-auto mt-5 max-w-3xl text-2xl font-black leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
              🧪 مختبر روفينتو —{" "}
              <span className="gold-gradient-text">صمّم خلطتك الخاصة</span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-stone-300 md:text-base">
              حدد نسب الأرابيكا والروبوستا، اختار التحميص والطحن — واحنا نحمّصها طازج ونوصلها لك
            </p>

            <button
              type="button"
              onClick={() => document.getElementById("blend-studio")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-rv-gold to-[#b89728] px-8 text-sm font-black text-black shadow-lg shadow-rv-gold/20 transition hover:-translate-y-0.5 hover:shadow-rv-gold/40"
            >
              <Zap className="size-4" />
              ابدأ الخلط دلوقتي
            </button>
          </motion.div>
        </div>
      </div>

      {/* === خطوات الخدمة === */}
      <div className="mx-auto w-full max-w-[1200px] px-4 py-8 md:px-6">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { icon: Coffee, title: "حدد نسبك", desc: "اسحب المؤشر واختار التحميص والطحن" },
            { icon: Zap, title: "نحمّصها طازج", desc: "على دفعات صغيرة في نفس يوم الطلب" },
            { icon: FlaskConical, title: "ندمجها بدقة", desc: "خلط يدوي بالنسب المطلوبة بالضبط" },
            { icon: Truck, title: "نوصلها ليك", desc: "تغليف + شحن لكل مصر 24-72 ساعة" },
          ].map((s, i) => (
            <div key={s.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 transition-colors hover:border-rv-gold/30 md:p-4">
              <div className="flex items-center justify-between">
                <s.icon className="size-4 text-rv-gold" />
                <span className="font-mono text-[10px] tracking-widest text-stone-600">0{i + 1}</span>
              </div>
              <p className="mt-2 text-sm font-black">{s.title}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-stone-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* === الاستوديو التفاعلي === */}
      <div id="blend-studio" className="mx-auto w-full max-w-[1200px] scroll-mt-28 px-4 pb-12 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* === عمود التحكم === */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] md:p-6">

            {/* --- 01: النسب --- */}
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-rv-gold">01 · النسب</p>
              <h3 className="mt-1 text-lg font-black md:text-xl">
                أرابيكا × روبوستا — <span className="text-rv-gold">{arabica}/{robusta}</span>
              </h3>

              {/* بطاقتا الحبوب */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                {/* أرابيكا */}
                <div className="relative flex flex-col items-center gap-2 rounded-xl border border-rv-gold/40 bg-rv-gold/[0.06] p-3 text-center">
                  <div className="grid size-16 place-items-center overflow-hidden rounded-full bg-rv-gold/10">
                    <BeanSvg color={ARABICA_GOLD} className="size-11 drop-shadow-[0_4px_8px_rgba(0,0,0,0.45)]" />
                  </div>
                  <div>
                    <p className="font-mono text-2xl font-black leading-none text-rv-gold">{arabica}%</p>
                    <p className="mt-1 text-xs font-bold text-stone-200">أرابيكا</p>
                    <p className="mt-0.5 text-[10px] text-stone-500">حلاوة، حموضة، نكهات راقية</p>
                  </div>
                </div>
                {/* روبوستا */}
                <div className="relative flex flex-col items-center gap-2 rounded-xl border border-stone-600/40 bg-stone-800/30 p-3 text-center">
                  <div className="grid size-16 place-items-center overflow-hidden rounded-full bg-black/30">
                    <BeanSvg color={ROBUSTA_BROWN} className="size-11 drop-shadow-[0_4px_8px_rgba(0,0,0,0.45)]" />
                  </div>
                  <div>
                    <p className="font-mono text-2xl font-black leading-none text-stone-200">{robusta}%</p>
                    <p className="mt-1 text-xs font-bold text-stone-300">روبوستا</p>
                    <p className="mt-0.5 text-[10px] text-stone-500">كريما كثيفة، قوة، كافيين</p>
                  </div>
                </div>
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
                  <span className="font-mono text-[10px] tracking-widest text-stone-600">0% ← أرابيكا → 100%</span>
                  <span className="text-rv-gold">أرابيكا</span>
                </div>
              </div>

              {/* وصفات جاهزة */}
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
                    <span className="text-[10px] text-stone-500">({p.sub})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* --- 02: التحميص --- */}
            <div className="mt-6 border-t border-white/5 pt-5">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-rv-gold">02 · التحميص</p>
                {suggestedRoast !== roastId && (
                  <button
                    type="button"
                    onClick={() => setRoastId(suggestedRoast)}
                    className="flex items-center gap-1 rounded-full border border-rv-gold/30 bg-rv-gold/10 px-2.5 py-1 text-[10px] font-bold text-rv-gold transition hover:bg-rv-gold/20"
                  >
                    <Sparkles className="size-2.5" />
                    نوصي بـ {ROASTS.find((r) => r.id === suggestedRoast)?.label}
                  </button>
                )}
              </div>

              {/* 3 أزرار التحميص مع صور */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                {ROASTS.map((r) => {
                  const isActive = roastId === r.id;
                  const isSuggested = suggestedRoast === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRoastId(r.id)}
                      className={cn(
                        "group relative flex flex-col items-center gap-2 rounded-xl border p-3 text-center transition-all",
                        isActive
                          ? "border-rv-gold bg-rv-gold/10 shadow-[0_0_20px_rgba(201,162,39,0.15)]"
                          : "border-white/10 bg-white/[0.02] hover:border-white/25",
                      )}
                    >
                      {/* الدائرة */}
                      <div
                        className={cn(
                          "relative flex items-center justify-center rounded-full transition-all duration-300",
                          isActive ? "scale-110" : "scale-100",
                        )}
                        style={{
                          width: isActive ? 72 : 56,
                          height: isActive ? 72 : 56,
                          border: isActive ? `3px solid ${ARABICA_GOLD}` : "2px solid rgba(255,255,255,0.12)",
                          background: `radial-gradient(circle, ${r.id === "light" ? "#c4956a" : r.id === "medium" ? "#8B5E3C" : "#3D1F0D"}22, transparent)`,
                        }}
                      >
                        <RoastBeanImage src={r.image} label={r.label} isActive={isActive} />
                        {isActive && (
                          <motion.div
                            layoutId="roast-ring"
                            className="absolute -inset-1 rounded-full border-2 border-rv-gold/40"
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          />
                        )}
                      </div>

                      <div>
                        <span className="text-lg">{r.emoji}</span>
                        <p className={cn("text-sm font-black", isActive ? "text-rv-gold" : "text-stone-300")}>
                          {r.label}
                        </p>
                        <p className="text-[10px] text-stone-500">{r.desc}</p>
                      </div>

                      {isSuggested && !isActive && (
                        <span className="absolute top-2 left-2 flex items-center gap-0.5 rounded-full bg-rv-gold/20 px-1.5 py-0.5 text-[8px] font-bold text-rv-gold">
                          <Sparkles className="size-2" />
                          مقترح
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* --- 03: الطحن --- */}
            <div className="mt-6 border-t border-white/5 pt-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-rv-gold">03 · الطحن</p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {GRINDS.map((g) => {
                  const isActive = grindId === g.id;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setGrindId(g.id)}
                      className={cn(
                        "rounded-xl border p-3 text-center transition-all",
                        isActive
                          ? "border-rv-gold bg-rv-gold/15 text-rv-gold"
                          : "border-white/10 bg-white/[0.03] text-stone-300 hover:border-white/25",
                      )}
                    >
                      <span className="block text-sm font-black">{g.label}</span>
                      <span className="mt-0.5 block text-[10px] text-stone-500">{g.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* --- 04: الوزن --- */}
            <div className="mt-6 border-t border-white/5 pt-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-rv-gold">04 · الوزن</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {WEIGHTS.map((w) => {
                  const isActive = weightId === w.id;
                  const wPrice = round10(kgPrice(arabica) * w.mult);
                  return (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setWeightId(w.id)}
                      className={cn(
                        "rounded-xl border p-3 text-center transition-all",
                        isActive
                          ? "border-rv-gold bg-rv-gold/15 text-rv-gold"
                          : "border-white/10 bg-white/[0.03] text-stone-300 hover:border-white/25",
                      )}
                    >
                      <span className="block text-sm font-black">{w.label}</span>
                      <span className="mt-1 block font-mono text-[11px] font-bold text-stone-500">
                        {formatPrice(wPrice)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* === عمود المعاينة === */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-3xl border border-rv-gold/20 bg-gradient-to-b from-coffee-800/50 to-coffee-950/80 shadow-[0_0_50px_rgba(212,175,55,0.08)] backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-rv-gold">خليطتك الحية</p>
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-400">
                  <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                  جاهزة للطلب
                </span>
              </div>

              <div className="p-4 sm:p-5 md:p-6">
                {/* قرص النسب */}
                <div
                  className="mx-auto grid size-40 place-items-center rounded-full sm:size-44 md:size-48"
                  style={{
                    background: `conic-gradient(${ARABICA_GOLD} 0deg ${arabica * 3.6}deg, ${ROBUSTA_BROWN} ${arabica * 3.6}deg 360deg)`,
                    boxShadow: "0 0 40px rgba(212,175,55,0.15)",
                  }}
                >
                  <div className="grid size-32 place-items-center rounded-full border border-white/15 bg-coffee-950/90 text-center md:size-36">
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

                {/* شدة القهوة */}
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

                {/* السعر + الأزرار */}
                <div className="mt-5 border-t border-white/10 pt-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[11px] text-stone-500">سعر {weight.label}</p>
                      <p className="mt-0.5 text-2xl font-black text-rv-gold sm:text-3xl">{formatPrice(price)}</p>
                      <p className="mt-1 font-mono text-[10px] text-stone-500">{formatPrice(kgPrice(arabica))} / كجم</p>
                    </div>
                  </div>

                  <button type="button" onClick={handleAdd} className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rv-gold to-[#b89728] text-sm font-black text-black transition hover:brightness-110">
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
