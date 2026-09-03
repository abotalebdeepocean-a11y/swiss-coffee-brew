import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ─── 3D Coffee Bean SVG ─── */
function CoffeeBean3D({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Shadow */}
      <ellipse cx="30" cy="72" rx="16" ry="5" fill="black" opacity="0.25" />
      {/* Bean body — gradient for 3D depth */}
      <defs>
        <radialGradient id="beanGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#8B6914" />
          <stop offset="40%" stopColor="#5c3a1e" />
          <stop offset="100%" stopColor="#2c1810" />
        </radialGradient>
        <radialGradient id="beanHighlight" cx="35%" cy="25%" r="30%">
          <stop offset="0%" stopColor="white" stopOpacity="0.25" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="30" cy="36" rx="20" ry="30" fill="url(#beanGrad)" />
      {/* Highlight for 3D illusion */}
      <ellipse cx="26" cy="28" rx="10" ry="14" fill="url(#beanHighlight)" />
      {/* Center crease */}
      <path
        d="M30 8 C28 20, 32 30, 30 40 C28 50, 32 60, 30 68"
        stroke="#1a0f08"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      {/* Bottom shadow on bean */}
      <ellipse cx="30" cy="60" rx="16" ry="6" fill="black" opacity="0.15" />
    </svg>
  );
}

/* ─── Shipping Items Data ─── */
const ITEMS = [
  {
    icon: "📦",
    title: "التوصيل",
    desc: "بيوصلك في 2-4 أيام عمل جوه القاهرة والجيزة، ولغاية 5-7 أيام لباقي المحافظات — وكل طلب بيتحمّص طازة قبل الشحن مباشرة، مش مخزّن من زمان.",
  },
  {
    icon: "💳",
    title: "الدفع",
    desc: "الدفع عند الاستلام، أو فودافون كاش / إنستاباي.",
  },
  {
    icon: "🔄",
    title: "الاسترجاع",
    desc: "عندك 14 يوم من تاريخ الاستلام لاسترجاع أو استبدال الطلب من غير أي تعقيد.",
  },
  {
    icon: "✅",
    title: "ضمان الجودة",
    desc: "لو وصلك الكيس متأخر أو فيه عيب في التغليف، بنستبدله فورًا على حسابنا.",
  },
];

/* ─── Main Component ─── */
export function ShippingReturnsBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-8 md:py-12">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-rv-gold/20 bg-rv-darkBrown/[0.15] p-8 backdrop-blur-xl sm:p-10 md:p-14"
        >
          {/* ── Flying Coffee Bean — behind glass ── */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className="animate-flying-bean absolute top-1/2 -translate-y-1/2">
              <CoffeeBean3D className="h-12 w-9 opacity-[0.18] sm:h-16 sm:w-12 md:h-20 md:w-14" />
            </div>
          </div>

          {/* ── Content (above the bean) ── */}
          <div className="relative z-10">
            {/* Title */}
            <div className="mb-8 flex items-center gap-3 md:mb-10">
              <span className="text-2xl">🚚</span>
              <h2 className="text-xl font-black text-rv-darkBrown sm:text-2xl md:text-3xl">
                الشحن والاسترجاع
              </h2>
            </div>

            {/* Items grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {ITEMS.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                  className="flex gap-4"
                >
                  <span className="mt-0.5 shrink-0 text-2xl">{item.icon}</span>
                  <div>
                    <h3 className="mb-1.5 text-sm font-bold text-rv-darkBrown sm:text-base">
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-rv-brown/60 sm:text-sm">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
