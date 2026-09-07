/**
 * العرض الوحيد الحقيقي — شحن مجاني لمدة شهر من تاريخ محدد + خصم 10% عند شراء 2 كجم
 * One real, dated offer. No fake urgency, no discount codes.
 */

/** تاريخ بداية الشحن المجاني (YYYY-MM-DD) — حط تاريخ اليوم الفعلي هنا */
export const FREE_SHIPPING_START = "2026-09-07";
/** تاريخ نهاية الشحن المجاني (شهر واحد من البداية) */
export const FREE_SHIPPING_END = "2026-10-07";

/** خصم شراء 2 كجم من أي بلند */
export const TWO_KG_DISCOUNT_RATE = 0.1;

/** هل الشحن المجاني ساري الآن؟ */
export function isFreeShippingActive(now: Date = new Date()): boolean {
  const start = new Date(`${FREE_SHIPPING_START}T00:00:00`);
  const end = new Date(`${FREE_SHIPPING_END}T23:59:59`);
  return now >= start && now <= end;
}

/** خصم 10% لسعر كيس واحد لو اشترى 2 كجم (الكيس 1 كجم) */
export function discountedPriceFor2kg(price: number): number {
  return Math.round(price * (1 - TWO_KG_DISCOUNT_RATE));
}

/** التاريخ بصيغة عربية مقروءة — مثال: 7 سبتمبر 2026 */
export function formatArabicDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
    numberingSystem: "latn",
  });
}
