export const IMAGES = {
  chairman: "/images/mohamadia/chairman.png",
  logo: "/images/mohamadia/logo.png",
  logoSmall: "/images/mohamadia/logo-small.jpg",
};

export const COMPANY = {
  name: "شركة المحمدية",
  fullName: "شركة المحمدية للمقاولات العامة والتوريدات العمومية",
  tagline: "للمقاولات العامة والتوريدات العمومية",
  phoneDisplay: "00201060991949",
  phoneHref: "tel:+201060991949",
  whatsapp: "https://wa.me/201060991949",
  email: "elmohamadya2030@gmail.com",
  emailHref: "mailto:elmohamadya2030@gmail.com",
  address: "13 شارع أبو بكر الصديق — مدينة الأمل، مدينة نصر أول، القاهرة — مصر",
  chairman: "م/ خليفة حامد نجار الأحمر",
  chairmanTitle: "رئيس مجلس الإدارة والمدير التنفيذي",
  bio: "قيادة تنفيذية بخبرة في إدارة العقود والتوريدات والتعاون الدولي وتطوير الشراكات الاستراتيجية في قطاعات المعادن والمقاولات والتجارة العامة.",
  heroIntro:
    "شريك استراتيجي في المقاولات والتوريدات والتجارة الدولية، ومتخصصون في توريد وتصدير المعادن الثمينة والاستراتيجية وفق أعلى المعايير العالمية.",
};

export const CHAIRMAN_MESSAGE =
  "نحن فريقُ عملٍ من جميع جنسيات العالم، بكل لغاتهم وثقافاتهم. منذ عام 1995 وأنا أحلم بهذا الفريق؛ فشكّلته من خبرة أفضل شباب العالم في الذكاء والتفاني في العمل والمثابرة وتحمل الضغوط، وقُدتُهم سواءً كفريق أو كمجموعة. اخترناهم بعناية فائقة من أفضل الأطباء والمهندسين والاستشاريين المتخصصين في إيجاد الحلول التمويلية للمشاريع في شتى المجالات.";

export function waLink(message: string) {
  return `${COMPANY.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { label: "الرئيسية", to: "#top" },
  { label: "كلمة الرئيس", to: "#chairman" },
  { label: "لماذا المحمدية؟", to: "#why" },
  { label: "المعادن المطلوبة", to: "#metals" },
  { label: "أعمالنا", to: "#works" },
  { label: "تواصل معنا", to: "#contact" },
];
