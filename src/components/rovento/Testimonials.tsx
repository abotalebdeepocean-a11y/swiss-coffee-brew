import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { Stars } from "./art";
import { BagVisual } from "./BagVisual";

const REVIEWS = [
  {
    name: "مريم",
    initial: "م",
    city: "من الجيزة",
    avatarCls: "bg-pink-500/20 text-pink-400",
    when: "منذ 3 أيام",
    text: "طعم ناعم ومتوازن، ومفيش مرارة نهائي. الكريما أحسن من معظم القهوة المستوردة اللي جربتها قبل كدة!",
    img: IMAGES.bags.premium,
  },
  {
    name: "أحمد",
    initial: "أ",
    city: "من الإسكندرية",
    avatarCls: "bg-blue-500/20 text-blue-400",
    when: "منذ أسبوع",
    text: "البريكا مع حبوب بريميوم طعمها عبقري! زي ما تكون قهوة مختصة من كافيهات القاهرة، وأنا في بيتي في سموحة.",
    img: IMAGES.bags.premium,
  },
  {
    name: "محمد",
    initial: "م",
    city: "من القاهرة",
    avatarCls: "bg-purple-500/20 text-purple-400",
    when: "منذ أسبوعين",
    text: "أفضل كريما جربتها في البيت. عمرى ما هغيّر القهوة عندي — التحميص طازج والتوصيل وصلني تاني يوم.",
    img: IMAGES.bags.classic,
  },
];

export function Testimonials() {
  return (
    <section
      id="reviews"
      className="relative overflow-hidden border-b border-stone-800 bg-coffee-950 py-20"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-rv-gold">
            تجارب حقيقية من السوق المصري
          </span>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">
            ماذا يقول <span className="text-rv-red">عملاؤنا؟</span>
          </h2>
          <p className="mt-3 text-lg text-stone-300">
            العميل المصري يثق في تجارب الناس الحقيقية أكثر من الإعلانات.. إليك
            ما يقوله عملاؤنا بعد تجربة روفينتو.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name + r.city}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-2xl border border-stone-800 bg-coffee-900 p-6 shadow-xl"
            >
              <div className="mb-4 flex items-center gap-1 text-rv-gold">
                <Stars value={5} />
                <span className="ms-auto text-xs text-stone-400">{r.when}</span>
              </div>
              <p className="mb-6 text-base leading-relaxed text-stone-200">
                "{r.text}"
              </p>
              <div className="flex items-center gap-3 border-t border-stone-800 pt-4">
                <span
                  className={`grid size-10 place-items-center rounded-full font-black ${r.avatarCls}`}
                >
                  {r.initial}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {r.name} {r.city}
                  </h4>
                  <p className="text-xs text-stone-400">عميل موثوق</p>
                </div>
                <span className="ms-auto flex items-center gap-1 rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                  <BadgeCheck className="size-3" />
                  مشتري موثق
                </span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="grid h-12 w-10 shrink-0 place-items-center rounded-lg border border-stone-800 bg-stone-950">
                  <BagVisual
                    image={r.img}
                    variant="premium"
                    label="ROVENTO"
                    alt={r.name}
                    className="h-10 w-auto"
                  />
                </div>
                <p className="text-[11px] font-bold tracking-wide text-rv-gold">
                  اشترى: خلطة روفينتو إسبريسو
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
