import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Link, useParams } from "react-router";
import {
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { Header } from "@/components/rovento/Header";
import { Footer } from "@/components/rovento/Footer";
import { CartDrawer } from "@/components/rovento/CartDrawer";
import { WhatsAppFloat } from "@/components/rovento/WhatsAppFloat";
import { ProductCard } from "@/components/rovento/ProductCard";
import { CoffeeBag, type BlendVariant } from "@/components/rovento/CoffeeBag";
import { IntensityMeter, Stars, WhatsAppIcon, Steam, Bean } from "@/components/rovento/art";
import {
  getProduct,
  PRODUCTS,
  CATEGORY_MAP,
  formatPrice,
  discountPercent,
} from "@/lib/products";
import { useCart, whatsappLink } from "@/lib/store";

const BLEND_VARIANT: Record<string, BlendVariant> = {
  "mish-premium": "premium",
  "mish-intenso": "intenso",
  "mish-classic": "classic",
};

export default function Product() {
  const { slug = "" } = useParams();
  const product = getProduct(slug);
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setQty(1);
  }, [slug]);

  useEffect(() => {
    if (product) {
      document.title = `${product.name} | روڤينتو ROVENTO`;
    }
  }, [product]);

  const related = useMemo(
    () =>
      product
        ? PRODUCTS.filter(
            (p) => p.slug !== product.slug && p.category === product.category,
          ).slice(0, 4)
        : [],
    [product],
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-4 px-4 py-32 text-center">
          <p className="text-2xl font-bold">المنتج غير موجود</p>
          <Link
            to="/shop"
            className="bg-rv-red px-6 py-3 text-sm font-bold text-white"
          >
            العودة إلى المتجر
          </Link>
        </main>
        <Footer />
        <CartDrawer />
      </div>
    );
  }

  const cat = CATEGORY_MAP[product.category];
  const discount = discountPercent(product);
  const variant = BLEND_VARIANT[product.slug] ?? "premium";
  const waMessage = `مرحبًا ROVENTO 👋 أرغب في طلب:\n• ${product.name} (${product.weight ?? ""}) × ${qty} — ${formatPrice(product.price * qty)}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <div className="mx-auto w-full max-w-[1200px] px-4 py-8 md:px-6 md:py-12">
          {/* breadcrumbs */}
          <nav className="mb-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-foreground">
              الرئيسية
            </Link>
            <span>/</span>
            <Link to="/shop" className="transition-colors hover:text-foreground">
              المتجر
            </Link>
            <span>/</span>
            <Link
              to={`/shop?category=${product.category}`}
              className="transition-colors hover:text-foreground"
            >
              {cat.name}
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            {/* art */}
            <div className="relative overflow-hidden border border-white/10 bg-[#111111]">
              <div className="swiss-grid-bg absolute inset-0" />
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(420px 380px at 50% 45%, ${product.accent}1f, transparent 70%)`,
                }}
              />
              <Bean
                color="#4a3523"
                className="absolute start-8 top-10 w-14 animate-float svg-center"
                style={{ "--rot": "-14deg" } as CSSProperties}
              />
              <Bean
                color="#241a10"
                className="absolute bottom-12 end-8 w-16 animate-float-slow svg-center"
                style={{ "--rot": "18deg", animationDelay: "1s" } as CSSProperties}
              />
              <Steam className="absolute end-[18%] top-4 h-44 w-16 opacity-70" delay={0.6} />
              <div className="relative flex min-h-[420px] items-center justify-center p-10 md:min-h-[560px]">
                <CoffeeBag
                  variant={variant}
                  className="h-full max-h-[520px] w-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
                />
              </div>
              {discount !== null && (
                <span className="absolute start-4 top-4 bg-rv-red px-3 py-1.5 font-mono text-xs font-semibold text-white">
                  خصم {discount}٪
                </span>
              )}
            </div>

            {/* info */}
            <div>
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-[11px] uppercase tracking-[0.26em]"
                  style={{ color: product.accent }}
                >
                  {cat.name}
                </span>
                {product.weight && (
                  <span className="font-mono text-[11px] tracking-widest text-muted-foreground">
                    {product.weight}
                  </span>
                )}
              </div>

              <h1 className="mt-3 text-3xl font-bold leading-snug md:text-4xl">
                {product.name}
              </h1>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {product.nameEn}
              </p>

              <div className="mt-4 flex items-center gap-3">
                <Stars value={product.rating} />
                <span className="font-mono text-xs text-muted-foreground">
                  {product.rating} · {product.reviews} تقييم
                </span>
              </div>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-3xl font-black">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>

              <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              {/* spec sheet */}
              <div className="mt-8 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
                {product.roast && (
                  <div className="bg-background p-4">
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                      Roast · التحميص
                    </p>
                    <p className="mt-1.5 text-sm font-bold">{product.roast}</p>
                  </div>
                )}
                {product.arabica !== undefined && (
                  <div className="bg-background p-4">
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                      Arabica · أرابيكا
                    </p>
                    <p className="mt-1.5 text-sm font-bold">{product.arabica}٪</p>
                  </div>
                )}
                {product.robusta !== undefined && (
                  <div className="bg-background p-4">
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                      Robusta · روبوستا
                    </p>
                    <p className="mt-1.5 text-sm font-bold">{product.robusta}٪</p>
                  </div>
                )}
                {product.intensity !== undefined && (
                  <div className="col-span-2 bg-background p-4 sm:col-span-3">
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                        Intensity · الشدة
                      </p>
                      <span className="font-mono text-xs text-muted-foreground">
                        {product.intensity}/5
                      </span>
                    </div>
                    <IntensityMeter
                      value={product.intensity}
                      color={product.accent}
                      className="mt-2.5"
                    />
                  </div>
                )}
              </div>

              {/* flavor notes */}
              <div className="mt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  Flavor Notes · نكهات
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.notes.map((n) => (
                    <span
                      key={n}
                      className="border px-3 py-1.5 text-sm"
                      style={{
                        borderColor: product.accent + "55",
                        color: product.accent,
                      }}
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              {product.brewing && (
                <div className="mt-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                    Brewing · طريقة التحضير
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.brewing.map((b) => (
                      <span
                        key={b}
                        className="bg-white/5 px-3 py-1.5 text-sm text-muted-foreground"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* actions */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <div className="flex items-center border border-white/20">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="grid size-12 place-items-center transition-colors hover:bg-white/10"
                    aria-label="تقليل الكمية"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-12 text-center font-mono text-lg font-semibold">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="grid size-12 place-items-center transition-colors hover:bg-white/10"
                    aria-label="زيادة الكمية"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
                <button
                  onClick={() => add(product.slug, qty)}
                  className="flex h-12 flex-1 items-center justify-center gap-2 bg-rv-red text-sm font-bold text-white transition-colors hover:bg-[#b53219] sm:flex-none sm:px-8"
                >
                  <ShoppingBag className="size-4" />
                  أضف إلى السلة
                </button>
                <a
                  href={whatsappLink(waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 flex-1 items-center justify-center gap-2 border border-[#25d366]/50 bg-[#25d366]/10 px-6 text-sm font-bold text-[#25d366] transition-colors hover:bg-[#25d366] hover:text-white sm:flex-none"
                >
                  <WhatsAppIcon className="size-4" />
                  اطلب الآن
                </a>
              </div>

              {/* trust strip */}
              <div className="mt-8 grid grid-cols-3 gap-px border border-white/10 bg-white/10">
                {[
                  { icon: Truck, t: "شحن ٤٨ ساعة", s: "لكل مصر" },
                  { icon: ShieldCheck, t: "جودة مضمونة", s: "أو استرجاع" },
                  { icon: RotateCcw, t: "استبدال سهل", s: "خلال ٧ أيام" },
                ].map((x) => (
                  <div
                    key={x.t}
                    className="flex flex-col items-center gap-2 bg-background p-4 text-center"
                  >
                    <x.icon className="size-5 text-rv-red" />
                    <p className="text-xs font-bold">{x.t}</p>
                    <p className="text-[10px] text-muted-foreground">{x.s}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* related */}
          {related.length > 0 && (
            <section className="mt-20 border-t border-white/10 pt-14">
              <div className="flex items-end justify-between">
                <h2 className="text-2xl font-bold md:text-3xl">
                  منتجات <span className="text-rv-red">مشابهة</span>
                </h2>
                <Link
                  to="/shop"
                  className="text-sm font-semibold text-muted-foreground transition-colors hover:text-rv-red"
                >
                  عرض الكل
                </Link>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
                {related.map((p, i) => (
                  <ProductCard key={p.slug} product={p} index={i} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppFloat />
    </div>
  );
}
