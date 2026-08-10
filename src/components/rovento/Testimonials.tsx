import { motion } from "framer-motion";
import { BadgeCheck, Quote } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { Stars } from "./art";
import { BagVisual } from "./BagVisual";
import { SectionHeading } from "./Section";

const REVIEWS = [
  {
    name: "أحمد سامي",
    city: "القاهرة — مدينة نصر",
    text: "الكريما أحسن من معظم القهوة المستوردة اللي جربتها. بريميم بليند بقى طقس الصبح بتاعي، والتغليف نفسه تحفة.",
    product: "بريميم بليند",
    img: IMAGES.bags.premium,
  },
  {
    name: "سارة محمود",
    city: "الإسكندرية",
    text: "البريكا مع روفينتو غيرت روتين الصبح عندي — كوب إسبريسو أصيل في البيت من غير ماكينة غالية.",
    product: "موكا بوت بريكا + بريميم",
    img: IMAGES.bags.premium,
  },
  {
    name: "عمر خالد",
    city: "الجيزة — الشيخ زايد",
    text: "جربت كذا محمصة في مصر، روفينتو مختلف: ثبات في الجودة من أول كيس للخامس. والاشتراك الشهري وفّر عليّ كتير.",
    product: "اشتراك شهري",
    img: IMAGES.bags.classic,
  },
];

export function Testimonials() {
  return (
    <section id="reviews" className="border-b border-white/10 py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <SectionHeading
          index="08"
          kicker="Social Proof"
          title={
            <>
              قالوا عن <span className="text-rv-red">روفينتو</span>
            </>
          }
          desc="المصري يثق في الناس أكتر من الإعلان — دي تجارب حقيقية لعملاء طلبوا فعلاً."
        />

        <div className="grid gap-6 lg:grid-cols-4">
          {/* summary card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-between bg-rv-red p-7 text-white"
          >
            <div>
              <p className="font-display text-6xl font-black leading-none font-wide">
                4.9
              </p>
              <Stars value={5} className="mt-4" />
              <p className="mt-3 text-sm leading-relaxed text-white/85">
                متوسط تقييم +1,200 عميل في مصر
              </p>
              <p className="mt-2 text-xs text-white/70">
                ☕ أكثر من 5,000 كجم تم بيعها
              </p>
            </div>
            <div className="mt-8 font-mono text-[10px] uppercase tracking-[0.28em] text-white/70">
              Verified Reviews · 2026
            </div>
          </motion.div>

          {/* quotes */}
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <motion.figure
                key={r.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col border border-white/10 bg-card p-6"
              >
                <div className="flex items-center justify-between">
                  <Stars value={5} />
                  <Quote className="size-5 text-rv-red/50" />
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                  {r.text}
                </blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center bg-rv-ink font-display text-sm font-black text-rv-red">
                      {r.name.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm font-bold">{r.name}</p>
                      <p className="text-[11px] text-muted-foreground">{r.city}</p>
                    </div>
                    <span className="ms-auto flex items-center gap-1 font-mono text-[9px] text-emerald-400">
                      <BadgeCheck className="size-3.5" />
                      مشتري موثّق
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="grid h-12 w-10 shrink-0 place-items-center border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent">
                      <BagVisual
                        image={r.img}
                        variant="premium"
                        label="ROVENTO"
                        alt={r.product}
                        className="h-10 w-auto"
                      />
                    </div>
                    <p className="font-mono text-[10px] tracking-widest text-rv-gold">
                      اشترى: {r.product}
                    </p>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
