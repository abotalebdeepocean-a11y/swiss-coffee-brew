import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-coffee-950"
        >
          {/* Radial glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-[300px] w-[300px] rounded-full bg-rv-gold/5 blur-[100px]" />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            <img
              src="/images/rovento-logo.webp"
              alt="ROVENTO"
              className="h-20 w-auto md:h-28"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const span = document.createElement("span");
                  span.className =
                    "text-4xl md:text-5xl font-black tracking-[0.2em] text-rv-gold";
                  span.textContent = "ROVENTO";
                  parent.appendChild(span);
                }
              }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative z-10 mt-4 text-xs tracking-[0.3em] text-stone-500"
          >
            عصارة قهوة خالصة
          </motion.p>

          {/* Loading bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ delay: 0.3, duration: 1.8, ease: "easeInOut" }}
            className="relative z-10 mt-6 h-[2px] rounded-full bg-rv-gold/60"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
