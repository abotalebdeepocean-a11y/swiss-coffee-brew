import { Star, Coffee, Truck, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const TRUST = [
  { icon: Star, value: "4.9/5", label: "تقييم العملاء" },
  { icon: Coffee, value: "+5,000 كجم", label: "تم بيعها" },
  { icon: Truck, value: "شحن لكل مصر", label: "كل المحافظات" },
  { icon: ShieldCheck, value: "دفع آمن", label: "كاش / فودافون كاش / إنستاباي" },
];

export function TrustBar() {
  return (
    <section className="border-b border-white/10 bg-[#0d0c0a]">
      <div className="mx-auto grid w-full max-w-[1200px] gap-px border-x border-white/10 bg-white/10 px-4 sm:grid-cols-2 md:grid-cols-4 md:px-6">
        {TRUST.map((t, i) => (
          <motion.div
            key={t.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="flex items-center gap-4 bg-[#0d0c0a] px-4 py-6"
          >
            <span className="grid size-12 shrink-0 place-items-center border border-rv-gold/30 text-rv-gold">
              <t.icon className="size-5" />
            </span>
            <div>
              <p className="font-display text-base font-black font-wide">
                {t.value}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{t.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
