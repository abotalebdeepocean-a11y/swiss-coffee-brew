import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function EmotionalHook() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#0a0a0a] py-24 md:py-32"
    >
      {/* Subtle gold radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,168,76,0.04)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-[800px] px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Steaming espresso cup */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              {/* Steam lines */}
              <svg
                viewBox="0 0 60 40"
                className="absolute -top-8 left-1/2 h-8 w-15 -translate-x-1/2 opacity-40"
                aria-hidden="true"
              >
                <path
                  d="M15 35 C15 25, 20 20, 18 10 C16 0, 22 -5, 20 5"
                  fill="none"
                  stroke="#c9a84c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.5"
                />
                <path
                  d="M30 35 C30 22, 35 18, 33 8 C31 -2, 37 -7, 35 3"
                  fill="none"
                  stroke="#c9a84c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.7"
                />
                <path
                  d="M45 35 C45 25, 40 20, 42 10 C44 0, 38 -5, 40 5"
                  fill="none"
                  stroke="#c9a84c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </svg>

              {/* Cup SVG */}
              <svg
                viewBox="0 0 80 60"
                className="h-14 w-20 md:h-16 md:w-24"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="cup-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#c9a84c" />
                    <stop offset="100%" stopColor="#7a6020" />
                  </linearGradient>
                </defs>
                {/* Cup body */}
                <rect x="10" y="10" width="48" height="40" rx="4" fill="url(#cup-grad)" />
                {/* Coffee surface */}
                <ellipse cx="34" cy="18" rx="18" ry="5" fill="#3e2318" />
                {/* Handle */}
                <path
                  d="M58 18 C68 18, 72 28, 68 36 C65 40, 58 38, 58 32"
                  fill="none"
                  stroke="#c9a84c"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* Saucer */}
                <ellipse cx="34" cy="52" rx="30" ry="6" fill="#c9a84c" opacity="0.3" />
              </svg>
            </div>
          </div>

          {/* Emotional text */}
          <h2 className="text-2xl font-black leading-relaxed text-[#f5efe6] md:text-4xl lg:text-5xl">
            مش محتاجة كيف..
            <br />
            <span className="gold-gradient-text">محتاجة روفينتو</span>
          </h2>

          {/* Ornamental divider */}
          <div className="rv-divider mt-8">
            <span className="text-xs text-[#c9a84c]/40">◆</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
