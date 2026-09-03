import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function IdentityProof() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-rv-black py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rv-gold/[0.03] blur-[200px]" />
      </div>

      <div ref={ref} className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.3em] text-rv-gold/60">
            Brand Identity
          </span>
          <h2 className="font-display text-2xl font-black text-white md:text-4xl">
            هوية واحدة — <span className="gold-gradient-text">جودة واحدة</span>
            <br />
            تجربتان مختلفتان
          </h2>
          <div className="mx-auto mt-4 h-[2px] w-16 bg-gradient-to-r from-transparent via-rv-gold to-transparent" />
        </motion.div>

        {/* Three identity pillars */}
        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {[
            {
              title: "الختم الدائري",
              titleEn: "Circular Logo",
              desc: "نفس الشعار الذهبي الدائري على الكيسين — رأس النسر والحرف R م統一",
              img: "/images/intenso-bar-real.webp",
            },
            {
              title: "الشريط الذهبي",
              titleEn: "Gold Seal",
              desc: "نفس ختم الجودة الذهبي في الأعلى — علامة المصداقية",
              img: "/images/premium-eagle-real.webp",
            },
            {
              title: "QR Code",
              titleEn: "Authenticity",
              desc: "نفس رمز QR على الكيسين للتحقق من الأصالة",
              img: "/images/intenso-bar-real.webp",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="group flex flex-col items-center rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center transition-all duration-500 hover:border-rv-gold/20 hover:bg-white/[0.04]"
            >
              {/* Zoomed bag crop */}
              <div className="mb-6 flex size-24 items-center justify-center overflow-hidden rounded-full border border-rv-gold/20 bg-rv-gold/5">
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-[120px] w-[120px] object-cover object-top opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
              <h3 className="font-condensed text-lg font-bold tracking-wider text-white">
                {item.title}
              </h3>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-rv-gold/50">
                {item.titleEn}
              </p>
              <p className="text-sm leading-relaxed text-rv-smoke">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
