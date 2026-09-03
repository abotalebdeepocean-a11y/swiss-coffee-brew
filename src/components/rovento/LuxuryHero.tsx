import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Truck, CreditCard } from "lucide-react";
import { useCart } from "@/lib/store";
import { GoldParticles } from "./GoldParticles";

function HeroCountdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(t);
  }, []);

  const target = useMemo(() => {
    const utc = new Date(Date.UTC(2026, 9, 1, 23, 59, 59));
    return utc.getTime() - 2 * 60 * 60_000;
  }, []);

  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const mins = Math.floor((diff % 3_600_000) / 60_000);

  return (
    <div className="flex items-center justify-center gap-3">
      <span className="text-xs tracking-wider text-rv-smoke">ينتهي خلال</span>
      {[
        { val: days, label: "يوم" },
        { val: hours, label: "ساعة" },
        { val: mins, label: "دقيقة" },
      ].map((item, i) => (
        <div key={item.label} className="flex items-center gap-1">
          {i > 0 && <span className="text-rv-gold">:</span>}
          <div className="flex flex-col items-center rounded-lg border border-rv-gold/20 bg-rv-gold/5 px-3 py-1.5">
            <span className="font-mono text-lg font-black text-rv-gold">
              {String(item.val).padStart(2, "0")}
            </span>
            <span className="text-[9px] text-rv-smoke">{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function LuxuryHero() {
  const { add } = useCart();

  return (
    <section className="relative min-h-screen overflow-hidden bg-rv-black">
      {/* Golden bokeh */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/3 size-[500px] rounded-full bg-rv-gold/[0.03] blur-[150px]" />
        <div className="absolute right-1/4 top-1/2 size-[400px] rounded-full bg-rv-gold/[0.02] blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-rv-gold/[0.025] blur-[200px]" />
      </div>

      <GoldParticles count={30} />

      {/* Trust bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 border-b border-white/5 bg-white/[0.02] backdrop-blur-sm"
      >
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-4 px-4 py-3 md:gap-8">
          {[
            { icon: CreditCard, text: "الدفع عند الاستلام" },
            { icon: Truck, text: "توصيل 24-72 ساعة" },
          ].map((s) => (
            <span key={s.text} className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-rv-smoke uppercase md:text-xs">
              <s.icon className="size-3.5 text-rv-gold" />
              {s.text}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-60px)] max-w-[1200px] flex-col items-center justify-center px-4 pt-8 pb-16 md:px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-12 text-center"
        >
          <h1 className="font-display text-4xl font-black leading-tight sm:text-5xl md:text-7xl lg:text-8xl">
            <span className="gold-gradient-text-light">القهوة الإسبريسو</span>
            <br />
            <span className="gold-gradient-text">على أصولها</span>
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-rv-smoke md:text-base">
            من الحبوب إلى الكوب — تجربة إسبريسو احترافية في بيتك.
            <br />
            تحميص طازج يومياً في القاهرة. شحن مجاني لكل محافظات مصر.
          </p>
        </motion.div>

        {/* ── Floating Bags ── */}
        <div className="relative flex w-full max-w-[800px] items-center justify-center gap-4 md:gap-8">
          {/* Smoke behind bags */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute bottom-0 left-1/2 h-40 w-[90%] -translate-x-1/2 rounded-full bg-rv-gold/[0.04] blur-[80px] animate-smoke" />
          </div>

          {/* Bar Intenso — Blue Parrot */}
          <motion.div
            initial={{ opacity: 0, x: -60, y: 40 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            className="relative"
          >
            <div className="animate-levitate">
              <div className="h-[200px] w-[160px] sm:h-[260px] sm:w-[200px] md:h-[340px] md:w-[260px]">
                <img
                  src="/images/intenso-bag.webp"
                  alt="ROVENTO Bar Intenso"
                  className="h-full w-full object-contain bag-shadow"
                />
              </div>
            </div>
            {/* Shadow on floor */}
            <div className="absolute -bottom-4 left-1/2 h-3 w-[70%] -translate-x-1/2 rounded-[50%] bg-white/[0.06] blur-md" />
          </motion.div>

          {/* Center gold divider / splash */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              <div className="size-16 rounded-full bg-rv-gold/10 blur-xl md:size-24" />
              <div className="mt-2 font-display text-xs font-bold text-rv-gold/60 md:text-sm">
                ✦
              </div>
            </motion.div>
          </div>

          {/* Premium — Green Eagle */}
          <motion.div
            initial={{ opacity: 0, x: 60, y: 40 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <div className="animate-levitate-reverse">
              <div className="h-[200px] w-[160px] sm:h-[260px] sm:w-[200px] md:h-[340px] md:w-[260px]">
                <img
                  src="/images/premium-bag.webp"
                  alt="ROVENTO Premium"
                  className="h-full w-full object-contain bag-shadow"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 left-1/2 h-3 w-[70%] -translate-x-1/2 rounded-[50%] bg-white/[0.06] blur-md" />
          </motion.div>
        </div>

        {/* CTA + Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          <button
            onClick={() => {
              add("rovento-bar-intenso-1kg");
              add("rovento-premium-1kg");
            }}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-rv-gold-dark via-rv-gold to-rv-gold-dark px-10 py-4 text-lg font-black text-rv-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(201,168,76,0.3)]"
          >
            <span className="relative z-10 flex items-center gap-3">
              <ShoppingCart className="size-5" />
              اطلب الآن — شحن مجاني
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>

          <div className="rounded-full border border-rv-gold/20 bg-rv-gold/5 px-5 py-2 text-xs font-bold text-rv-gold">
            كود الخصم: <span className="font-mono text-sm">ROVENTO15</span>
          </div>

          <HeroCountdown />
        </motion.div>
      </div>
    </section>
  );
}
