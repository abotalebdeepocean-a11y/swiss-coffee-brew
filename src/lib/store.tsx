import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS, getProduct, variantOf, formatPrice } from "./products";

/** ⚠️ ضع رقم واتساب المتجر هنا بصيغة دولية بدون + أو أصفار بادئة */
export const WHATSAPP_NUMBER = "201033012381";

export interface CartItem {
  slug: string;
  qty: number;
  /** معرّف خيار المقاس/الطحن — اختياري للمنتجات اللي ليها variants */
  variantId?: string;
  /** خلطة مخصصة من استوديو الخلط (خلطتك الخاصة) — بدل منتج جاهز */
  custom?: CustomBlendSpec;
}

/** مواصفات خلطة مخصصة محفوظة في السلة بسعرها النهائي */
export interface CustomBlendSpec {
  /** اسم مختصر: "خلطة مخصصة ٧٠/٣٠ — 1 كجم" */
  label: string;
  /** تفاصيل الوصفة: النسب + التحميص + الطحن */
  detail: string;
  /** السعر النهائي حسب النسب والوزن */
  price: number;
  /** نسبة الأرابيكا (0-100) — لعرض قرص النسب في السلة */
  arabica: number;
}

/** مفتاح سطر فريد في السلة = المنتج + خياره (نفس الكيس بمقاسين = سطرين) */
export function cartLineKey(item: Pick<CartItem, "slug" | "variantId">): string {
  return `${item.slug}::${item.variantId ?? ""}`;
}

/** معلومات سطر السلة — إما خلطة مخصصة أو منتج عادي + خياره + السعر الفعلي.
 * يرجع undefined لو المنتج اتشال من الكتالوج. */
export type CartLineInfo =
  | { custom: true; spec: CustomBlendSpec; price: number; label: string }
  | {
      custom: false;
      product: NonNullable<ReturnType<typeof getProduct>>;
      variant: ReturnType<typeof variantOf>;
      price: number;
      label: string;
    };

export function cartLine(item: CartItem): CartLineInfo | undefined {
  if (item.custom && item.custom.price > 0) {
    return {
      custom: true,
      spec: item.custom,
      price: item.custom.price,
      label: item.custom.detail,
    };
  }
  const product = getProduct(item.slug);
  if (!product) return undefined;
  const variant = variantOf(product, item.variantId);
  return {
    custom: false,
    product,
    variant,
    price: variant?.price ?? product.price,
    label: variant?.label ?? product.weight ?? "",
  };
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (
    slug: string,
    qty?: number,
    variantId?: string,
    custom?: CustomBlendSpec,
  ) => void;
  remove: (slug: string, variantId?: string) => void;
  setQty: (slug: string, qty: number, variantId?: string) => void;
  clear: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "rovento-cart";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return parsed.filter(
      (i) =>
        (i.custom && i.custom.price > 0 && typeof i.custom.arabica === "number") ||
        getProduct(i.slug),
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const add = useCallback(
    (
      slug: string,
      qty = 1,
      variantId?: string,
      custom?: CustomBlendSpec,
    ) => {
      setItems((prev) => {
        const key = cartLineKey({ slug, variantId });
        const found = prev.find((i) => cartLineKey(i) === key);
        if (found) {
          return prev.map((i) =>
            cartLineKey(i) === key ? { ...i, qty: i.qty + qty } : i,
          );
        }
        return [...prev, { slug, qty, variantId, custom }];
      });
      setIsOpen(true);
    },
    [],
  );

  const remove = useCallback((slug: string, variantId?: string) => {
    const key = cartLineKey({ slug, variantId });
    setItems((prev) => prev.filter((i) => cartLineKey(i) !== key));
  }, []);

  const setQty = useCallback(
    (slug: string, qty: number, variantId?: string) => {
      const key = cartLineKey({ slug, variantId });
      setItems((prev) =>
        qty <= 0
          ? prev.filter((i) => cartLineKey(i) !== key)
          : prev.map((i) => (cartLineKey(i) === key ? { ...i, qty } : i)),
      );
    },
    [],
  );

  const clear = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);
  const subtotal = useMemo(
    () =>
      items.reduce((s, i) => {
        const line = cartLine(i);
        return s + (line ? line.price * i.qty : 0);
      }, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      add,
      remove,
      setQty,
      clear,
      isOpen,
      openCart,
      closeCart,
    }),
    [items, count, subtotal, add, remove, setQty, clear, isOpen, openCart, closeCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

/** يبني رسالة الطلب بالعربية */
export function buildOrderMessage(items: CartItem[]): string {
  const lines = items
    .map((i) => {
      const line = cartLine(i);
      if (!line) return "";
      if (line.custom) {
        return `• ${line.spec.label} (${line.spec.detail}) × ${i.qty} — ${formatPrice(line.price * i.qty)}`;
      }
      return `• ${line.product.name} (${line.label}) × ${i.qty} — ${formatPrice(line.price * i.qty)}`;
    })
    .filter(Boolean);

  const total = items.reduce((s, i) => {
    const line = cartLine(i);
    return s + (line ? line.price * i.qty : 0);
  }, 0);

  return [
    "☕ طلب جديد من متجر ROVENTO:",
    "",
    ...lines,
    "",
    `الإجمالي: ${formatPrice(total)}`,
    "",
    "الاسم:",
    "العنوان:",
    "رقم الهاتف:",
    "طريقة الدفع: (فودافون كاش / إنستاباي / الدفع عند الاستلام)",
  ].join("\n");
}

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function orderViaWhatsApp(items: CartItem[]): void {
  window.open(whatsappLink(buildOrderMessage(items)), "_blank", "noopener");
}

/** باقة الاشتراك الشهري — عرض تقديمي فقط في النسخة الأولى */
export const SUBSCRIPTION_PLANS = [
  { id: "1kg", label: "كيس ١ كجم", price: 1100, perMonth: "شهريًا", highlight: false },
  { id: "2kg", label: "كيسان ١ كجم", price: 2100, perMonth: "شهريًا", highlight: true },
  { id: "5kg", label: "خمسة أكياس", price: 5000, perMonth: "شهريًا", highlight: false },
];

export function hasProducts() {
  return PRODUCTS.length;
}
