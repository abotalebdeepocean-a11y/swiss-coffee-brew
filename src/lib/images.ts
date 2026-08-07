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
  /** حقائب MISH الثلاثة + باقي أصناف الأكياس */
  bags: {
    premium: "/images/bag-premium",
    intenso: "/images/bag-intenso",
    classic: "/images/bag-classic",
    premium1kg: "/images/bag-premium-1kg",
    groundPremium: "/images/bag-ground-premium",
    groundClassic: "/images/bag-ground-classic",
    intenso1kg: "/images/bag-intenso-1kg",
  },
  /** صور سلايدر الصفحة الرئيسية (٤ بنرات) */
  banners: {
    workshop: "/images/banner-workshop",
    beans: "/images/banner-beans",
    espresso: "/images/banner-espresso",
    experience: "/images/banner-experience",
  },
} as const;
