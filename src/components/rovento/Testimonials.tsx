import { motion } from "framer-motion";
import { BadgeCheck, Quote } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { Stars } from "./art";
import { BagVisual } from "./BagVisual";

const REVIEWS = [
  {
    name: "محمد",
    initial: "م",
    city: "من المعادي",
    avatarCls: "bg-pink-500/20 text-pink-400",
    when: "منذ 3 أيام",
    stars: 5,
    text: "جربت البريميوم على الإسبريسو... النتيجة؟ كريمة غنية ونكهة مستحيل أوصفها. ده مش مجرد قهوة، ده فن.",
    img: IMAGES.bags.premium,
    product: "ROVENTO Premium 1KG",
  },
  {
    name: "أحمد",
    initial: "أ",
    city: "من الإسكندرية",
    avatarCls: "bg-blue-500/20 text-blue-400",
    when: "منذ أسبوع",
    stars: 5,
    text: "أول مرة أطلب قهوة أونلاين وألاقي الطعم فعلاً مختلف. التغليف فاخر والتوصيل كان سريع جداً.",
    img: IMAGES.bags.twoPackages,
    product: "Duo Bundle",
  },
  {
    name: "مريم",
    initial: "م",
    city: "من 6 أكتوبر",
    avatarCls: "bg-purple-500/20 text-purple-400",
    when: "منذ أسبوعين",
    stars: 5,
    text: "صممت خلطة 80% عربيكا مع كراميل... النتيجة خرافية. حسيت إنها قهوة صنعت خصيصاً ليا.",
    img: IMAGES.bags.premium,
    product: "Blend Builder — Custom Mix",
  },
];

export function Testimonials() {
  return (
    <section
      id="reviews"
      className="relative overflow-hidden border-b border-rv-brown/10 bg-rv-cream py-16 md:py-20"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-14">
          <span className="text-sm font-bold uppercase tracking-wider text-rv-gold">
            تجارب حقيقية من السوق المصري
          </span>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">
            ماذا يقول            <span className="text-rv-gold">عشاقنا؟</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name + r.city}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-2xl border border-rv-brown/15 bg-white p-5 shadow-md sm:p-6"
            >
              {/* أيقونة اقتباس */}
              <Quote className="absolute start-4 top-4 size-8 text-rv-gold/15" />

              {/* التقييم */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-1 text-rv-gold">
                  <Stars value={r.stars} />
                </div>
                <span className="text-xs text-rv-brown/40">{r.when}</span>
              </div>

              {/* النص */}
              <p className="mb-5 text-base leading-relaxed text-rv-brown/80">
                "{r.text}"
              </p>

              {/* معلومات المشتري */}
              <div className="flex items-center gap-3 border-t border-rv-brown/10 pt-4">
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-full font-black ${r.avatarCls}`}
                >
                  {r.initial}
                </span>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-rv-darkBrown">
                    {r.name} <span className="text-rv-brown/50">{r.city}</span>
                  </h4>
                  <p className="text-xs text-rv-brown/40">عميل موثق</p>
                </div>
                <span className="flex shrink-0 items-center gap-1 rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                  <BadgeCheck className="size-3" />
                  مشتري موثق
                </span>
              </div>

              {/* المنتج اللي اشتراه */}
              <div className="mt-3 flex items-center gap-2.5 rounded-lg border border-rv-brown/10 bg-rv-cream px-3 py-2">
                <div className="grid h-10 w-8 shrink-0 place-items-center rounded border border-rv-brown/15 bg-rv-cream/50">
                  <BagVisual
                    image={r.img}
                    variant="premium"
                    label="ROVENTO"
                    alt={r.name}
                    className="h-8 w-auto"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-rv-brown/40">اشترى</p>
                  <p className="truncate text-[11px] font-bold tracking-wide text-rv-gold">
                    {r.product}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
