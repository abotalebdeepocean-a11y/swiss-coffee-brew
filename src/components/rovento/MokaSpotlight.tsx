import { Link } from "react-router";
import { motion } from "framer-motion";
import { ChevronLeft, CookingPot, Droplets, Flame, Gauge, ShieldCheck } from "lucide-react";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/lib/store";
import { IMAGES } from "@/lib/images";
import { useImageCandidates } from "./BagVisual";

/** نقاط البيع الثلاث — مثل المرجع */
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

/** لماذا بريكا مع روفينتو؟ — 4 نقاط مثل المرجع */
const BRIKKA_POINTS = [
  { icon: Gauge, title: "استخلاص أفضل" },
  { icon: Droplets, title: "كريما أكثر كثافة" },
  { icon: ShieldCheck, title: "تحكم في الطعم" },
  { icon: Flame, title: "متينة تدوم طويلاً" },
];

export function MokaSpotlight() {
  const { add } = useCart();
  const { src: brikaSrc, onError: brikaError } = useImageCandidates(
    IMAGES.banners.brika,
  );

  return (
    <section
      id="brikka"
      className="border-b border-stone-800 bg-coffee-950 py-20"
    >
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 px-4 md:px-6 lg:grid-cols-12">
        {/* النص */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="space-y-6 lg:col-span-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-rv-gold/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-rv-gold">
            BIALETTI Brikka
          </span>
          <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl">
            كريما أقرب للإسبريسو{" "}
            <span className="text-rv-gold">بدون ماكينة عالية!</span>
          </h2>
          <p className="text-lg leading-relaxed text-stone-300">
            الكثير من عشاق القهوة يظنون أن الكريما الغنية تتطلب ماكينات إسبريسو
            باهظة الثمن. مع خلطة روفينتو المصممة خصيصًا لاستخلاص ممتاز مع وعاء
            \"الموكا بوت بريكا\" (Brikka)، ستحصل على فنجان إسبريسو احترافي في
            مطبخك خلال 3 دقائق فقط.
          </p>

          {/* 3 نقاط بيع */}
          <div className="space-y-4 pt-2">
            {WHY_BRIKKA.map((w) => (
              <div
                key={w.title}
                className="flex items-start gap-4 rounded-xl border border-stone-800 bg-coffee-900/80 p-4"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-rv-gold/20 text-rv-gold">
                  <w.icon className="size-4" />
                </span>
                <div>
                  <h4 className="text-base font-bold text-white">{w.title}</h4>
                  <p className="mt-1 text-sm text-stone-400">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* شريط عرض الباندل */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border-2 border-rv-gold/40 bg-rv-gold/10 p-5">
            <div>
              <p className="text-sm font-bold text-rv-gold">
                عرض Bialetti × ROVENTO
              </p>
              <p className="mt-1 text-sm text-stone-300">
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
                className="btn-gold inline-flex h-12 items-center gap-2 rounded-xl px-6 text-sm font-black"
              >
                اكتشف بريكا
                <ChevronLeft className="size-4" />
              </button>
              <Link
                to="/shop?category=machines"
                className="inline-flex h-12 items-center rounded-xl border border-stone-700 px-5 text-sm font-bold text-stone-300 transition-colors hover:border-rv-gold hover:text-rv-gold"
              >
                كل الماكينات
              </Link>
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
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-rv-gold to-amber-900 opacity-40 blur-lg" />
            <div className="relative rounded-3xl border border-stone-800 bg-coffee-900 p-6 text-center shadow-2xl">
              <img
                src={brikaSrc ?? `${IMAGES.machines.moka}.jpg`}
                onError={brikaError}
                alt="موكا بوت Bialetti بريكا الأصلية"
                loading="lazy"
                className="mx-auto h-72 w-auto rounded-2xl object-contain shadow-xl md:h-[400px]"
              />
              <p className="mt-4 text-xs font-bold text-rv-gold">
                ☕ استخلاص حقيقي لقهوة روفينتو مع طبقة كريما كثيفة
              </p>
            </div>
          </div>

          {/* لماذا بريكا مع روفينتو؟ — 4 نقاط مثل المرجع */}
          <div className="mt-8 rounded-2xl border border-rv-gold/30 bg-coffee-900/80 p-6">
            <h3 className="mb-5 text-center text-lg font-black text-white">
              لماذا بريكا <span className="text-rv-gold">مع روفينتو؟</span>
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {BRIKKA_POINTS.map((pt) => (
                <div
                  key={pt.title}
                  className="flex flex-col items-center gap-2 rounded-xl border border-stone-800 bg-coffee-950 p-4 text-center"
                >
                  <span className="grid size-10 place-items-center rounded-full bg-rv-gold/15 text-rv-gold">
                    <pt.icon className="size-5" />
                  </span>
                  <span className="text-sm font-bold text-stone-200">
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
