import { useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { Header } from "@/components/rovento/Header";
import { Footer } from "@/components/rovento/Footer";
import { WhatsAppFloat } from "@/components/rovento/WhatsAppFloat";

/* ═══════════ النص المعتمد — من نحن ═══════════ */
const ABOUT_TEXT = [
  "روفينتو محمصة قهوة مصرية، اتأسست بهدف واحد: إن الإسبريسو اللي يوصل لبيتك يكون بنفس جودة الإسبريسو اللي في أحسن الكافيهات.",
  "بنتعامل مع مزارع موثوقة في الجواتيمالا والهند وكولومبيا، وبنستورد حبوبنا مباشرة، وبنحمّصها على دفعات صغيرة في مصر قبل شحنها بوقت قصير — عشان الكيس اللي بيوصلك يكون طازج فعلًا، مش مخزّن من شهور.",
  "عندنا بلندان بس، وكل واحد فيهم معمول لهدف واضح: بار إنتنسو لإسبريسو قوي بكريمة غنية، وبريميوم لإسبريسو ناعم ومتوازن. مفيش كتالوج طويل — في قهوة مظبوطة.",
  "بنؤمن إن الجودة مش ترف. الجودة إن كل كيس يطلع من المحمصة بنفس المذاق اللي اتفقنا عليه، من أول كيس لآخر كيس.",
];

/* ═══════════ الشخصيتان الرمزيتان ═══════════ */
const CHARACTERS = [
  {
    name: "النسر — بريميوم",
    nameEn: "THE EAGLE — PREMIUM",
    desc: "النسر رمز الدقة والانتقائية. زي ما النسر بيختار مرتفعاته بعناية، بريميوم بلند متوازن من أرابيكا مرتفعات الجواتيمالا وروبوستا الهند عشان يطلع إسبريسو ناعم ومتوازن بنكهة فاخرة.",
    image: "/images/premium-bag.webp",
  },
  {
    name: "الببغاء — بار إنتنسو",
    nameEn: "THE PARROT — BAR INTENSO",
    desc: "الببغاء رمز الشخصية والجرأة. لونه مميز وصوته عالي، زي بار إنتنسو بالظبط: إسبريسو قوي وجريء بكريمة غنية، للي عايز قهوتها تفرض نفسها من غير مقدمات.",
    image: "/images/intenso-bag-front-new.webp",
  },
];

/* ═══════════ جدول المواصفات — بدون أسعار ═══════════ */
const SPECS = [
  {
    name: "بار إنتنسو",
    nameEn: "BAR INTENSO",
    ratio: "30% أرابيكا / 70% روبوستا",
    origin: "الجواتيمالا • كولومبيا",
    roast: "تحميص وسط",
  },
  {
    name: "بريميوم",
    nameEn: "PREMIUM",
    ratio: "50% أرابيكا / 50% روبوستا",
    origin: "الجواتيمالا • الهند",
    roast: "تحميص متوسط",
  },
];

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  useEffect(() => {
    document.title = "من نحن | ROVENTO — محمصة قهوة إسبريسو";
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
  }, []);

  return (
    <div
      dir="rtl"
      className="relative min-h-screen bg-[#0a0a0a] font-sans text-white antialiased"
    >
      <Header />

      <main className="pt-24 md:pt-32">
        {/* ─── Logo + tagline ─── */}
        <section className="px-4 pb-16 text-center md:px-6 md:pb-24">
          <FadeIn>
            <div className="mb-6 flex justify-center">
              <img
                src="/images/rovento-logo-real.webp"
                alt="ROVENTO"
                className="h-24 w-auto"
              />
            </div>
            <h1 className="mb-3 text-2xl font-black md:text-4xl">
              <span className="gold-gradient-text">
                قهوة إسبريسو محمّصة في مصر
              </span>
            </h1>
            <div className="rv-divider mx-auto mt-6 max-w-[400px]">
              <span className="text-xs text-[#c9a84c]/40">◆</span>
            </div>
          </FadeIn>
        </section>

        {/* ─── نص من نحن ─── */}
        <section className="px-4 pb-20 md:px-6 md:pb-28">
          <div className="mx-auto max-w-[760px] space-y-6">
            {ABOUT_TEXT.map((para, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <p className="text-base leading-loose text-[#b0a898] md:text-lg">
                  {para}
                </p>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ─── الشخصيتان الرمزيتان ─── */}
        <section className="border-t border-white/[0.06] bg-[#0a0a0a] px-4 py-20 md:px-6 md:py-28">
          <div className="mx-auto max-w-[1000px]">
            <FadeIn>
              <h2 className="mb-3 text-center text-2xl font-black md:text-3xl">
                <span className="gold-gradient-text">شخصيتان رمزيتان</span>
              </h2>
              <p className="mb-12 text-center text-sm text-[#888888]">
                كل بلند له شخصيته — وشخصية كل واحد مكتبة على الكيس
              </p>
            </FadeIn>

            <div className="grid gap-10 md:grid-cols-2 md:gap-12">
              {CHARACTERS.map((char, i) => (
                <FadeIn key={char.nameEn} delay={i * 0.15}>
                  <div className="flex h-full flex-col items-center rounded-2xl border border-white/[0.06] bg-[#111111] p-8 text-center">
                    <div className="mb-6">
                      <img
                        src={char.image}
                        alt={char.name}
                        className="mx-auto h-[200px] w-[150px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                      />
                    </div>
                    <p className="mb-1 font-condensed text-xs tracking-[0.3em] text-[#888888] uppercase">
                      {char.nameEn}
                    </p>
                    <h3 className="mb-4 text-lg font-black text-[#f5efe6]">
                      {char.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#b0a898]">
                      {char.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ─── جدول المواصفات — بدون أسعار ─── */}
        <section className="border-t border-white/[0.06] px-4 py-20 md:px-6 md:py-28">
          <div className="mx-auto max-w-[900px]">
            <FadeIn>
              <h2 className="mb-3 text-center text-2xl font-black md:text-3xl">
                <span className="gold-gradient-text">مواصفات البلندات</span>
              </h2>
              <p className="mb-12 text-center text-sm text-[#888888]">
                بيانات كل بلند — نسب الخلط والمصدر والتحميص
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="overflow-x-auto rounded-2xl border border-white/[0.06] bg-[#111111]">
                <table className="w-full text-right">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="px-5 py-4 text-xs font-black tracking-wider text-[#c9a84c] uppercase md:px-6">
                        البلند
                      </th>
                      <th className="px-5 py-4 text-xs font-black tracking-wider text-[#c9a84c] uppercase md:px-6">
                        نسبة الخلط
                      </th>
                      <th className="px-5 py-4 text-xs font-black tracking-wider text-[#c9a84c] uppercase md:px-6">
                        المنشأ
                      </th>
                      <th className="px-5 py-4 text-xs font-black tracking-wider text-[#c9a84c] uppercase md:px-6">
                        درجة التحميص
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {SPECS.map((row) => (
                      <tr
                        key={row.nameEn}
                        className="border-b border-white/[0.04] last:border-0"
                      >
                        <td className="px-5 py-5 md:px-6">
                          <p className="text-sm font-black text-[#f5efe6]">
                            {row.name}
                          </p>
                          <p className="mt-0.5 font-condensed text-[10px] tracking-[0.25em] text-[#888888] uppercase">
                            {row.nameEn}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm text-[#b0a898] md:px-6">
                          {row.ratio}
                        </td>
                        <td className="px-5 py-5 text-sm text-[#b0a898] md:px-6">
                          {row.origin}
                        </td>
                        <td className="px-5 py-5 text-sm text-[#b0a898] md:px-6">
                          {row.roast}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── بيانات التواصل الرسمية فقط ─── */}
        <section className="border-t border-white/[0.06] px-4 py-20 md:px-6 md:py-28">
          <div className="mx-auto max-w-[600px] text-center">
            <FadeIn>
              <h2 className="mb-3 text-2xl font-black md:text-3xl">
                <span className="gold-gradient-text">تواصلوا معنا</span>
              </h2>
              <p className="mb-10 text-sm text-[#888888]">
                بيانات التواصل الرسمية لمحمصة روفينتو
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 rounded-xl border border-white/[0.06] bg-[#111111] px-6 py-4">
                  <Phone className="size-4 shrink-0 text-[#c9a84c]" />
                  <span className="text-sm text-[#b0a898]">
                    01033012381 · 01042324842 · 01042320848
                  </span>
                </div>
                <div className="flex items-center justify-center gap-3 rounded-xl border border-white/[0.06] bg-[#111111] px-6 py-4">
                  <Mail className="size-4 shrink-0 text-[#c9a84c]" />
                  <a
                    href="mailto:info@rovento.site"
                    className="text-sm text-[#b0a898] transition-colors hover:text-[#c9a84c]"
                  >
                    info@rovento.site
                  </a>
                </div>
                <div className="flex items-center justify-center gap-3 rounded-xl border border-white/[0.06] bg-[#111111] px-6 py-4">
                  <MapPin className="size-4 shrink-0 text-[#c9a84c]" />
                  <span className="text-sm text-[#b0a898]">
                    المحمصة — القاهرة، مصر · www.rovento.site
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
