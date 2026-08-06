import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS, getProduct, formatPrice } from "./products";

/** ⚠️ ضع رقم واتساب المتجر هنا بصيغة دولية بدون + أو أصفار بادئة */
export const WHATSAPP_NUMBER = "201000000000";

export interface CartItem {
  slug: string;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (slug: string, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
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

  const add = useCallback((slug: string, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.slug === slug);
      if (found) {
        return prev.map((i) =>
          i.slug === slug ? { ...i, qty: i.qty + qty } : i,
        );
      }
      return [...prev, { slug, qty }];
    });
    setIsOpen(true);
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.slug !== slug)
        : prev.map((i) => (i.slug === slug ? { ...i, qty } : i)),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);
  const subtotal = useMemo(
    () =>
      items.reduce((s, i) => {
        const p = getProduct(i.slug);
        return s + (p ? p.price * i.qty : 0);
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
      const p = getProduct(i.slug);
      if (!p) return "";
      return `• ${p.name} (${p.weight ?? ""}) × ${i.qty} — ${formatPrice(p.price * i.qty)}`;
    })
    .filter(Boolean);

  const total = items.reduce((s, i) => {
    const p = getProduct(i.slug);
    return s + (p ? p.price * i.qty : 0);
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
