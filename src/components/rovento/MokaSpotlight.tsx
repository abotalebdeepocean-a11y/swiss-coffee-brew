import { Link } from "react-router";
import { motion } from "framer-motion";
import { ChevronLeft, CookingPot, Droplets, Flame, Gauge, ShieldCheck, Check } from "lucide-react";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/lib/store";
import { IMAGES } from "@/lib/images";
import { useImageCandidates } from "./BagVisual";

/** نقاط البيع الثلاث */
const WHY_BRIKKA = [
  {
    icon: Droplets,
    title: "كريما غنية وقوام مثالي",
    desc: "طبقة كريما ذهبية كثيفة ومخملية أقرب للإسبريسو الحقيقي.",
  },
  {
    icon: CookingPot,
    title: "تعمل على البوتاجاز العادي",
    desc: "تحضير سريع وسهل على أي موقد غاز أو كهرباء في أقل من 3 دقائق.",
  },
  {
    icon: Flame,
    title: "طعم احترافي في البيت",
    desc: "إسبريسو فاخر بلا ماكينة بـ 20 ألف جنيه — من مطبخك مباشرة.",
  },
];

/** لماذا بريكا مع روفينتو؟ — 4 نقاط */
const BRIKKA_POINTS = [
  { icon: Gauge, title: "استخلاص أفضل" },
  { icon: Droplets, title: "كريما أكثر كثافة" },
  { icon: ShieldCheck, title: "تحكم في الطعم" },
  { icon: Flame, title: "متينة تدوم طويلاً" },
];

/** الفوائد الرئيسية */
const KEY_BENEFITS = [
  "بدون ماكينة إسبريسو باهظة",
  "كريما حقيقية في 3 دقائق",
  "تتوافق مع روفينتو بريميوم",
  "مناسبة للبوتاجاز العادي",
];

export function MokaSpotlight() {
  const { add } = useCart();
  const { src: brikaSrc, onError: brikaError } = useImageCandidates(
    IMAGES.banners.brika,
  );

  return (
    <section
      id="brikka"
      className="border-b border-stone-800 bg-coffee-950 py-16 md:py-20"
    >
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-10 px-4 md:gap-12 md:px-6 lg:grid-cols-12">
        {/* النص */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="space-y-5 lg:col-span-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-rv-gold/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-rv-gold">
            BIALETTI Brikka
          </span>
          <h2 className="text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl">
            كريما أقرب للإسبريسو{" "}
            <span className="text-rv-gold">بدون ماكينة عالية!</span>
          </h2>
          <p className="text-base leading-relaxed text-stone-300 md:text-lg">
            الكثير من عشاق القهوة يظنون أن الكريما الغنية تتطلب ماكينات إسبريسو
            باهظة الثمن. مع خلطة روفينتو المصممة خصيصًا لاستخلاص ممتاز مع وعاء
            "الموكا بوت بريكا" (Brikka)، ستحصل على فنجان إسبريسو احترافي في
            مطبخك خلال 3 دقائق فقط.
          </p>

          {/* قائمة الفوائد — ب鞧دات واضحة */}
          <div className="grid grid-cols-2 gap-2">
            {KEY_BENEFITS.map((b) => (
              <div
                key={b}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2"
              >
                <Check className="size-3.5 shrink-0 text-emerald-400" />
                <span className="text-xs font-bold text-stone-200">{b}</span>
              </div>
            ))}
          </div>

          {/* 3 نقاط بيع */}
          <div className="space-y-3 pt-1">
            {WHY_BRIKKA.map((w) => (
              <div
                key={w.title}
                className="flex items-start gap-3 rounded-xl border border-stone-800 bg-coffee-900/80 p-3.5"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-rv-gold/20 text-rv-gold">
                  <w.icon className="size-4" />
                </span>
                <div>
                  <h4 className="text-sm font-bold text-white">{w.title}</h4>
                  <p className="mt-0.5 text-xs text-stone-400">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* شريط عرض الباندل */}
          <div className="rounded-2xl border-2 border-rv-gold/40 bg-rv-gold/10 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold text-rv-gold">
                  عرض Bialetti × ROVENTO
                </p>
                <p className="mt-1 text-xs text-stone-300">
                  موكا بوت بريكا الأصلية + كيس بريميم 1 كجم
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-rv-gold">
                    {formatPrice(2999)}
                  </span>
                  <span className="text-sm text-stone-400 line-through">
                    {formatPrice(3999)}
                  </span>
                  <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-black text-white">
                    خصم 25%
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => add("machine-moka")}
                  className="btn-gold inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-black"
                >
                  اكتشف بريكا
                  <ChevronLeft className="size-4" />
                </button>
                <Link
                  to="/shop?category=machines"
                  className="inline-flex h-11 items-center rounded-xl border border-stone-700 px-4 text-xs font-bold text-stone-300 transition-colors hover:border-rv-gold hover:text-rv-gold"
                >
                  كل الماكينات
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* الصورة + لماذا بريكا مع روفينتو؟ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-6"
        >
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-rv-gold to-amber-900 opacity-30 blur-lg" />
            <div className="relative rounded-3xl border border-stone-800 bg-coffee-900 p-5 text-center shadow-2xl sm:p-6">
              <img
                src={brikaSrc ?? `${IMAGES.machines.moka}.jpg`}
                onError={brikaError}
                alt="موكا بوت Bialetti بريكا الأصلية"
                loading="lazy"
                className="mx-auto h-64 w-auto rounded-2xl object-contain shadow-xl sm:h-72 md:h-[380px]"
              />
              <p className="mt-4 text-xs font-bold text-rv-gold">
                ☕ استخلاص حقيقي لقهوة روفينتو مع طبقة كريما كثيفة
              </p>
            </div>
          </div>

          {/* لماذا بريكا مع روفينتو؟ — 4 نقاط */}
          <div className="mt-6 rounded-2xl border border-rv-gold/30 bg-coffee-900/80 p-5 md:mt-8">
            <h3 className="mb-4 text-center text-base font-black text-white md:text-lg">
              لماذا بريكا <span className="text-rv-gold">مع روفينتو؟</span>
            </h3>
            <div className="grid grid-cols-2 gap-2.5 md:gap-3">
              {BRIKKA_POINTS.map((pt) => (
                <div
                  key={pt.title}
                  className="flex flex-col items-center gap-2 rounded-xl border border-stone-800 bg-coffee-950 p-3.5 text-center"
                >
                  <span className="grid size-9 place-items-center rounded-full bg-rv-gold/15 text-rv-gold">
                    <pt.icon className="size-4.5" />
                  </span>
                  <span className="text-xs font-bold text-stone-200">
                    {pt.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
