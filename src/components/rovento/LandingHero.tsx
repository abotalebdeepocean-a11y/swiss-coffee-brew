import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/store";
import { RoventoMark } from "./RoventoMark";

export function LandingHero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const { add } = useCart();

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-[#0a0a0a] pb-20 pt-24"
    >
      {/* Espresso-layer cinematic background — dark crema bands from bottom */}
      <div className="pointer-events-none absolute inset-0">
        {/* Single dramatic light source — top center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(201,168,76,0.10)_0%,transparent_55%)]" />
        {/* Espresso layer — deep crema band at the bottom */}
        <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-[#3e2318]/70 via-[#3e2318]/25 to-transparent" />
        {/* Crema highlight — thin gold line where espresso meets dark */}
        <div className="absolute inset-x-0 bottom-[36%] h-px bg-gradient-to-r from-transparent via-[#c9a84c]/25 to-transparent" />
        {/* Second espresso layer — darker, below */}
        <div className="absolute inset-x-0 bottom-0 h-[16%] bg-gradient-to-t from-[#1a0f08] to-transparent" />
      </div>
      <div className="rv-noise pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-center gap-12 px-4 md:flex-row md:items-center md:px-6">
        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex-1 text-center md:text-right"
        >
          <div className="mb-6 flex justify-center md:justify-end">
            <RoventoMark size={56} />
          </div>

          <h1 className="mb-4 text-3xl font-black leading-tight md:text-5xl lg:text-6xl">
            <span className="gold-gradient-text">إسبريسو يستاهل الاسم</span>
          </h1>

          <p className="mx-auto mb-10 max-w-[420px] text-base leading-relaxed text-[#b0a898] md:mx-0 md:text-lg">
            قهوة بتتحمص طازة عشانك، مش مخزّنة من زمان
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row md:justify-end">
            <button
              onClick={() => add("rovento-bar-intenso-1kg")}
              className="rv-btn group flex items-center gap-3 rounded-xl bg-[#c9a84c] px-8 py-4 text-base font-black text-[#0a0a0a] shadow-lg shadow-[#c9a84c]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e0c872] hover:shadow-[#c9a84c]/30"
            >
              <ShoppingCart className="size-5" />
              اطلب بار إنتنسو
            </button>
            <button
              onClick={() => add("rovento-premium-1kg")}
              className="rv-btn flex items-center gap-3 rounded-xl border-2 border-[#c9a84c]/40 px-8 py-4 text-base font-black text-[#c9a84c] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c9a84c] hover:bg-[#c9a84c]/10"
            >
              <ShoppingCart className="size-5" />
              اطلب بريميوم
            </button>
          </div>
        </motion.div>

        {/* Product bags side */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="relative flex flex-1 items-center justify-center gap-4 md:gap-6"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,168,76,0.08)_0%,transparent_70%)]" />
          <div className="animate-levitate relative z-10">
            <img
              src="/images/intenso-bag.webp"
              alt="ROVENTO Bar Intenso"
              className="h-[240px] w-[180px] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)] sm:h-[300px] sm:w-[220px] md:h-[360px] md:w-[260px]"
            />
          </div>
          <div className="animate-levitate-reverse relative z-10">
            <img
              src="/images/premium-bag.webp"
              alt="ROVENTO Premium"
              className="h-[240px] w-[180px] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)] sm:h-[300px] sm:w-[220px] md:h-[360px] md:w-[260px]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
