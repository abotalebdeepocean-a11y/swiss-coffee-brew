import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Truck, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/store";
import {
  FREE_SHIPPING_START,
  FREE_SHIPPING_END,
  TWO_KG_DISCOUNT_RATE,
  formatArabicDate,
} from "@/lib/offer";

/* Transparent olive grove background — SVG with subtle parallax via CSS */
function OliveGroveBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Deep black base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, #0d1509 0%, #0a0a0a 55%, #050505 100%)",
        }}
      />
      {/* Sun shafts through olive canopy */}
      <div className="absolute inset-0 opacity-[0.35] mix-blend-overlay">
        <div className="absolute bottom-0 left-[12%] right-[12%] h-1/2 bg-gradient-to-t from-[#c9a84c]/[0.10] to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-[30%] right-[8%] h-1/3 bg-gradient-to-t from-[#c9a84c]/[0.06] to-transparent blur-3xl opacity-70" />
      </div>
      {/* Golden leaf specks drifting */}
      <div className="absolute inset-0">
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className="absolute size-1.5 rounded-full bg-[#c9a84c]/40"
            style={{
              left: `${(i * 7.3 + 6) % 100}%`,
              top: `${((i * 13 + 20) % 60) + 20}%`,
              animation: `oliveDrift ${8 + (i % 6)}s ease-in-out ${i % 2 === 0 ? "" : "reverse"} infinite`,
              animationDelay: `${0.3 * i}s`,
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>
      {/* Olive tree silhouettes — painted, not clip-art */}
      <svg
        viewBox="0 0 1200 700"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-30"
        style={{ mixBlendMode: "screen", transform: "translateY(30px)" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="oliveGrad" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.35" />
            <stop offset="40%" stopColor="#7a5a1e" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Tree 1 — left */}
        <g transform="translate(180 520) scale(1.4)">
          <path
            d="M0 -40 Q-24 -110, -8 -180 Q2 -220, 14 -260 Q22 -300, 0 -360 Q-18 -300, -22 -260 Q-30 -220, -22 -180 Q-30 -110, 0 -40 Z"
            fill="url(#oliveGrad)"
          />
          <rect x="-2" y="-48" width="4" height="60" fill="#1a0f08" opacity="0.95" />
        </g>
        {/* Tree 2 — right, slightly behind */}
        <g transform="translate(980 500) scale(1.1)">
          <path
            d="M0 -30 Q-20 -90, -6 -150 Q0 -180, 10 -210 Q16 -240, 0 -290 Q-14 -240, -19 -210 Q-24 -180, -19 -150 Q-26 -90, 0 -30 Z"
            fill="url(#oliveGrad)"
            opacity="0.85"
          />
          <rect x="-2" y="-38" width="4" height="46" fill="#1a0f08" opacity="0.9" />
        </g>
        {/* Tree 3 — far right fainter */}
        <g transform="translate(1110 540) scale(0.8)" opacity="0.6">
          <path
            d="M0 -24 Q-14 -70, -4 -120 Q0 -150, 8 -175 Q13 -200, 0 -240 Q-11 -200, -14 -175 Q-17 -150, -14 -120 Q-18 -70, 0 -24 Z"
            fill="url(#oliveGrad)"
          />
          <rect x="-1.5" y="-30" width="3" height="40" fill="#1a0f08" opacity="0.9" />
        </g>
        {/* Tree 4 — center-left, behind the bags */}
        <g transform="translate(480 560) scale(0.7)" opacity="0.55">
          <path
            d="M0 -20 Q-12 -55, -3 -95 Q0 -120, 7 -140 Q11 -160, 0 -195 Q-9 -160, -11 -140 Q-13 -120, -11 -95 Q-14 -55, 0 -20 Z"
            fill="url(#oliveGrad)"
          />
          <rect x="-1.5" y="-24" width="3" height="32" fill="#1a0f08" opacity="0.9" />
        </g>
        {/* Shiny olives — small specular dots */}
        <g fill="#e0c872">
          <circle cx="174" cy="310" r="1.6" opacity="0.95" />
          <circle cx="188" cy="326" r="1.4" opacity="0.85" />
          <circle cx="166" cy="338" r="1.5" opacity="0.9" />
          <circle cx="984" cy="320" r="1.4" opacity="0.8" />
          <circle cx="998" cy="338" r="1.3" opacity="0.7" />
          <circle cx="478" cy="380" r="1.2" opacity="0.6" />
          <circle cx="490" cy="400" r="1.1" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
}

/* Neon ring — rotating border glow around the glass rectangle */
function NeonRing({ className }: { className?: string }) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        mask: "linear-gradient(#000 0 0) content-box, #000 0 0",
        WebkitMask: "linear-gradient(#000 0 0) content-box, #000 0 0",
        maskComposite: "exclude",
        WebkitMaskComposite: "xor",
        border: "2px solid transparent",
        padding: "2px",
        background:
          "conic-gradient(from 0deg, #c9a84c, #e0c872 20%, #c9a84c 40%, rgba(201,168,76,0.25) 60%, rgba(201,168,76,0.35) 80%, #c9a84c 100%)",
        animation: "neonSpin 4.5s linear infinite",
        boxShadow: "0 0 14px rgba(201,168,76,0.55), 0 0 30px rgba(224,200,114,0.18)",
      }}
    />
  );
}

