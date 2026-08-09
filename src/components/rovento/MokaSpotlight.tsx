import { Link } from "react-router";
import { motion } from "framer-motion";
import { Flame, Coffee, ShieldCheck, Truck, ChevronLeft } from "lucide-react";
import { getProduct, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/store";
import { IMAGES } from "@/lib/images";
import { SectionHeading } from "./Section";

const PERKS = [
  { icon: Coffee, label: "إسبريسو أصيل على الموقد" },
  { icon: Flame, label: "قوام غني وكريما كثيفة" },
  { icon: ShieldCheck, label: "منتجات أصلية 100%" },
  { icon: Truck, label: "شحن لكل مصر" },
];

export function MokaSpotlight() {
  const { add } = useCart();
  const moka = getProduct("machine-moka");

  return (
    <section id="moka" className="relative overflow-hidden border-b border-white/10 py-20 md:py-28">
      {/* backdrop */}
      <div className="absolute inset-0 swiss-grid-bg" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(800px 480px at 75% 40%, rgba(201,162,39,0.14), transparent 65%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <SectionHeading
          index="02"
          kicker="Bialetti × ROVENTO"
          title={
            <>
              موكا بوت <span className="text-rv-gold">BIALETTI</span> بريكا — عرض لفترة محدودة
            </>
          }
          desc="عندما يلتقي الإتقان بالإبداع: الموكا بوت الأصلية من Bialetti مع حبوب روفينتو بريميم — تجربة إسبريسو لا تُنسى في بيتك."
        />

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-6">
          {/* product shot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(420px 420px at 50% 50%, rgba(201,162,39,0.18), transparent 70%)",
              }}
            />
            <img
              src={`${IMAGES.machines.moka}.jpg`}
              alt="موكا بوت Bialetti بريكا الأصلية"
              loading="lazy"
              className="relative mx-auto h-72 w-auto object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.55)] md:h-96"
            />
            {/* floating discount badge */}
            <motion.div
              initial={{ opacity: 0, rotate: -8 }}
              whileInView={{ opacity: 1, rotate: -8 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="absolute end-4 top-6 grid size-24 place-items-center rounded-full border-2 border-rv-gold bg-background text-center"
            >
              <span>
                <span className="block font-display text-xl font-black text-rv-gold font-wide">
                  25%
                </span>
                <span className="block font-mono text-[9px] tracking-widest text-foreground">
                  خصم
                </span>
              </span>
            </motion.div>
          </motion.div>

          {/* offer copy */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="border border-rv-gold/30 bg-background/90 p-7 backdrop-blur md:p-9">
              <div className="flex items-center justify-between">
                <span className="border border-rv-red/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-rv-red">
                  عرض لفترة محدودة
                </span>
                <span className="font-mono text-[10px] tracking-[0.28em] text-muted-foreground">
                  BIALETTI BRIKKA
                </span>
              </div>

              <h3 className="mt-5 text-2xl font-bold leading-snug md:text-3xl">
                موكا بوت بريكا الأصلية
                <span className="mt-1 block text-base font-semibold text-muted-foreground">
                  + حبوب روفينتو بريميم 1 كجم
                </span>
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                الموقد يفصل الحبة عن الكوب بدقائق — كريما ذهبية، عطر عميق،
                وطعم إسبريسو إيطالي أصيل بلا كهرباء. ومعه كيس بريميم 1 كجم
                محمص طازج ليكمل التجربة.
              </p>

              <div className="mt-6 flex items-end gap-3">
                <span className="font-display text-4xl font-black text-rv-gold font-wide">
                  {formatPrice(2999)}
                </span>
                <span className="pb-1.5 text-lg text-muted-foreground line-through">
                  {formatPrice(3999)}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {PERKS.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-center gap-2 border border-white/10 px-3 py-2.5 text-[11px] text-muted-foreground"
                  >
                    <f.icon className="size-4 shrink-0 text-rv-gold" />
                    {f.label}
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    if (moka) add(moka.slug);
                  }}
                  className="inline-flex h-12 items-center gap-2 bg-rv-red px-8 text-sm font-bold text-white transition-colors hover:bg-[#b53219]"
                >
                  اطلب الآن قبل نفاذ الكمية
                  <ChevronLeft className="size-4" />
                </button>
                <Link
                  to="/shop?category=machines"
                  className="inline-flex h-12 items-center border border-white/25 px-6 text-sm font-semibold transition-colors hover:border-rv-gold hover:text-rv-gold"
                >
                  كل الماكينات
                </Link>
              </div>

              <p className="mt-4 font-mono text-[10px] tracking-widest text-rv-gold/70">
                خصم 25% لفترة محدودة · الكمية محدودة
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
