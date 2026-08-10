import type { CSSProperties } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowDown, ChevronLeft, Flame, Truck } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { BagVisual } from "./BagVisual";
import { Bean, Steam, Stars } from "./art";
import { formatPrice } from "@/lib/products";

const STATS = [
  { value: "4.9", label: "تقييم العملاء", en: "RATING" },
  { value: "+12K", label: "عميل سعيد", en: "CUSTOMERS" },
  { value: "48س", label: "شحن لكل مصر", en: "SHIPPING" },
  { value: "طازج", label: "تحميص أسبوعي", en: "FRESH ROAST" },
];

const VALUES = [
  { ar: "تركيز", en: "FOCUS" },
  { ar: "طاقة", en: "ENERGY" },
  { ar: "وضوح", en: "CLARITY" },
  { ar: "شغف", en: "PASSION" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      {/* backdrop — دافئ ذهبي + لمسة حمراء لهوية ROVENTO */}
      <div className="absolute inset-0 swiss-grid-bg" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1000px 560px at 75% 28%, rgba(201,162,39,0.15), transparent 62%), radial-gradient(820px 480px at 8% 88%, rgba(208,59,30,0.14), transparent 60%)",
        }}
      />
      <div className="absolute -top-32 end-[-180px] size-[480px] rounded-full border border-rv-gold/10" />
      <div className="absolute -top-20 end-[-120px] size-[380px] rounded-full border border-rv-gold/10" />

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
            <span className="text-rv-red">دي عصارة قهوة خالصة.</span>
          </h1>

          {/* دليل اجتماعي تحت العنوان مباشرة */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Stars value={5} />
            <span className="text-sm font-bold text-foreground">
              +500 عميل في مصر
            </span>
            <span className="h-4 w-px bg-white/15" />
            <span className="text-sm text-muted-foreground">تقييم 4.9/5</span>
          </div>

          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            حبوب إسبريسو محمصة بعناية لعشاق الكريما الغنية والطعم المتوازن —
            توصلك طازجة حتى باب بيتك في كل محافظات مصر.
          </p>

          {/* القيم الأربع — نفس شعار العلامة الحقيقي */}
          <div className="mt-7 grid max-w-md grid-cols-4 gap-px border border-white/10 bg-white/10">
            {VALUES.map((v) => (
              <div key={v.en} className="bg-background px-2 py-3 text-center">
                <div className="text-sm font-bold">{v.ar}</div>
                <div className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-rv-red/80">
                  {v.en}
                </div>
              </div>
            ))}
          </div>

          {/* لماذا تشتري منا — في أول شاشة */}
          <div className="mt-5 flex max-w-md flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Flame className="size-3.5 text-rv-red" />
              تحميص طازج أسبوعيًا
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="size-3.5 text-rv-red" />
              شحن 48 ساعة لكل مصر
            </span>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
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
              className="inline-flex h-12 items-center gap-2 border border-white/25 bg-black/30 px-7 text-sm font-bold text-foreground transition-colors hover:border-rv-red hover:text-rv-red"
            >
              شاهد المنتجات
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

          {/* السعر — نقطة البيع الأولى */}
          <p className="mt-5 max-w-md border border-rv-gold/25 bg-rv-gold/5 px-4 py-3 text-sm text-muted-foreground">
            ابتداءً من{" "}
            <span className="font-display text-lg font-black text-rv-gold font-wide">
              {formatPrice(285)}
            </span>{" "}
            — كوب إسبريسو غني بالكريما من أول تجربة
          </p>

          <div className="mt-8 grid max-w-md grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-4">
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

        {/* كيس المنتج — عرض فخم بإطار ذهبي */}
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
                "radial-gradient(460px 460px at 50% 48%, rgba(201,162,39,0.2), transparent 70%)",
            }}
          />
          <div className="absolute start-4 top-8 size-24 rounded-full border-2 border-dashed border-rv-gold/20 animate-spin-slow" />
          <div className="absolute end-8 top-24 size-14 rounded-full border border-rv-gold/30" />

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

          {/* إطار المنتج */}
          <div className="relative border border-rv-gold/25 bg-gradient-to-b from-rv-gold/10 via-transparent to-transparent p-8 backdrop-blur-sm">
            <div className="absolute inset-2 border border-white/5" />
            <div className="relative drop-shadow-[0_40px_80px_rgba(0,0,0,0.55)]">
              <BagVisual
                image={IMAGES.heroBag}
                variant="premium"
                eager
                alt="ROVENTO Premium Blend — كيس قهوة إسبريسو"
                className="h-[380px] w-auto animate-float-slow svg-center md:h-[470px]"
                style={{ "--rot": "-1.5deg" } as CSSProperties}
              />
            </div>

            {/* شارة الخصم */}
            <div className="absolute end-4 top-4 grid size-16 place-items-center rounded-full border border-rv-gold bg-background/95 text-center shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
              <span>
                <span className="block font-display text-base font-black text-rv-gold font-wide">
                  19%
                </span>
                <span className="block font-mono text-[8px] tracking-widest text-foreground">
                  خصم
                </span>
              </span>
            </div>
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
