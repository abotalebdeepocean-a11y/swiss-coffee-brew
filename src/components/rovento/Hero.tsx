import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  Crown,
  Eye,
  Flame,
  ShieldCheck,
  Truck,
  Users,
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

/** نقاط تفاعلية على كارت المنتج — نفس روح المرجع */
const HOTSPOTS = [
  {
    icon: "＋",
    cls: "top-8 right-6",
    color: "bg-rv-gold text-black",
    title: "🛡️ صمام أحادي الاتجاه",
    desc: "يفرغ الغازات ويمنع دخول الهواء للحفظ على الزيوت العطرية.",
    side: "tooltip-end",
  },
  {
    icon: "🔥",
    cls: "top-1/2 left-6",
    color: "bg-red-600 text-white",
    title: "🔥 تحميص مصري طازج",
    desc: "دفعات صغيرة محمصة في القاهرة لضمان أقصى طزاجة.",
    side: "tooltip-start",
  },
  {
    icon: "☕",
    cls: "bottom-24 right-8",
    color: "bg-gradient-to-r from-rv-gold to-amber-500 text-black",
    title: "☕ شاهد قوة الكريما الحقيقية",
    desc: "كريما ذهبية كثيفة من خلطة الإسبريسو الملكية.",
    side: "tooltip-end",
  },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-stone-800 bg-gradient-to-b from-coffee-950 via-[#0d0b09] to-coffee-950"
    >
      {/* توهج محيطي */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rv-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 size-[400px] rounded-full bg-red-900/10 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-12 px-4 pb-14 pt-12 md:px-6 md:pt-16 lg:grid-cols-12">
        {/* النص */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-6 text-center lg:col-span-7 lg:text-start"
        >
          {/* شارة الثقة */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-rv-gold/30 bg-coffee-900/90 px-4 py-2 shadow-lg">
            <div className="flex text-rv-gold">
              <Stars value={5} />
            </div>
            <span className="rounded-full bg-rv-gold/20 px-2 py-0.5 text-xs font-bold text-rv-gold">
              4.9/5
            </span>
            <span className="text-sm font-bold text-stone-200">
              +500 عميل يثقون في روفينتو في مصر
            </span>
          </div>

          {/* الشعار الرئيسي */}
          <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            مش مجرد قهوة...
            <br />
            <span className="gold-gradient-text">دي عصارة قهوة خالصة.</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-300 lg:mx-0">
            طعم إسبريسو أصيل... في كل فنجان. حبوب محمصة طازجة في مصر بعناية
            لعشاق الكريما الغنية والطعم المتوازن.
          </p>

          {/* الأزرار — مثل المرجع */}
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
              className="inline-flex items-center gap-3 rounded-xl bg-amber-500 px-8 py-4 text-lg font-black text-stone-950 shadow-xl transition hover:-translate-y-0.5 hover:bg-amber-600 hover:shadow-amber-500/20"
            >
              تسوق الآن
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
              className="inline-flex items-center gap-3 rounded-xl border border-stone-700 bg-stone-900 px-8 py-4 text-lg font-bold text-stone-200 transition hover:bg-stone-800"
            >
              <Eye className="size-5 text-rv-gold" />
              استكشف المنتجات
            </Link>
          </div>
        </motion.div>

        {/* كارت المنتج */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="relative flex justify-center lg:col-span-5"
        >
          <div className="relative w-full max-w-md">
            {/* توهج متحرك */}
            <div className="absolute -inset-2 animate-pulse rounded-3xl bg-gradient-to-r from-rv-gold to-red-800 opacity-30 blur-xl" />

            <div className="relative flex flex-col items-center rounded-3xl border border-stone-800 bg-coffee-900/80 p-6 shadow-2xl">
              <BagVisual
                image={IMAGES.heroBag}
                variant="premium"
                eager
                alt="Rovento Espresso Blend — كيس قهوة"
                className="h-[400px] w-auto rounded-xl object-contain transition duration-500 md:h-[480px]"
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

            {/* شارة عائمة */}
            <div className="absolute -bottom-4 start-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/20 bg-gradient-to-r from-rv-gold to-[#b89728] px-6 py-2 text-sm font-black text-black shadow-lg">
              <Crown className="size-4" />
              خلطة إسبريسو الملكية • 1 كجم
            </div>
          </div>
        </motion.div>
      </div>

      {/* شريط الثقة السفلي — مثل المرجع */}
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
