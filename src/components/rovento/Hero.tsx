import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  Crown,
  Eye,
  Flame,
  ShieldCheck,
  Truck,
  Users,
  Star,
  ShoppingBag,
} from "lucide-react";
import { IMAGES } from "@/lib/images";
import { BagVisual } from "./BagVisual";
import { Stars } from "./art";

/** شريط الثقة السفلي — نفس عناصر المرجع (شحن/تحميص/عملاء/ضمان) */
const TRUST_STRIP = [
  { icon: Truck, label: "شحن سريع داخل مصر" },
  { icon: Flame, label: "تحميص طازج أسبوعياً" },
  { icon: Users, label: "+5000 عميل سعيد" },
  { icon: ShieldCheck, label: "ضمان استرجاع ذهبي" },
];

/** نقاط تفاعلية على كارت المنتج */
const HOTSPOTS = [
  {
    icon: "＋",
    cls: "top-8 right-6",
    color: "bg-rv-gold text-black",
    title: "🛡️ صمام أحادي الاتجاه",
    desc: "يفرغ الغازات ويمنع دخول الهواء للحفاظ على الزيوت العطرية.",
    side: "tooltip-end" as const,
  },
  {
    icon: "🔥",
    cls: "top-1/2 left-6",
    color: "bg-red-600 text-white",
    title: "🔥 تحميص مصري طازج",
    desc: "دفعات صغيرة محمصة في القاهرة لضمان أقصى طزاجة.",
    side: "tooltip-start" as const,
  },
  {
    icon: "☕",
    cls: "bottom-24 right-8",
    color: "bg-gradient-to-r from-rv-gold to-amber-500 text-black",
    title: "☕ شاهد قوة الكريما الحقيقية",
    desc: "كريما ذهبية كثيفة من خلطة الإسبريسو الملكية.",
    side: "tooltip-end" as const,
  },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-stone-800 bg-gradient-to-b from-coffee-950 via-[#0d0b09] to-coffee-950"
    >
      {/* توهج محيطي — أكبر وأقوى */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rv-gold/8 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 size-[500px] rounded-full bg-red-900/8 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-1/4 left-0 size-[400px] rounded-full bg-amber-900/5 blur-[80px]" />

      <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-8 px-4 pb-14 pt-10 md:gap-12 md:px-6 md:pt-16 lg:grid-cols-12">
        {/* النص */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-5 text-center lg:col-span-7 lg:text-start"
        >
          {/* شارة الثقة + السعر — فوق العنوان مباشرة */}
          <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-rv-gold/30 bg-coffee-900/90 px-4 py-2 shadow-lg">
              <div className="flex text-rv-gold">
                <Stars value={5} />
              </div>
              <span className="rounded-full bg-rv-gold/20 px-2 py-0.5 text-xs font-bold text-rv-gold">
                4.9/5
              </span>
              <span className="text-sm font-bold text-stone-200">
                +500 عميل يثقون في روفينتو
              </span>
            </div>

            {/* بادج السعر — واضح وأبرز */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rv-gold to-[#b89728] px-5 py-2 shadow-lg shadow-rv-gold/20"
            >
              <ShoppingBag className="size-4 text-black" />
              <span className="text-sm font-black text-black">
                يبدأ من 690 ج.م / كجم
              </span>
            </motion.div>
          </div>

          {/* الشعار الرئيسي */}
          <h1 className="text-3xl font-black leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            مش مجرد قهوة...
            <br />
            <span className="gold-gradient-text">دي عصارة قهوة خالصة.</span>
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-stone-300 md:text-lg lg:mx-0">
            حبوب إسبريسو محمصة بعناية لعشاق الكريما الغنية والطعم المتوازن.
            <span className="hidden text-rv-gold md:inline"> في مصر للعالم.</span>
          </p>

          {/* أبرز المزايا — 3 نقاط سريعة */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-stone-400 lg:justify-start">
            <span className="flex items-center gap-1.5">
              <Flame className="size-4 text-rv-red" />
              تحميص طازج
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="size-4 text-rv-gold" />
              شحن لكل مصر
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-emerald-400" />
              ضمان ذهبي
            </span>
          </div>

          {/* الأزرار — زر رئيسي واحد واضح + زر ثانوي */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 lg:justify-start">
            <Link
              to="/#bestsellers"
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  document
                    .getElementById("bestsellers")
                    ?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="inline-flex items-center gap-3 rounded-xl bg-amber-500 px-8 py-4 text-lg font-black text-stone-950 shadow-xl shadow-amber-500/20 transition hover:-translate-y-0.5 hover:bg-amber-600 hover:shadow-amber-500/30"
            >
              اطلب الآن
              <Crown className="size-5" />
            </Link>
            <Link
              to="/#featured"
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  document
                    .getElementById("featured")
                    ?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="inline-flex items-center gap-3 rounded-xl border border-stone-700 bg-stone-900 px-8 py-4 text-lg font-bold text-stone-200 transition hover:border-rv-gold hover:bg-stone-800 hover:text-rv-gold"
            >
              <Eye className="size-5 text-rv-gold" />
              استكشف المنتجات
            </Link>
          </div>
        </motion.div>

        {/* كارت المنتج — الكيس هو البطل */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="relative flex justify-center lg:col-span-5"
        >
          <div className="relative w-full max-w-md">
            {/* توهج متحرك خلف الكيس — أقوى وأوضح */}
            <div className="absolute -inset-4 animate-pulse rounded-3xl bg-gradient-to-br from-rv-gold/40 via-rv-gold/20 to-red-800/30 blur-2xl" />

            <div className="relative flex flex-col items-center rounded-3xl border border-stone-800/80 bg-coffee-900/90 p-6 shadow-2xl backdrop-blur-sm">
              {/* الكيس — كبير وواضح */}
              <div className="relative">
                <BagVisual
                  image={IMAGES.heroBag}
                  variant="premium"
                  eager
                  alt="Rovento Premium Blend — كيس قهوة إسبريسو"
                  className="relative h-[320px] w-auto rounded-xl object-contain transition duration-500 md:h-[420px]"
                />

                {/* النقاط التفاعلية */}
                {HOTSPOTS.map((h) => (
                  <div key={h.title} className={`absolute ${h.cls} group/spot`}>
                    <span
                      className={`grid size-7 cursor-default place-items-center rounded-full text-xs font-black shadow-lg animate-pulse ${h.color}`}
                    >
                      {h.icon}
                    </span>
                    <span
                      className={`pointer-events-none absolute top-8 z-20 hidden w-48 rounded-xl border bg-stone-950 p-2.5 text-xs shadow-2xl group-hover/spot:block ${
                        h.side === "tooltip-start"
                          ? "start-0"
                          : "end-0 text-start"
                      }`}
                    >
                      <strong className="mb-0.5 block text-rv-gold">
                        {h.title}
                      </strong>
                      <span className="text-stone-400">{h.desc}</span>
                    </span>
                  </div>
                ))}
              </div>

              {/* بادج أسفل الكيس — السعر والمواصفات */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 backdrop-blur-sm">
                  <Crown className="size-4 text-rv-gold" />
                  <span className="text-sm font-black text-white">PREMIUM</span>
                  <span className="text-xs text-stone-400">70% أرابيكا</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-rv-gold px-4 py-2 text-sm font-black text-black">
                  1,200 ج.م
                  <span className="text-xs font-bold text-black/70">/ 1 كجم</span>
                </div>
              </div>
            </div>

            {/* شارة عائمة — الكلاسيك */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-4 start-0 flex items-center gap-2 whitespace-nowrap rounded-full border border-blue-400/30 bg-blue-900/90 px-4 py-2 text-sm font-bold text-blue-200 shadow-lg backdrop-blur-sm md:-bottom-5 md:start-4"
            >
              <Star className="size-3.5 fill-blue-400 text-blue-400" />
              CLASSIC — 690 ج.م / 1 كجم
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* شريط الثقة السفلي */}
      <div className="border-t border-white/10 bg-coffee-900/60">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-2 gap-5 px-4 py-5 md:grid-cols-4 md:px-6">
          {TRUST_STRIP.map((t) => (
            <div
              key={t.label}
              className="flex items-center justify-center gap-2.5 text-sm font-bold text-stone-200"
            >
              <t.icon className="size-5 shrink-0 text-rv-gold" />
              {t.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
