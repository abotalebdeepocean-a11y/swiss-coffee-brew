import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface FlavorAxis {
  label: string;
  intenso: number;
  premium: number;
}

const AXES: FlavorAxis[] = [
  { label: "الجسم", intenso: 9, premium: 9 },
  { label: "الكريما", intenso: 9, premium: 8 },
  { label: "الروائح", intenso: 7, premium: 7 },
  { label: "الحلاوة", intenso: 4, premium: 5 },
  { label: "الحموضة", intenso: 3, premium: 4 },
  { label: "المرارة", intenso: 8, premium: 5 },
  { label: "النكهة الختامية", intenso: 8, premium: 8 },
];

function Bar({
  label,
  value,
  delay,
}: {
  label: string;
  value: number;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex items-center gap-3">
      <span className="w-24 shrink-0 text-right text-xs font-bold text-[#b0a898] sm:w-28 sm:text-sm">
        {label}
      </span>
      <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value * 10}%` } : {}}
          transition={{ duration: 0.8, delay: delay, ease: "easeOut" }}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, #a08030 0%, #c9a84c 60%, #e0c872 100%)",
          }}
        />
      </div>
      <span className="w-6 text-center text-xs font-mono font-bold text-[#888888]">
        {value}
      </span>
    </div>
  );
}

export function FlavorProfile() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative bg-[#0a0a0a] py-20 md:py-28">
      <div className="mx-auto max-w-[900px] px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 flex justify-center">
            <img
              src="/images/rovento-logo-real.webp"
              alt="ROVENTO"
              className="h-14 w-auto"
            />
          </div>
          <h2 className="mb-3 text-2xl font-black md:text-3xl">
            <span className="gold-gradient-text">تفاصيل النكهة</span>
          </h2>
          <p className="text-sm text-[#888888]">
            الملف التذوقي لكل بلند — بنفس مواصفات الكيس
          </p>
          <div className="rv-divider mt-4">
            <span className="text-xs text-[#c9a84c]/40">◆</span>
          </div>
        </motion.div>

        {/* Two columns */}
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          {/* Bar Intenso */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#111111] p-6">
            <div className="mb-1 text-center">
              <p className="font-condensed text-xs tracking-[0.3em] text-[#888888] uppercase">
                Bar Intenso
              </p>
              <h3 className="text-lg font-black text-[#f5efe6]">بار إنتنسو</h3>
            </div>
            <div className="rv-divider mb-5">
              <span className="text-[10px] text-[#c9a84c]/30">◆</span>
            </div>
            <div className="space-y-3">
              {AXES.map((axis, i) => (
                <Bar
                  key={axis.label}
                  label={axis.label}
                  value={axis.intenso}
                  delay={i * 0.08}
                />
              ))}
            </div>
          </div>

          {/* Premium */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#111111] p-6">
            <div className="mb-1 text-center">
              <p className="font-condensed text-xs tracking-[0.3em] text-[#888888] uppercase">
                Premium
              </p>
              <h3 className="text-lg font-black text-[#f5efe6]">بريميوم</h3>
            </div>
            <div className="rv-divider mb-5">
              <span className="text-[10px] text-[#c9a84c]/30">◆</span>
            </div>
            <div className="space-y-3">
              {AXES.map((axis, i) => (
                <Bar
                  key={axis.label}
                  label={axis.label}
                  value={axis.premium}
                  delay={i * 0.08}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
