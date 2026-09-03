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

/** عداد تنازلي صغير — 29 يوم */
function HeroCountdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(t);
  }, []);

  // Target = 29 days from now (static per page load)
  const target = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 29);
    d.setHours(23, 59, 59, 0);
    return d.getTime();
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
      className="flex items-center justify-center gap-3 lg:justify-start"
    >
      <span className="text-xs font-bold text-stone-500">التوصيل المجاني ينتهي خلال</span>
      <div className="flex items-center gap-1.5">
        {/* Days — مميز */}
        <div className="relative flex items-center justify-center overflow-hidden rounded-lg border border-rv-red/40 bg-rv-red/10 px-3 py-1.5">
          <span className="relative z-10 font-mono text-lg font-black text-rv-red">{days}</span>
          <span className="relative z-10 ms-1 text-[10px] font-bold text-rv-red/70">يوم</span>
          {/* توهج خلف الرقم */}
          <div className="absolute inset-0 bg-rv-red/5 blur-sm" />
        </div>
        <span className="text-sm font-bold text-rv-red">:</span>
        {/* Hours */}
        <div className="flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5">
          <span className="font-mono text-sm font-bold text-white">{String(hours).padStart(2, "0")}</span>
          <span className="ms-1 text-[9px] text-stone-500">ساعة</span>
        </div>
        <span className="text-sm font-bold text-rv-red">:</span>
        {/* Minutes */}
        <div className="flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5">
          <span className="font-mono text-sm font-bold text-white">{String(mins).padStart(2, "0")}</span>
          <span className="ms-1 text-[9px] text-stone-500">دقيقة</span>
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
      className="relative overflow-hidden"
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
              filter: "brightness(0.15) saturate(0.4)",
            }}
          />
        </motion.div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/95 via-[#0a0a0a]/80 to-[#0a0a0a]" />
        {/* Red glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/3 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rv-red/5 blur-[200px]" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 size-[400px] rounded-full bg-rv-red/3 blur-[150px]" />
        {/* Minimalist grid lines */}
        <div className="absolute inset-0 grid-editorial opacity-30" />
      </div>

      {/* Trust Signals bar */}
      <div className="relative z-10 border-b border-white/5 bg-black/60 backdrop-blur-md">
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
              className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-stone-400 uppercase md:text-xs"
            >
              <CheckCircle2 className="size-3.5 text-rv-red" />
              {signal}
              {i < TRUST_SIGNALS.length - 1 && (
                <span className="ms-2 text-stone-700 md:inline">|</span>
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
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-2 rounded-full border border-rv-red/30 bg-rv-red/10 px-5 py-2"
          >
            <Flame className="size-4 text-rv-red" />
            <span className="text-sm font-bold text-rv-red">
              يبدأ من 700 ج.م / كجم
            </span>
          </motion.div>

          {/* Main heading */}
          <h1 className="font-display text-4xl font-black leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-white">بنقدملك القهوة الإسبريسو</span>
            <br />
            <span className="gold-gradient-text">على أصولها</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-stone-400 md:text-lg lg:mx-0">
            من الحبوب إلى الكوب — تجربة إسبريسو احترافية في بيتك.
            <br className="hidden md:block" />
            تحميص طازج يومياً في القاهرة. شحن لكل محافظات مصر مجاناً.
          </p>

          {/* Countdown timer */}
          <HeroCountdown />

          {/* Features */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-stone-400 lg:justify-start">
            <span className="flex items-center gap-1.5">
              <Truck className="size-4 text-rv-red" />
              شحن لكل مصر
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-rv-red" />
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
              className="group inline-flex items-center gap-3 rounded-xl bg-rv-red px-8 py-4 text-lg font-black text-white shadow-xl shadow-rv-red/25 transition-all duration-300 hover:-translate-y-1 hover:bg-rv-red-light hover:shadow-[0_12px_40px_rgba(208,59,30,0.4)]"
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
              className="inline-flex items-center gap-3 rounded-xl border-2 border-white/20 bg-transparent px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:border-rv-red/50 hover:bg-rv-red/10 hover:text-rv-red"
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
            {/* Red glow behind bag */}
            <div className="absolute -inset-16 rounded-full bg-rv-red/8 blur-[100px]" />

            <div className="relative">
              <BagVisual
                image={IMAGES.bags.premium}
                variant="premium"
                eager
                alt="كيس روفينتو بريميوم — 100% أرابيكا فاخر"
                className="relative mx-auto h-[320px] w-auto object-contain drop-shadow-[0_20px_60px_rgba(208,59,30,0.2)] sm:h-[380px] md:h-[460px]"
              />
            </div>

            {/* Small product cards */}
            <div className="relative mt-6 flex flex-wrap items-center justify-center gap-3">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#111] px-4 py-3 backdrop-blur-sm transition-all hover:border-rv-red/40 cursor-pointer"
              >
                <BagVisual
                  image={IMAGES.bags.premium}
                  variant="premium"
                  alt="كيس روفينتو بريميوم"
                  className="h-14 w-auto object-contain"
                />
                <div className="text-start">
                  <span className="text-sm font-black text-white">PREMIUM</span>
                  <p className="text-[10px] text-stone-500">100% أرابيكا</p>
                  <span className="text-sm font-black text-rv-red">890 ج.م</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#111] px-4 py-3 backdrop-blur-sm transition-all hover:border-rv-red/40 cursor-pointer"
              >
                <BagVisual
                  image={IMAGES.bags.intenso}
                  variant="intenso"
                  alt="كيس روفينتو بار انتينسو"
                  className="h-14 w-auto object-contain"
                />
                <div className="text-start">
                  <span className="text-sm font-black text-white">BAR INTENSO</span>
                  <p className="text-[10px] text-stone-500">تحميص داكن</p>
                  <span className="text-sm font-black text-rv-red">700 ج.م</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom trust strip */}
      <div className="relative z-10 border-t border-white/5 bg-black/40 backdrop-blur-md">
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
              className="flex items-center justify-center gap-2.5 text-sm font-bold text-stone-400"
            >
              <t.icon className="size-5 shrink-0 text-rv-red" />
              {t.label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
