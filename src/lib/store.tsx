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
export const WHATSAPP_NUMBER = "201000000000";

export interface CartItem {
  slug: string;
  qty: number;
  /** معرّف خيار المقاس/الطحن — اختياري للمنتجات اللي ليها variants */
  variantId?: string;
}

/** مفتاح سطر فريد في السلة = المنتج + خياره (نفس الكيس بمقاسين = سطرين) */
export function cartLineKey(item: Pick<CartItem, "slug" | "variantId">): string {
  return `${item.slug}::${item.variantId ?? ""}`;
}

/** معلومات سطر السلة: المنتج + الخيار + السعر الفعلي — undefined لو المنتج اتشال */
export function cartLine(
  item: CartItem,
):
  | {
      product: NonNullable<ReturnType<typeof getProduct>>;
      variant: ReturnType<typeof variantOf>;
      price: number;
      label: string;
    }
  | undefined {
  const product = getProduct(item.slug);
  if (!product) return undefined;
  const variant = variantOf(product, item.variantId);
  return {
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
  add: (slug: string, qty?: number, variantId?: string) => void;
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
    return parsed.filter((i) => getProduct(i.slug));
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

  const add = useCallback((slug: string, qty = 1, variantId?: string) => {
    setItems((prev) => {
      const key = cartLineKey({ slug, variantId });
      const found = prev.find((i) => cartLineKey(i) === key);
      if (found) {
        return prev.map((i) =>
          cartLineKey(i) === key ? { ...i, qty: i.qty + qty } : i,
        );
      }
      return [...prev, { slug, qty, variantId }];
    });
    setIsOpen(true);
  }, []);

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