/* Yellow 10% badge — above the Intenso bag */
function DiscountBadge() {
  return (
    <div className="absolute -top-3 right-1 z-30 md:-top-4 md:right-1">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="group relative"
      >
        {/* Soft glow beneath badge */}
        <div className="absolute -inset-3 rounded-full bg-[#c9a84c]/[0.18] blur-xl group-hover:bg-[#e0c872]/[0.25] group-hover:scale-110 transition-all duration-500" />
        <div className="relative grid size-20 place-items-center rounded-full bg-[#f5c511] px-1 py-0.5 shadow-[0_0_22px_rgba(245,197,17,0.6)] md:size-24">
          <p className="text-center text-[11px] font-black leading-none text-[#1a0f08] md:text-[12px]">
            خصم
          </p>
          <p className="text-center text-2xl font-black leading-none text-[#1a0f0a] md:text-3xl">
            10%
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/** Offer banner — redesigned as a luxury glass rectangle with rotating neon border.
 *
 * Official campaign: "اشترِ 2 كيس ووفّر أكتر" + خصم 10% over the Intenso bag.
 * Background: transparent olive grove over a deep black base.
 */
export function OfferBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const { add } = useCart();

  const handleBundle = () => {
    add("rovento-bar-intenso-1kg", 1);
    add("rovento-premium-1kg", 1);
  };

  return (
    <section ref={ref} className="relative bg-[#050505] py-14 md:py-20 overflow-hidden">
      {/* Olive grove backdrop */}
      <OliveGroveBackground />

      {/* Reusable prefix/suffix for page tint consistency */}
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative flex items-stretch md:max-w-[980px]"
        >
          {/* The glass rectangle — neon ring wrapped via a wrapper */}
          <div
            className="group relative flex size-full flex-col md:flex-row md:items-center md:justify-between md:gap-10 md:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(17,17,17,0.96) 0%, rgba(26,15,8,0.92) 60%, rgba(17,17,17,0.96) 100%)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            {/* Neon ring — sits on top of the rectangle's border */}
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{ zIndex: 2 }}
            >
              <NeonRing
                className="pointer-events-none absolute inset-0 rounded-2xl"
              />
            </div>

            {/* Subtle inner glass sheen */}
            <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl bg-gradient-to-br from-white/[0.04] via-transparent to-transparent opacity-60" />

            {/* Content layer */}
            <div className="relative z-[3] flex flex-1 flex-col md:items-center">
              {/* ─── Text side ─── */}
              <div className="flex w-full flex-col justify-center md:block md:w-auto md:pr-8">
                {/* Free-shipping pill */}
                <div className="mb-5 flex items-center justify-center md:justify-start gap-2.5 rounded-xl border border-[#c9a84c]/30 bg-[#0a0a0a]/90 px-4 py-2.5 shadow-inner">
                  <Truck className="size-4 text-[#c9a84c]" />
                  <span className="text-sm font-black text-[#f5efe6]">شحن مجاني</span>
                </div>

                <h2 className="mb-3 text-2xl font-black leading-snug md:text-4xl">
                  <span className="text-[#f5efe6]">اشترِ كيسين </span>
                  <span className="gold-gradient-text">ووفّر أكتر</span>
                </h2>

                <p className="mb-2 text-sm leading-relaxed text-[#b0a898]">
                  خصم {TWO_KG_DISCOUNT_RATE * 100}% فوري على أي بلندَين —
                  بيتحسب تلقائيًا في السلة، بدون كود
                </p>

                <p className="mb-7 text-xs text-[#888888]">
                  شحن مجاني من {formatArabicDate(FREE_SHIPPING_START)} إلى{" "}
                  {formatArabicDate(FREE_SHIPPING_END)}
                </p>

                <button
                  onClick={handleBundle}
                  className="rv-btn inline-flex items-center gap-2.5 rounded-xl bg-[#c9a84c] px-7 py-3.5 text-sm font-black text-[#0a0a0a] shadow-lg shadow-[#c9a84c]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e0c872] hover:shadow-[0_0_24px_rgba(201,168,76,0.35)]"
                >
                  <ShoppingCart className="size-4" />
                  اشترِ الاتنين ووفّر
                </button>
              </div>

              {/* ─── Bags side ─── */}
              <div className="relative mt-8 flex items-end justify-center md:mt-0 md:w-[240px] md:justify-end md:pl-6">
                {/* Glow halo under bags */}
                <div className="absolute -bottom-4 left-1/2 h-14 w-[200px] -translate-x-1/2 rounded-full bg-[#c9a84c]/[0.12] blur-3xl" />

                {/* Discount badge 10% — above Intenso, rotating */}
                <DiscountBadge />

                {/* Arrow from badge → boxes (campaign): down-left curve */}
                <svg
                  viewBox="0 0 100 90"
                  className="pointer-events-none absolute bottom-2 left-14 z-10 w-14 rotate-[155deg] md:left-20 md:w-16 md:rotate-[158deg]"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M50 8 C58 30, 52 55, 42 74"
                    stroke="#f5c511"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  <path
                    d="M28 58 L42 78 L56 60"
                    stroke="#f5c511"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>

                {/* Intenso bag — on the right from camera (RTL: left) */}
                <div className="animate-levitate">
                  <img
                    src="/images/intenso-bag.webp"
                    alt="ROVENTO بار إنتنسو"
                    className="h-[100px] w-auto object-contain drop-shadow-[0_18px_26px_rgba(0,0,0,0.7)] md:h-[130px]"
                  />
                </div>
                {/* Premium bag */}
                <div className="animate-levitate-reverse">
                  <img
                    src="/images/premium-bag.webp"
                    alt="ROVENTO بريميوم"
                    className="h-[100px] w-auto object-contain drop-shadow-[0_18px_26px_rgba(0,0,0,0.7)] md:h-[130px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
