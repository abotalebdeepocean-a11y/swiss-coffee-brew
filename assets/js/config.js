/* ============================================================
   ROVENTO — ملف الإعدادات (عدّل هنا من غير ما تلمس باقي الكود)
   ============================================================ */
window.ROVENTO_CONFIG = {
  /* رقم الواتساب بالصيغة الدولية من غير + أو مسافات. مثال: "201001234567"
     لو سبته فاضي، زر الطلب هيظهر رسالة تنبيه بدل ما يفتح واتساب. */
  whatsappNumber: "201109600543",

  /* رقم الهاتف للعرض في الموقع */
  phoneDisplay: "01109600543",

  /* قيمة الشحن الثابتة بالجنيه لكل طلب */
  shippingFee: 100,

  /* شحن مخفض: الطلبات أكتر من reducedShippingThreshold جنيه تدفع reducedShippingFee جنيه */
  reducedShippingFee: 50,
  reducedShippingThreshold: 500,

  /* المحافظات في قائمة بيانات الشحن */
  governorates: ["القاهرة","الجيزة","الإسكندرية","القليوبية","الشرقية","الدقهلية","الغربية","المنوفية","كفر الشيخ","البحيرة","دمياط","بورسعيد","الإسماعيلية","السويس","شمال سيناء","جنوب سيناء","الفيوم","بني سويف","المنيا","أسيوط","سوهاج","قنا","الأقصر","أسوان","البحر الأحمر","الوادي الجديد","مطروح"],

  /* Supabase: الرابط والمفتاح العام (publishable) — آمن يظهر في الكود، الحماية بـ RLS */
  supabaseUrl: "https://osganvzmjisqsomjayyt.supabase.co",
  supabaseKey: "sb_publishable_c-51gGMCxckr0KZG_2DK9Q_EYlzqF9A",

  /* روابط السوشيال — حط الرابط الفعلي أو سيبه فاضي عشان يتخفي */
  facebookUrl: "",
  instagramUrl: "",

  siteUrl: "https://rovento.site",

  /* true = بيظهر بادج "سعر تقديري" جنب الأسعار اللي لسه متأكدتش.
     خليها false قبل النشر الفعلي بعد ما تراجع كل الأسعار. */
  showEstimateBadge: true,

  /* حد الشحن المجاني — null يعني مفيش حد. لو الشحن مجاني لكل الطلبات سيبها null
     واكتب النص في trustItems بالأسفل. */
  freeShippingThreshold: null,

  /* شريط الثقة تحت السلايدر — راجع كل بند وتأكد إنه صحيح قبل النشر
     (خصوصًا "توصيل لكل المحافظات" لو سياسة الشحن اتغيرت) */
  trustItems: [
    { icon: "truck", title: "توصيل خلال ٤٨–٧٢ ساعة", text: "لحد باب البيت" },
    { icon: "cash", title: "دفع عند الاستلام", text: "استلم قهوتك وادفع براحتك" },
    { icon: "bean", title: "تحميص فريش وطحن يومي", text: "مش مخزّنة، والفرق في الطعم" },
    { icon: "return", title: "سياسة استرجاع واضحة", text: "عيب تغليف • انتهاء صلاحية • عدم مطابقة" }
  ],


  /* الأحجام المتاحة (بالجرام) */
  sizes: [250, 500, 1000],

  /* المنتجات والأسعار (بالجنيه المصري)
     confirmed: true  = سعر مؤكد
     confirmed: false = سعر تقديري لازم يتراجع                              */
  products: [
    {
      id: "gold-18",
      name: "GOLD 18",
      line: "GOLD",
      tag: "Discovery — ابدأ هنا",
      type: "قهوة تركي مطحونة",
      roast: "LIGHT",
      desc: "أخف وأقرب طريق لاكتشاف روفينتو. مناسبة كبداية أو للاستخدام اليومي.",
      img: "assets/img/gold-18-bag.webp",
      prices: { 250: 155, 500: 290, 1000: 550 },
      confirmed: { 250: false, 500: false, 1000: false }
    },
    {
      id: "gold-21",
      name: "GOLD 21",
      line: "GOLD",
      tag: "Familiarity — قلب المجموعة",
      type: "قهوة تركي مطحونة",
      roast: "MEDIUM",
      desc: "التوازن اللي الذوق المصري بيدور عليه. جسم وحلاوة من غير مرارة زيادة.",
      img: "assets/img/gold-21-bag.webp",
      featured: true,
      prices: { 250: 180, 500: 340, 1000: 650 },
      confirmed: { 250: false, 500: false, 1000: false }
    },
    {
      id: "gold-24",
      name: "GOLD 24",
      line: "GOLD",
      tag: "Indulgence — الأرقى",
      type: "قهوة تركي مطحونة",
      roast: "DARK",
      desc: "غنية وناعمة وفخمة. تحميص أغمق مضبوط عشان يبقى غني من غير ما يبقى محروق.",
      img: "assets/img/gold-24-bag.webp",
      prices: { 250: 205, 500: 390, 1000: 750 },
      confirmed: { 250: false, 500: false, 1000: false }
    },
    {
      id: "premium",
      name: "PREMIUM",
      line: "ESPRESSO",
      tag: "إسبريسو للمحترفين",
      type: "خلطة إسبريسو إيطالية الطابع — حبوب كاملة",
      roast: null,
      desc: "خلطة حبوب كاملة للإسبريسو بمعايير عالمية. لعشاق القهوة الحقيقيين.",
      img: "assets/img/premium-bag.webp",
      prices: { 250: 240, 500: 450, 1000: 890 },
      confirmed: { 250: false, 500: true, 1000: true }
    },
    {
      id: "bar-intenso",
      name: "BAR INTENSO",
      line: "ESPRESSO",
      tag: "كثافة وقوة",
      type: "خلطة إسبريسو إيطالية الطابع — حبوب كاملة",
      roast: null,
      desc: "خلطة إسبريسو بشخصية قوية وكثافة تحس بيها من أول رشفة.",
      img: "assets/img/bar-intenso-bag.webp",
      prices: { 250: 190, 500: 360, 1000: 690 },
      confirmed: { 250: false, 500: false, 1000: true }
    }
  ]
};
