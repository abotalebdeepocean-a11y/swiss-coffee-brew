import { Link } from "react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Crown,
  Eye,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ShoppingCart,
  ArrowLeft,
  Flame,
} from "lucide-react";
import { IMAGES } from "@/lib/images";
import { BagVisual } from "./BagVisual";

const TRUST_SIGNALS = [
  "الدفع عند الاستلام",
  "توصيل 24-72 ساعة",
  "ضمان استرجاع 30 يوم",
];

/** عداد تنازلي حقيقي حتى 1 أكتوبر 2026 (بتوقيت مصر UTC+2) */
function HeroCountdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(t);
  }, []);

  const target = useMemo(() => {
    const egyptOffset = 2 * 60;
    const utc = new Date(Date.UTC(2026, 9, 1, 23, 59, 59));
    const egyptTime = new Date(utc.getTime() - egyptOffset * 60_000);
    return egyptTime.getTime();
  }, []);

  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const mins = Math.floor((diff % 3_600_000) / 60_000);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="flex flex-wrap items-center justify-center gap-3 lg:justify-start"
    >
      <span className="text-sm font-bold text-coffee-700">التوصيل المجاني ينتهي خلال</span>
      <span className="text-xs text-coffee-600">1 Oct 2026</span>
      <div className="flex items-center gap-1.5">
        {/* Days — مميز */}
        <div className="relative flex items-center justify-center overflow-hidden rounded-lg border border-rv-gold/40 bg-rv-gold/10 px-3 py-1.5">
          <span className="relative z-10 font-mono text-lg font-black text-rv-gold">{days}</span>
          <span className="relative z-10 ms-1 text-[10px] font-bold text-rv-gold/70">يوم</span>
          <div className="absolute inset-0 bg-rv-gold/5 blur-sm" />
        </div>
        <span className="text-sm font-bold text-rv-gold">:</span>
        {/* Hours */}
        <div className="flex items-center justify-center rounded-lg border border-coffee-700/15 bg-white px-2.5 py-1.5">
          <span className="font-mono text-sm font-bold text-coffee-900">{String(hours).padStart(2, "0")}</span>
          <span className="ms-1 text-[9px] text-coffee-600">ساعة</span>
        </div>
        <span className="text-sm font-bold text-rv-gold">:</span>
        {/* Minutes */}
        <div className="flex items-center justify-center rounded-lg border border-coffee-700/15 bg-white px-2.5 py-1.5">
          <span className="font-mono text-sm font-bold text-coffee-900">{String(mins).padStart(2, "0")}</span>
          <span className="ms-1 text-[9px] text-coffee-600">دقيقة</span>
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-[#f5f0e8] via-[#faf7f0] to-[#faf7f0]"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${IMAGES.bags.macro})`,
              filter: "brightness(0.9) saturate(0.6)",
            }}
          />
        </motion.div>
        {/* Warm overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5f0e8]/90 via-[#faf7f0]/80 to-[#faf7f0]" />
        {/* Gold glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/3 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rv-gold/8 blur-[200px]" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 size-[400px] rounded-full bg-rv-gold/5 blur-[150px]" />
        {/* Minimalist grid lines */}
        <div className="absolute inset-0 grid-editorial opacity-30" />
      </div>

      {/* Trust Signals bar */}
      <div className="relative z-10 border-b border-coffee-700/10 bg-white/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto flex w-full max-w-[1200px] items-center justify-center gap-3 px-4 py-3 md:gap-6 md:px-6"
        >
          {TRUST_SIGNALS.map((signal, i) => (
            <motion.span
              key={signal}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.15 }}
              className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-coffee-600 uppercase md:text-xs"
            >
              <CheckCircle2 className="size-3.5 text-rv-gold" />
              {signal}
              {i < TRUST_SIGNALS.length - 1 && (
                <span className="ms-2 text-coffee-700/30 md:inline">|</span>
              )}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Main content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto grid w-full max-w-[1200px] items-center gap-8 px-4 pb-16 pt-12 md:gap-12 md:px-6 md:pt-20 lg:grid-cols-12"
      >
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 text-center lg:col-span-7 lg:text-start"
        >
          {/* Main heading */}
          <h1 className="font-display text-4xl font-black leading-tight text-coffee-900 sm:text-5xl md:text-6xl lg:text-7xl">
            <span>بنقدملك القهوة الإسبريسو</span>
            <br />
            <span className="gold-gradient-text">على أصولها</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-coffee-600 md:text-lg lg:mx-0">
            من الحبوب إلى الكوب — تجربة إسبريسو احترافية في بيتك.
            <br className="hidden md:block" />
            تحميص طازج يومياً في القاهرة.
            <br />
            شحن مجاني لكل محافظات مصر لفترة محدودة.
          </p>

          {/* Countdown timer */}
          <HeroCountdown />

          {/* Features */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-coffee-600 lg:justify-start">
            <span className="flex items-center gap-1.5">
              <Truck className="size-4 text-rv-gold" />
              شحن مجاني لكل مصر
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-rv-gold" />
              ضمان ذهبي
            </span>
          </div>

          {/* CTAs */}
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
              className="group inline-flex items-center gap-3 rounded-xl bg-rv-gold px-8 py-4 text-lg font-black text-white shadow-xl shadow-rv-gold/25 transition-all duration-300 hover:-translate-y-1 hover:bg-rv-gold-light hover:shadow-[0_12px_40px_rgba(184,134,11,0.35)]"
            >
              <ShoppingCart className="size-5" />
              اطلب الآن — توصيل مجاني
              <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
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
              className="inline-flex items-center gap-3 rounded-xl border-2 border-coffee-700/20 bg-transparent px-8 py-4 text-lg font-bold text-coffee-900 transition-all duration-300 hover:border-rv-gold/50 hover:bg-rv-gold/10 hover:text-rv-gold"
            >
              <Eye className="size-5" />
              تصفح المنتجات
            </Link>
          </div>
        </motion.div>

        {/* Coffee bag visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative flex justify-center lg:col-span-5"
        >
          <div className="relative w-full max-w-xl">
            {/* Gold glow behind bag */}
            <div className="absolute -inset-16 rounded-full bg-rv-gold/10 blur-[100px]" />

            <div className="relative">
              <BagVisual
                image={IMAGES.bags.premium}
                variant="premium"
                eager
                alt="كيس روفينتو بريميوم — بلند إسبريسو فاخر 50% أرابيكا و50% روبوستا"
                className="relative mx-auto h-[320px] w-auto object-contain drop-shadow-[0_20px_60px_rgba(184,134,11,0.15)] sm:h-[380px] md:h-[460px]"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom trust strip */}
      <div className="relative z-10 border-t border-coffee-700/10 bg-white/40 backdrop-blur-md">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-2 gap-5 px-4 py-5 md:grid-cols-4 md:px-6">
          {[
            { icon: ShieldCheck, label: "ضمان استرجاع 30 يوم" },
            { icon: Truck, label: "شحن مجاني لكل مصر" },
            { icon: ShoppingCart, label: "الدفع عند الاستلام" },
            { icon: Crown, label: "+500 عميل سعيد" },
          ].map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
              className="flex items-center justify-center gap-2.5 text-sm font-bold text-coffee-600"
            >
              <t.icon className="size-5 shrink-0 text-rv-gold" />
              {t.label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
