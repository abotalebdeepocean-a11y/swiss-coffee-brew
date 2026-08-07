import type { CSSProperties } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowDown, ChevronLeft } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { BagVisual } from "./BagVisual";
import { Bean, Steam, Stars } from "./art";

const STATS = [
  { value: "4.9", label: "تقييم العملاء", en: "RATING" },
  { value: "+12K", label: "عميل سعيد", en: "CUSTOMERS" },
  { value: "48س", label: "شحن لكل مصر", en: "SHIPPING" },
  { value: "طازج", label: "تحميص أسبوعي", en: "FRESH ROAST" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      {/* backdrop */}
      <div className="absolute inset-0 swiss-grid-bg" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 500px at 78% 42%, rgba(208,59,30,0.16), transparent 65%), radial-gradient(700px 420px at 12% 80%, rgba(0,47,167,0.12), transparent 60%)",
        }}
      />
      <div className="absolute -top-32 end-[-180px] size-[480px] rounded-full border border-white/5" />
      <div className="absolute -top-20 end-[-120px] size-[380px] rounded-full border border-white/5" />

      <div className="relative mx-auto grid w-full max-w-[1200px] gap-10 px-4 pb-16 pt-12 md:grid-cols-2 md:gap-6 md:px-6 md:pb-24 md:pt-20 lg:min-h-[86vh] lg:items-center">
        {/* copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-rv-red" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-rv-red">
              ROVENTO · Specialty Coffee Egypt
            </span>
          </div>

          <h1 className="text-4xl font-bold leading-[1.3] text-balance md:text-6xl md:leading-[1.25]">
            مش مجرد قهوة…
            <br />
            <span className="text-rv-red">إدمان بكل معنى الكلمة</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            صُمّمت لكل من يصنع الفرق. حبوب مختارة من قلب مصر، تحميص احترافي
            طازج، ونكهة لا تُنسى — تصل إلى باب بيتك.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/shop"
              className="group inline-flex h-12 items-center gap-2 bg-rv-red px-7 text-sm font-bold text-white transition-all hover:bg-[#b53219]"
            >
              اطلب الآن
              <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            </Link>
            <Link
              to="/#featured"
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  document
                    .getElementById("featured")
                    ?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="inline-flex h-12 items-center gap-2 border border-white/25 px-7 text-sm font-bold text-foreground transition-colors hover:border-rv-red hover:text-rv-red"
            >
              استكشف المنتجات
            </Link>
            <button
              onClick={() =>
                document
                  .getElementById("story")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              شاهد القصة
              <ArrowDown className="size-4 animate-bounce" />
            </button>
          </div>

          <div className="mt-10 grid max-w-md grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.en} className="bg-background px-4 py-3.5">
                <div className="font-display text-lg font-black text-foreground font-wide">
                  {s.value}
                </div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">
                  {s.label}
                </div>
                <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.2em] text-rv-red/80">
                  {s.en}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* bag visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="relative mx-auto flex w-full max-w-md items-center justify-center lg:max-w-none"
        >
          {/* glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(420px 420px at 50% 48%, rgba(201,162,39,0.16), transparent 70%)",
            }}
          />
          <div className="absolute start-4 top-8 size-24 rounded-full border-2 border-dashed border-white/10 animate-spin-slow" />
          <div className="absolute end-8 top-24 size-14 rounded-full border border-rv-blue/40" />

          {/* floating beans */}
          <Bean
            color="#4a3523"
            className="absolute -start-2 top-16 w-16 animate-float svg-center md:start-4"
            style={{ "--rot": "-12deg" } as CSSProperties}
          />
          <Bean
            color="#332418"
            className="absolute bottom-24 start-2 w-10 animate-float-slow svg-center"
            style={{ "--rot": "24deg" } as CSSProperties}
          />
          <Bean
            color="#5d4430"
            className="absolute end-2 top-10 w-12 animate-float svg-center"
            style={{ "--rot": "16deg", animationDelay: "1.4s" } as CSSProperties}
          />
          <Bean
            color="#241a10"
            className="absolute bottom-10 end-10 w-14 animate-float-slow svg-center"
            style={{ "--rot": "-20deg", animationDelay: "0.8s" } as CSSProperties}
          />

          {/* steam */}
          <Steam className="absolute left-[16%] top-6 h-40 w-16 opacity-80" delay={0} />
          <Steam className="absolute right-[22%] top-0 h-48 w-16 opacity-70" delay={1.6} />
          <Steam className="absolute left-[30%] top-2 h-36 w-12 opacity-60" delay={3.1} />

          {/* the bag */}
          <div className="relative drop-shadow-[0_40px_80px_rgba(0,0,0,0.55)]">
            <BagVisual
              image={IMAGES.heroBag}
              variant="premium"
              eager
              alt="ROVENTO MISH Premium Blend"
              className="h-[420px] w-auto animate-float-slow svg-center md:h-[520px]"
              style={{ "--rot": "-1.5deg" } as CSSProperties}
            />
          </div>

          {/* floating rating chip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="absolute bottom-6 start-0 flex items-center gap-3 border border-white/10 bg-background/90 px-4 py-3 backdrop-blur"
          >
            <Stars value={5} />
            <div className="text-start">
              <div className="font-display text-base font-black font-wide">4.9/5</div>
              <div className="text-[10px] text-muted-foreground">
                +1,200 تقييم موثّق
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
