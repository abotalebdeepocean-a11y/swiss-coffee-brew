/**
 * ROVENTO — image slots for real photos.
 *
 * Drop your files into `public/images/` and they replace the SVG artwork
 * automatically. Base names have NO extension: the app tries `.png` → `.jpg`
 * → `.webp` in order, and falls back to the SVG art when nothing is found.
 *
 * ضع صورك في `public/images/` وستحل محل رسومات SVG تلقائيًا.
 * الأسماء بدون امتداد — الموقع يجرب png ثم jpg ثم webp، ويرجع للرسم
 * الاحتياطي لو الصورة مش موجودة. راجع `public/images/README.txt`.
 */
export const IMAGES = {
  /** كيس الهيرو — نفس صورة بريميم ما لم ترد صورة مختلفة */
  heroBag: "/images/bag-premium",
  /** حقائب ROVENTO الحقيقية (من صورك) + باقي أصناف الأكياس */
  bags: {
    /** الصورة 4 (يسار) — كيس PREMIUM BLEND بجوانب صفراء */
    premium: "/images/bag-premium",
    /** الصورة 4 (وسط) — كيس INTENSO BLEND بجوانب حمراء */
    intenso: "/images/bag-intenso",
    /** الصورة 4 (يمين) — كيس CLASSIC BLEND بجوانب زرقاء */
    classic: "/images/bag-classic",
    /** الصورة 2 — كيس INNOVATION BLEND (أصل إثيوبي) */
    innovation: "/images/bag-innovation",
    premium1kg: "/images/bag-premium-1kg",
    groundPremium: "/images/bag-ground-premium",
    groundClassic: "/images/bag-ground-classic",
    intenso1kg: "/images/bag-intenso-1kg",
  },
  /** بنرات السلايدر الأربعة (من صورك الحقيقية) */
  banners: {
    /** الصورة 5 — حملة «ليست مجرد قهوة… إنها وقود العظماء» (غروب + كيس + كوب) */
    hero: "/images/banner-hero",
    /** الصورة 3 — مشهد الورشة المصرية (طاولة خشبية + موقد + شباك) */
    workshop: "/images/banner-workshop",
    /** الصورة 4 — أكياس البلندات الثلاثة على طاولة العمل */
    signature: "/images/banner-signature",
    /** الصورة 1 — الأكياس الثلاثة على خلفية داكنة بلمسات ذهبية */
    collections: "/images/banner-collections",
  },
} as const;
