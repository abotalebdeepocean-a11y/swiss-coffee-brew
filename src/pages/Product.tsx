import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Link, useParams } from "react-router";
import {
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronLeft,
  Star,
} from "lucide-react";
import { Header } from "@/components/rovento/Header";
import { Footer } from "@/components/rovento/Footer";
import { CartDrawer } from "@/components/rovento/CartDrawer";
import { WhatsAppFloat } from "@/components/rovento/WhatsAppFloat";
import { ProductCard } from "@/components/rovento/ProductCard";
import { BagVisual } from "@/components/rovento/BagVisual";
import { blendVariantFor } from "@/components/rovento/CoffeeBag";
import { IntensityMeter, Stars, WhatsAppIcon, Steam, Bean } from "@/components/rovento/art";
import {
  getProduct,
  PRODUCTS,
  CATEGORY_MAP,
  formatPrice,
  discountPercent,
  variantOf,
} from "@/lib/products";
import { useCart, whatsappLink } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function Product() {
  const { slug = "" } = useParams();
  const product = getProduct(slug);
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [variantId, setVariantId] = useState(product?.variants?.[0]?.id);
  const [prevSlug, setPrevSlug] = useState(slug);

  if (slug !== prevSlug) {
    setPrevSlug(slug);
    setQty(1);
    setVariantId(product?.variants?.[0]?.id);
  }

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
          <Link to="/shop" className="bg-rv-red px-6 py-3 text-sm font-bold text-white">
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
  const variant = blendVariantFor(product.slug);
  const activeVariant = variantOf(product, variantId);
  const price = activeVariant?.price ?? product.price;
  const oldPrice = activeVariant?.oldPrice ?? product.oldPrice;
  const waMessage = `مرحبًا ROVENTO 👋 أرغب في طلب:\n• ${product.name} (${activeVariant?.label ?? product.weight ?? ""}) × ${qty} — ${formatPrice(price * qty)}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <div className="mx-auto w-full max-w-[1200px] px-4 py-6 md:px-6 md:py-10">
          {/* breadcrumbs — أفضل تصميم */}
          <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground md:mb-8">
            <Link to="/" className="transition-colors hover:text-foreground">الرئيسية</Link>
            <ChevronLeft className="size-3" />
            <Link to="/shop" className="transition-colors hover:text-foreground">المتجر</Link>
            <ChevronLeft className="size-3" />
            <Link to={`/shop?category=${product.category}`} className="transition-colors hover:text-foreground">
              {cat.name}
            </Link>
            <ChevronLeft className="size-3" />
            <span className="font-bold text-foreground">{product.nameEn}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* الصورة */}
            <div className="relative overflow-hidden border border-white/10 bg-[#111111]">
              <div className="absolute inset-0 grid-editorial opacity-30" />
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
              <div className="relative flex min-h-[360px] items-center justify-center p-8 sm:min-h-[420px] md:min-h-[520px]">
                <BagVisual
                  image={product.image}
                  variant={variant}
                  eager
                  alt={product.name}
                  className="h-full max-h-[480px] w-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
                />
              </div>
              {discount !== null && (
                <span className="absolute start-4 top-4 bg-rv-red px-3 py-1.5 font-mono text-xs font-semibold text-white">
                  خصم {discount}٪
                </span>
              )}
              {product.badge && !discount && (
                <span className="absolute start-4 top-4 bg-rv-gold px-3 py-1.5 font-mono text-xs font-semibold text-black">
                  {product.badge}
                </span>
              )}
            </div>

            {/* المعلومات */}
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.26em]" style={{ color: product.accent }}>
                  {cat.name}
                </span>
                {product.weight && (
                  <span className="font-mono text-[11px] tracking-widest text-muted-foreground">{product.weight}</span>
                )}
              </div>

              <h1 className="mt-3 text-2xl font-bold leading-snug sm:text-3xl md:text-4xl">{product.name}</h1>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{product.nameEn}</p>

              {/* التقييم */}
              <div className="mt-4 flex items-center gap-3">
                <div className="flex text-rv-gold">
                  <Stars value={product.rating} />
                </div>
                <span className="text-sm font-bold text-foreground">{product.rating}</span>
                <span className="text-xs text-muted-foreground">· {product.reviews} تقييم</span>
                {product.bestseller && (
                  <span className="flex items-center gap-1 rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white">
                    <Star className="size-3 fill-white" />
                    الأكثر مبيعًا
                  </span>
                )}
              </div>

              {/* السعر */}
              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-3xl font-black text-foreground md:text-4xl">{formatPrice(price)}</span>
                {oldPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">{formatPrice(oldPrice)}</span>
                    <span className="rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
                      خصم {Math.round(((oldPrice - price) / oldPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>

              {/* اختيار المقاس/الطحن */}
              {product.variants && product.variants.length > 1 && (
                <div className="mt-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">الخيار</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setVariantId(v.id)}
                        className={cn(
                          "h-11 border px-4 text-sm font-semibold transition-all",
                          v.id === activeVariant?.id
                            ? "border-rv-red bg-rv-red/10 text-rv-red shadow-[0_0_15px_rgba(208,59,30,0.15)]"
                            : "border-white/20 text-muted-foreground hover:border-white/40 hover:text-foreground",
                        )}
                      >
                        {v.label}
                        <span className="ms-2 font-mono text-[10px]">{formatPrice(v.price)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-[15px]">{product.description}</p>

              {/* أزرار الشراء — أكبر وأوضح */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="flex items-center border border-white/20">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid size-11 place-items-center transition-colors hover:bg-white/10" aria-label="تقليل">
                    <Minus className="size-4" />
                  </button>
                  <span className="w-10 text-center font-mono text-lg font-semibold">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="grid size-11 place-items-center transition-colors hover:bg-white/10" aria-label="زيادة">
                    <Plus className="size-4" />
                  </button>
                </div>
                <button
                  onClick={() => add(product.slug, qty, activeVariant?.id)}
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-rv-red text-sm font-bold text-white shadow-lg shadow-rv-red/20 transition-all hover:-translate-y-0.5 hover:bg-[#b53219] hover:shadow-rv-red/30 sm:flex-none sm:px-8"
                >
                  <ShoppingBag className="size-4" />
                  أضف إلى السلة — {formatPrice(price * qty)}
                </button>
              </div>

              {/* واتساب */}
              <a
                href={whatsappLink(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#25d366]/50 bg-[#25d366]/10 text-sm font-bold text-[#25d366] transition-colors hover:bg-[#25d366] hover:text-white"
              >
                <WhatsAppIcon className="size-4" />
                اطلب عبر واتساب
              </a>

              {/* شريط الثقة */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { icon: Truck, t: "شحن سريع", s: "24-72 ساعة" },
                  { icon: ShieldCheck, t: "جودة مضمونة", s: "أو استرجاع" },
                  { icon: RotateCcw, t: "استبدال سهل", s: "خلال ٧ أيام" },
                ].map((x) => (
                  <div key={x.t} className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center">
                    <x.icon className="size-4 text-rv-gold" />
                    <p className="text-[11px] font-bold">{x.t}</p>
                    <p className="text-[10px] text-muted-foreground">{x.s}</p>
                  </div>
                ))}
              </div>

              {/* المواصفات */}
              <div className="mt-6 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
                {product.roast && (
                  <div className="bg-background p-3.5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">التحميص</p>
                    <p className="mt-1 text-sm font-bold">{product.roast}</p>
                  </div>
                )}
                {product.arabica !== undefined && (
                  <div className="bg-background p-3.5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">أرابيكا</p>
                    <p className="mt-1 text-sm font-bold">{product.arabica}٪</p>
                  </div>
                )}
                {product.robusta !== undefined && (
                  <div className="bg-background p-3.5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">روبوستا</p>
                    <p className="mt-1 text-sm font-bold">{product.robusta}٪</p>
                  </div>
                )}
                {product.intensity !== undefined && (
                  <div className="col-span-2 bg-background p-3.5 sm:col-span-3">
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">الشدة</p>
                      <span className="font-mono text-xs text-muted-foreground">{product.intensity}/5</span>
                    </div>
                    <IntensityMeter value={product.intensity} color={product.accent} className="mt-2" />
                  </div>
                )}
              </div>

              {/* النكهات */}
              {product.notes.length > 0 && (
                <div className="mt-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">النكهات</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.notes.map((n) => (
                      <span key={n} className="rounded-full border px-3 py-1 text-xs font-bold" style={{ borderColor: product.accent + "55", color: product.accent }}>
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* طرق التحضير */}
              {product.brewing && (
                <div className="mt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">طرق التحضير</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.brewing.map((b) => (
                      <span key={b} className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted-foreground">{b}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* منتجات مشابهة */}
          {related.length > 0 && (
            <section className="mt-16 border-t border-white/10 pt-12 md:mt-20 md:pt-14">
              <div className="flex items-end justify-between">
                <h2 className="text-2xl font-bold md:text-3xl">
                  منتجات <span className="text-rv-red">مشابهة</span>
                </h2>
                <Link to="/shop" className="text-sm font-semibold text-muted-foreground transition-colors hover:text-rv-red">
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
