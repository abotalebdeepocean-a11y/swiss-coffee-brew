import { Link } from "react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart, orderViaWhatsApp } from "@/lib/store";
import { getProduct, formatPrice } from "@/lib/products";
import { IMAGES } from "@/lib/images";
import { BagVisual } from "./BagVisual";
import { blendVariantFor } from "./CoffeeBag";
import { WhatsAppIcon } from "./art";

export function CartDrawer() {
  const { items, count, subtotal, isOpen, closeCart, setQty, remove, clear } =
    useCart();

  return (
    <Sheet open={isOpen} onOpenChange={(o) => !o && closeCart()}>
      <SheetContent
        side="left"
        className="w-[92%] gap-0 border-e border-white/10 p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-white/10 px-5 py-4">
          <SheetTitle className="flex items-center justify-between text-start">
            <span className="flex items-center gap-2 text-lg font-bold">
              <ShoppingBag className="size-4.5 text-rv-red" />
              سلة التسوق
            </span>
            <span className="font-mono text-xs tracking-widest text-muted-foreground">
              {count} منتج
            </span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <BagVisual
              image={IMAGES.heroBag}
              variant="premium"
              alt="ROVENTO Premium Blend"
              className="h-44 w-auto opacity-60"
            />
            <p className="text-lg font-semibold">سلتك فارغة</p>
            <p className="text-sm text-muted-foreground">
              ابدأ رحلتك مع قهوة مختصة تُحمَّص طازجة في مصر.
            </p>
            <Button asChild className="rounded-none" onClick={closeCart}>
              <Link to="/shop">تصفح المتجر</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5">
              <ul className="divide-y divide-white/5">
                {items.map((item) => {
                  const p = getProduct(item.slug);
                  if (!p) return null;
                  return (
                    <li key={item.slug} className="flex gap-4 py-4">
                      <Link
                        to={`/product/${p.slug}`}
                        onClick={closeCart}
                        className="shrink-0"
                      >
                        <div className="grid h-24 w-20 place-items-center border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent">
                          <BagVisual
                            image={p.image}
                            variant={blendVariantFor(p.slug)}
                            label={p.nameEn.slice(0, 8).toUpperCase()}
                            alt={p.name}
                            className="h-20 w-auto"
                          />
                        </div>
                      </Link>
                      <div className="flex flex-1 flex-col justify-between py-0.5">
                        <div>
                          <Link
                            to={`/product/${p.slug}`}
                            onClick={closeCart}
                            className="text-sm font-semibold leading-snug hover:text-rv-red"
                          >
                            {p.name}
                          </Link>
                          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                            {p.weight ?? p.category}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-white/15">
                            <button
                              onClick={() => setQty(item.slug, item.qty + 1)}
                              className="grid size-7 place-items-center transition-colors hover:bg-white/10"
                              aria-label="زيادة الكمية"
                            >
                              <Plus className="size-3.5" />
                            </button>
                            <span className="w-8 text-center font-mono text-sm">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => setQty(item.slug, item.qty - 1)}
                              className="grid size-7 place-items-center transition-colors hover:bg-white/10"
                              aria-label="تقليل الكمية"
                            >
                              <Minus className="size-3.5" />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold">
                              {formatPrice(p.price * item.qty)}
                            </span>
                            <button
                              onClick={() => remove(item.slug)}
                              className="text-muted-foreground transition-colors hover:text-rv-red"
                              aria-label="حذف المنتج"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <button
                onClick={clear}
                className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground underline-offset-4 hover:text-rv-red hover:underline"
              >
                إفراغ السلة
              </button>
            </div>

            <div className="border-t border-white/10 px-5 py-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">الإجمالي</span>
                <span className="text-xl font-bold">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                الدفع عند الاستلام أو فودافون كاش / إنستاباي · الشحن لكل مصر
              </p>
              <Button
                onClick={() => orderViaWhatsApp(items)}
                className="mt-3 h-12 w-full rounded-none bg-[#25d366] text-white hover:bg-[#1fbd5b]"
              >
                <WhatsAppIcon className="size-4" />
                أكمل الطلب عبر واتساب
              </Button>
              <button
                onClick={closeCart}
                className="mt-2 w-full py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                متابعة التسوق
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
