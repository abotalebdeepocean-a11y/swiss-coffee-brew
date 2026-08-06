import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  Coffee,
  CupSoda,
  Zap,
  Disc,
  Factory,
  SlidersHorizontal,
  ArrowUpLeft,
} from "lucide-react";
import { CATEGORIES, productsByCategory, type CategoryId } from "@/lib/products";
import { SectionHeading } from "./Section";

const ICONS: Record<CategoryId, typeof Coffee> = {
  beans: Coffee,
  ground: CupSoda,
  espresso: Zap,
  capsules: Disc,
  machines: Factory,
  accessories: SlidersHorizontal,
};

export function Categories() {
  return (
    <section id="categories" className="border-b border-white/10 py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <SectionHeading
          index="01"
          kicker="Categories"
          title={
            <>
              تسوّق حسب <span className="text-rv-red">الفئة</span>
            </>
          }
          desc="من الحبوب المختارة إلى أدوات الباريستا — كل ما تحتاجه لتحضير كوب مختص في بيتك."
        />

        <div className="grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((cat, i) => {
            const Icon = ICONS[cat.id];
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Link
                  to={`/shop?category=${cat.id}`}
                  className="group relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden bg-background p-5 transition-colors hover:bg-rv-ink"
                >
                  {/* hover accent band */}
                  <span
                    className="absolute inset-x-0 top-0 h-1 origin-start scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                    style={{ backgroundColor: cat.accent }}
                  />
                  <div className="flex items-start justify-between">
                    <span
                      className="grid size-11 place-items-center border"
                      style={{ color: cat.accent, borderColor: cat.accent + "55" }}
                    >
                      <Icon className="size-5" />
                    </span>
                    <ArrowUpLeft className="size-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-rv-red" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold leading-snug">{cat.name}</h3>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {cat.nameEn}
                    </p>
                    <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground/80">
                      {cat.blurb}
                    </p>
                    <p className="mt-3 font-mono text-[10px] tracking-widest text-muted-foreground">
                      {productsByCategory(cat.id).length} منتج
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
