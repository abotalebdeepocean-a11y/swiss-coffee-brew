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
  /** كيس الهيرو — صورة البريميوم (النسر) — مقاس موحد */
  heroBag: "/images/premium-bag",
  /** حقائب ROVENTO الحقيقية — مقاس موحد (1100×1100) عشان الكيسين يظهروا بنفس الحجم */
  bags: {
    /** كيس BAR INTENSO — الأمامي (نفس صورة البانر الرئيسي) */
    intenso: "/images/intenso-bag-front-new",
    /** كيس BAR INTENSO — الخلفي (نفس مقياس الأمامي الجديد — الغلاف الخلفي الرسمي) */
    intensoBack: "/images/intenso-bag-back-new",
    /** كيس PREMIUM — الأمامي */
    premium: "/images/premium-bag",
    /** كيس PREMIUM — الخلفي (نفس المقياس) */
    premiumBack: "/images/premium-bag-back",
    /** صورة ماكرو — كيس بار إنتنسو (للخلفيات) — نفس صورة البانر الرئيسي */
    macro: "/images/intenso-bag-front-new",
    /** صورة الكيسين معاً — مقاس موحد — نفس صورة البانر الرئيسي */
    twoPackages: "/images/intenso-bag-front-new",
  },
  /** صور المنتجات — الأمامي والخلفي لكل منتج */
  products: {
    barIntenso: "/images/intenso-bag-front-new",
    barIntensoBack: "/images/intenso-bag-back-new",
    premium: "/images/premium-bag",
    premiumBack: "/images/premium-bag-back",
  },
  /** بنرات السلايدر (صور حقيقية من Google Drive — محدثة) */
  banners: {
    /** السلايد 1 — البنر الرئيسي */
    hero: "/images/banner-main",
    /** السلايد 2 — بنر تاني */
    workshop: "/images/banner-2",
    /** السلايد 3 — بنر الطلب الآن */
    signature: "/images/banner-order",
    /** السلايد 4 — بنر الفخامة */
    collections: "/images/banner-velvet",
    /** السلايد 5 — بنر اختيار الباكيجتين */
    choose: "/images/banner-choose",
    /** صورة قسم بريكا */
    brika: "/images/banner-brika-new",
    /** بانر قسم خلطتك الخاصة */
    customBlend: "/images/banner-2",
    /** بانر الكيس CLASSIC 1 كجم */
    classic1kg: "/images/premium-bag",
  },
  /** بنرات السلايدر (صور حقيقية من Google Drive — محدثة) */
  banners: {
