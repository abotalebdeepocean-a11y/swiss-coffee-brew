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
  { icon: Users, label: "+500 عميل سعيد" },
  { icon: ShieldCheck, label: "ضمان استرجاع ذهبي" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-stone-800 bg-gradient-to-b from-coffee-950 via-[#0d0b09] to-coffee-950"
    >
      {/* توهج سينمائي — إضاءة ذهبية خلف الكيسين */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 size-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rv-gold/10 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 size-[600px] rounded-full bg-amber-900/8 blur-[120px]" />
      <div className="pointer-events-none absolute top-0 left-1/4 size-[400px] rounded-full bg-rv-gold/5 blur-[100px]" />

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
                يبدأ من 650 ج.م / كجم
              </span>
            </motion.div>
          </div>

          {/* الشعار الرئيسي */}
          <h1 className="font-display text-3xl font-black leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="text-rv-cream">دلوقتي هتعرف تختار</span>
            <br />
            <span className="gold-gradient-text">حبوب قهوة متحمصة</span>
            <br />
            <span className="text-rv-cream">بالطريقة الي تناسبك</span>
          </h1>
          <p className="mt-1 font-display text-sm italic tracking-wider text-rv-gold/70">
            افضل جودة تحميص بمعايير عالمية
          </p>

          <p className="mx-auto max-w-2xl text-xs leading-relaxed text-stone-400 md:text-sm lg:mx-0">
            5 خلطات فاخرة — هنضملك الحصول على قهوة نقية باعلى معايير الجودة.
            <br className="hidden md:block" />
            تحميص طازج يومياً في مصر. شحن مجاني لكل المحافظات.
          </p>

          <p className="mx-auto max-w-2xl text-xs leading-relaxed text-stone-400 md:text-sm lg:mx-0 italic">
            ما تنساش تقولنا رايك بعد ما تفتح الكيس وتشم ريحة القهوة !!
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
              <ShieldCheck className="size-4 text-rv-gold" />
              ضمان ذهبي
            </span>
          </div>

          {/* الأزرار — زر رئيسي واحد واضح + زر ثانوي */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 lg:justify-start">
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
              className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-rv-gold to-[#b89728] px-8 py-4 text-lg font-black text-black shadow-xl shadow-rv-gold/20 transition hover:-translate-y-0.5 hover:shadow-rv-gold/40"
            >
              اطلب الآن — توصيل مجاني
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
              className="inline-flex items-center gap-3 rounded-xl border-2 border-rv-gold/50 bg-transparent px-8 py-4 text-lg font-bold text-rv-gold transition hover:border-rv-gold hover:bg-rv-gold/10"
            >
              <Eye className="size-5 text-rv-gold" />
              تصفح المنتجات
            </Link>
          </div>
        </motion.div>

        {/* الكيسين — البطل الرئيسي */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="relative flex justify-center lg:col-span-5"
        >
          <div className="relative w-full max-w-xl">
            {/* توهج سينمائي ذهبي واسع */}
            <div className="absolute -inset-12 rounded-full bg-rv-gold/12 blur-[80px]" />
            <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-rv-gold/20 to-amber-800/15 blur-[60px]" />

            {/* صورة كيس البريميوم — كبيرة وواضحة */}
            <div className="relative">
              <BagVisual
                image={IMAGES.bags.premium}
                variant="premium"
                eager
                alt="كيس روفينتو بريميوم — 100% أرابيكا فاخر"
                className="relative mx-auto h-[320px] w-auto object-contain drop-shadow-[0_20px_60px_rgba(212,175,55,0.3)] sm:h-[380px] md:h-[460px]"
              />
            </div>

            {/* منتجين طائرين — بريميوم + كولومبيا */}
            <div className="relative mt-6 flex flex-wrap items-center justify-center gap-3">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-2 rounded-xl border border-rv-gold/30 bg-coffee-900/90 px-4 py-3 backdrop-blur-sm hover:border-rv-gold/60 hover:bg-coffee-900/95 transition-all cursor-pointer"
              >
                <BagVisual
                  image={IMAGES.bags.premium}
                  variant="premium"
                  alt="كيس روفينتو بريميوم"
                  className="h-14 w-auto object-contain"
                />
                <div className="text-start">
                  <span className="text-sm font-black text-white">PREMIUM</span>
                  <p className="text-[10px] text-stone-400">النسر الأخضر</p>
                  <span className="text-sm font-black text-rv-gold">850 ج.م</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="flex items-center gap-2 rounded-xl border border-rv-gold/30 bg-coffee-900/90 px-4 py-3 backdrop-blur-sm hover:border-rv-gold/60 hover:bg-coffee-900/95 transition-all cursor-pointer"
              >
                <BagVisual
                  image={IMAGES.bags.colombia}
                  variant="premium"
                  alt="كيس روفينتو كولومبيا"
                  className="h-14 w-auto object-contain"
                />
                <div className="text-start">
                  <span className="text-sm font-black text-stone-100">COLOMBIA</span>
                  <p className="text-[10px] text-stone-400">سنجل أوريجن</p>
                  <span className="text-sm font-black text-rv-gold">900 ج.م</span>
                </div>
              </motion.div>
            </div>
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
