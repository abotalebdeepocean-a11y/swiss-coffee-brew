import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  Crown,
  Eye,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ShoppingCart,
  ArrowLeft,
} from "lucide-react";
import { IMAGES } from "@/lib/images";
import { BagVisual } from "./BagVisual";

/** شريط الثقة المتحرك فوق الهيرو */
const TRUST_SIGNALS = [
  "✓ الدفع عند الاستلام",
  "✓ توصيل 24-72 ساعة",
  "✓ ضمان استرجاع 30 يوم",
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-stone-800"
    >
      {/* خلفية — صورة حبوب قهوة محمصة داكنة + تدرج ذهبي */}
      <div className="absolute inset-0 z-0">
        {/* صورة حبوب القهوة كخلفية */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${IMAGES.bags.macro})`,
            filter: "brightness(0.25) saturate(0.7)",
          }}
        />
        {/* تدرج ذهبي خفيف من الأعلى والأسفل */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0b09]/90 via-[#0d0b09]/60 to-[#0d0b09]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0b09]/80 via-transparent to-[#0d0b09]/80" />
        {/* توهج ذهبي خفيف في الوسط */}
        <div className="pointer-events-none absolute left-1/2 top-1/3 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rv-gold/8 blur-[150px]" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 size-[400px] rounded-full bg-amber-900/10 blur-[120px]" />
      </div>

      {/* شريط Trust Signals المتحرك — فوق الهيرو */}
      <div className="relative z-10 border-b border-white/5 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto flex w-full max-w-[1200px] items-center justify-center gap-2 px-4 py-2.5 md:gap-4 md:px-6"
        >
          {TRUST_SIGNALS.map((signal, i) => (
            <motion.span
              key={signal}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.15 }}
              className="flex items-center gap-1 text-[11px] font-bold tracking-wide text-stone-300 md:text-xs"
            >
              <CheckCircle2 className="size-3.5 text-rv-gold" />
              {signal.replace("✓ ", "")}
              {i < TRUST_SIGNALS.length - 1 && (
                <span className="ms-2 hidden text-stone-600 md:inline">|</span>
              )}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="relative z-10 mx-auto grid w-full max-w-[1200px] items-center gap-8 px-4 pb-14 pt-10 md:gap-12 md:px-6 md:pt-16 lg:grid-cols-12">
        {/* النص */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-6 text-center lg:col-span-7 lg:text-start"
        >
          {/* شارة السعر + عدد العملاء */}
          <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rv-gold to-[#b89728] px-5 py-2 shadow-lg shadow-rv-gold/20"
            >
              <ShoppingCart className="size-4 text-black" />
              <span className="text-sm font-black text-black">
                يبدأ من 650 ج.م / كجم
              </span>
            </motion.div>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-stone-300">
              +500 عميل سعيد
            </span>
          </div>

          {/* العنوان الرئيسي */}
          <h1 className="font-display text-3xl font-black leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="text-rv-cream">قهوتك المختصة...</span>
            <br />
            <span className="gold-gradient-text">محمصة في مصر</span>
          </h1>

          {/* العنوان الفرعي */}
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-stone-400 md:text-base lg:mx-0">
            5 بلندات فاخرة — تحميص طازج يومياً في القاهرة.
            <br className="hidden md:block" />
            شحن مجاني لكل المحافظات.
          </p>

          {/* أبرز المزايا — 3 نقاط سريعة */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-stone-400 lg:justify-start">
            <span className="flex items-center gap-1.5">
              <Truck className="size-4 text-rv-gold" />
              شحن لكل مصر
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-rv-gold" />
              ضمان ذهبي
            </span>
          </div>

          {/* الأزرار */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 lg:justify-start">
            {/* الزر الرئيسي — ذهبي كبير */}
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
              className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-rv-gold to-[#b89728] px-8 py-4 text-lg font-black text-black shadow-xl shadow-rv-gold/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(201,169,97,0.4)]"
            >
              <ShoppingCart className="size-5" />
              اطلب الآن — توصيل مجاني
              <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
            </Link>

            {/* الزر الثانوي — outline ذهبي */}
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
              className="inline-flex items-center gap-3 rounded-xl border-2 border-rv-gold/50 bg-transparent px-8 py-4 text-lg font-bold text-rv-gold transition-all duration-300 hover:border-rv-gold hover:bg-rv-gold/10 hover:shadow-[0_0_20px_rgba(201,169,97,0.15)]"
            >
              <Eye className="size-5" />
              تصفح المنتجات
            </Link>
          </div>
        </motion.div>

        {/* الكيس الرئيسي */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="relative flex justify-center lg:col-span-5"
        >
          <div className="relative w-full max-w-xl">
            {/* توهج ذهبي واسع خلف الكيس */}
            <div className="absolute -inset-12 rounded-full bg-rv-gold/12 blur-[80px]" />
            <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-rv-gold/20 to-amber-800/15 blur-[60px]" />

            {/* كيس البريميوم */}
            <div className="relative">
              <BagVisual
                image={IMAGES.bags.premium}
                variant="premium"
                eager
                alt="كيس روفينتو بريميوم — 100% أرابيكا فاخر"
                className="relative mx-auto h-[320px] w-auto object-contain drop-shadow-[0_20px_60px_rgba(212,175,55,0.3)] sm:h-[380px] md:h-[460px]"
              />
            </div>

            {/* بطاقتين صغيرتين — بريميوم + كولومبيا */}
            <div className="relative mt-6 flex flex-wrap items-center justify-center gap-3">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-2 rounded-xl border border-rv-gold/30 bg-coffee-900/90 px-4 py-3 backdrop-blur-sm transition-all hover:border-rv-gold/60 hover:bg-coffee-900/95 cursor-pointer"
              >
                <BagVisual
                  image={IMAGES.bags.premium}
                  variant="premium"
                  alt="كيس روفينتو بريميوم"
                  className="h-14 w-auto object-contain"
                />
                <div className="text-start">
                  <span className="text-sm font-black text-white">PREMIUM</span>
                  <p className="text-[10px] text-stone-400">100% أرابيكا</p>
                  <span className="text-sm font-black text-rv-gold">850 ج.م</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="flex items-center gap-2 rounded-xl border border-rv-gold/30 bg-coffee-900/90 px-4 py-3 backdrop-blur-sm transition-all hover:border-rv-gold/60 hover:bg-coffee-900/95 cursor-pointer"
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
                  <span className="text-sm font-black text-rv-gold">950 ج.م</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* شريط الثقة السفلي — 4 عناصر */}
      <div className="relative z-10 border-t border-white/5 bg-black/30 backdrop-blur-sm">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-2 gap-5 px-4 py-5 md:grid-cols-4 md:px-6">
          {[
            { icon: ShieldCheck, label: "ضمان استرجاع 30 يوم" },
            { icon: Truck, label: "شحن مجاني لكل مصر" },
            { icon: ShoppingCart, label: "الدفع عند الاستلام" },
            { icon: Crown, label: "+500 عميل سعيد" },
          ].map((t) => (
            <div
              key={t.label}
              className="flex items-center justify-center gap-2.5 text-sm font-bold text-stone-300"
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
