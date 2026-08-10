import { Link } from "react-router";
import { motion } from "framer-motion";
import { ChevronLeft, Coffee, CookingPot, Wallet } from "lucide-react";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/lib/store";
import { IMAGES } from "@/lib/images";

const WHY_BRIKKA = [
  {
    icon: Coffee,
    title: "كريما أقرب للإسبريسو الحقيقي",
    desc: "طبقة كريما ذهبية كثيفة ومخملية بفضل توازن الأرابيكا مع الروبوستا المحمصة بدقة.",
  },
  {
    icon: Wallet,
    title: "بدون ماكينة بـ 20 ألف جنيه",
    desc: "وفر آلاف الجنيهات واستمتع بنفس جودة المقاهي المختصة وأنت في منزلك.",
  },
  {
    icon: CookingPot,
    title: "تعمل على البوتاجاز العادي بسهولة",
    desc: "تحضير سريع وسهل على أي موقد غاز أو كهرباء في أقل من 3 دقائق.",
  },
];

export function MokaSpotlight() {
  const { add } = useCart();

  return (
    <section
      id="moka"
      className="border-b border-stone-800 bg-coffee-950 py-20"
    >
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 px-4 md:px-6 lg:grid-cols-12">
        {/* النص */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="space-y-6 lg:col-span-7"
        >
          <span className="inline-block rounded-full bg-rv-gold/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-rv-gold">
            سر الكريما الإيطالية في بيتك
          </span>
          <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl">
            لماذا بريكا؟
            <br />
            <span className="text-rv-gold">
              إسبريسو فاخر بدون ماكينة بـ 20 ألف جنيه!
            </span>
          </h2>
          <p className="text-lg leading-relaxed text-stone-300">
            الكثير من عشاق القهوة يظنون أن الكريما الغنية تتطلب ماكينات إسبريسو
            باهظة الثمن. مع خلطة روفينتو المصممة خصيصًا لاستخلاص ممتاز مع وعاء
            "الموكا بوت بريكا" (Brikka)، ستحصل على فنجان إسبريسو احترافي في
            مطبخك خلال 3 دقائق فقط.
          </p>

          {/* 3 نقاط بيع */}
          <div className="space-y-4 pt-2">
            {WHY_BRIKKA.map((w) => (
              <div
                key={w.title}
                className="flex items-start gap-4 rounded-xl border border-stone-800 bg-coffee-900/80 p-4"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-rv-gold/20 text-lg font-black text-rv-gold">
                  ✔
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
                اطلب الآن
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

        {/* الصورة */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex justify-center lg:col-span-5"
        >
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-rv-gold to-amber-900 opacity-40 blur-lg" />
            <div className="relative rounded-3xl border border-stone-800 bg-coffee-900 p-6 text-center shadow-2xl">
              <img
                src={`${IMAGES.machines.moka}.jpg`}
                alt="موكا بوت Bialetti بريكا الأصلية"
                loading="lazy"
                className="mx-auto h-72 w-auto rounded-2xl object-contain shadow-xl md:h-[400px]"
              />
              <p className="mt-4 text-xs font-bold text-rv-gold">
                ☕ استخلاص حقيقي لقهوة روفينتو مع طبقة كريما كثيفة
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
