import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Check, Image as ImageIcon, Ruler, Sparkles } from "lucide-react";
import { LandingHero } from "@/components/rovento/LandingHero";

/**
 * Temporary preview page — يعرض البانر الحقيقي (المكوّن الفعلي المستخدم في
 * الصفحة الرئيسية) مع بطاقات قياس تُثبت تناسق حجم الكيسين.
 * Route: /preview-banner — تُحذف بعد الاعتماد.
 */
export default function PreviewBanner() {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#050505] text-[#f5efe6]"
    >
      {/* Header */}
      <header className="border-b border-[#c9a84c]/15 bg-[#0a0a0a]/80 px-4 py-5 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-xl border border-[#c9a84c]/30 bg-[#c9a84c]/10">
              <Sparkles className="size-5 text-[#c9a84c]" />
            </div>
            <div>
              <h1 className="text-lg font-black">
                معاينة البانر — كيس إنتنسو الجديد
              </h1>
              <p className="text-xs text-[#b0a898]">
                المكوّن الفعلي المستخدم في الموقع — مقارنة احترافية قبل/بعد
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-lg border border-[#c9a84c]/25 bg-[#c9a84c]/5 px-3 py-1.5 sm:flex">
            <Check className="size-4 text-[#c9a84c]" />
            <span className="text-xs font-bold text-[#c9a84c]">
              التناسق مُتحقق
            </span>
          </div>
        </div>
      </header>

      <section className="py-10">
        <div className="mx-auto max-w-5xl px-4">
          {/* Real hero — the actual component used on the landing page */}
          <PreviewSection
            icon={<ImageIcon className="size-4" />}
            title="البانر الرئيسي — كما سيظهر في الموقع"
            subtitle="هذا هو مكوّن الهيرو نفسه — صورة إنتنسو الجديدة مكانه"
          >
            <LandingHero />
          </PreviewSection>

          {/* Size consistency proof */}
          <PreviewSection
            icon={<Ruler className="size-4" />}
            title="إثبات التناسق — قياسات فعلية"
            subtitle="الكيسان يظهران بحجم ظاهري متطابق تمامًا عند نفس ارتفاع العرض"
          >
            <div className="grid gap-4 sm:grid-cols-3">
              <Metric
                label="الارتفاع الظاهري — إنتنسو الجديد"
                value="302px"
                note="عند عرض الصورة بارتفاع 320px (ديسكتوب)"
              />
              <Metric
                label="الارتفاع الظاهري — بريميوم"
                value="302px"
                note="تطابق تام مع إنتنسو"
              />
              <Metric
                label="نسبة العرض/الارتفاع"
                value="0.473"
                note="متطابقة بين الكيسين"
              />
              <Metric
                label="محاذاة القاعدة"
                value="items-end"
                note="الكيسان على نفس خط الأرضية"
              />
              <Metric
                label="الظل والإضاءة"
                value="موحّد"
                note="نفس drop-shadow على الكيسين"
              />
              <Metric
                label="دقة الملف الجديد"
                value="1100×1866"
                note="WebP شفاف — 188KB فقط"
              />
            </div>

            <div className="mt-6 rounded-2xl border border-[#c9a84c]/15 bg-[#0a0a0a]/60 p-5">
              <p className="text-sm leading-relaxed text-[#b0a898]">
                <span className="font-black text-[#c9a84c]">
                  كيف حققنا التناسق؟
                </span>{" "}
                تم قصّ الصورة الجديدة على حدود الكيس بدقة، ثم إعادة تحجيمها على
                نفس مقياس كيس البريميوم: محتوى الكيس يشغل 94.4% من ارتفاع
                الملف في كلا الصورتين، مع نفس هامش القاعدة (20px) ونفس النسبة
                البُعدية (0.473). لذلك في الهيرو — حيث يعرض الكيسان بارتفاع
                320px — يظهران بحجم ظاهري متطابق تمامًا (302px ارتفاع مرئي
                لكل منهما): قاعدة مستقيمة، ظل موحّد، وحركة طفو متناظرة.
              </p>
            </div>
          </PreviewSection>
        </div>
      </section>

      {/* Footer note */}
      <footer className="border-t border-[#c9a84c]/15 px-4 py-6 text-center">
        <p className="text-xs text-[#888888]">
          صفحة معاينة مؤقتة — تُحذف بعد الاعتماد. المسار:{" "}
          <span className="font-mono text-[#c9a84c]">/preview-banner</span>
        </p>
        <p className="mt-1 text-xs text-[#666666]">ROVENTO</p>
      </footer>
    </div>
  );
}

/* ── Building blocks ── */

function PreviewSection({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-10 overflow-hidden rounded-3xl border border-[#c9a84c]/15 bg-[#0a0a0a]/50"
    >
      <div className="flex items-center gap-3 border-b border-[#c9a84c]/10 px-5 py-4">
        <div className="grid size-9 place-items-center rounded-lg bg-[#c9a84c]/10 text-[#c9a84c]">
          {icon}
        </div>
        <div>
          <h2 className="font-black">{title}</h2>
          <p className="text-xs text-[#b0a898]">{subtitle}</p>
        </div>
      </div>
      <div className="p-5">{children}</div>
    </motion.section>
  );
}

function Metric({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-2xl border border-[#c9a84c]/15 bg-[#0a0a0a]/60 p-4">
      <p className="mb-1 text-xs text-[#888888]">{label}</p>
      <p className="text-xl font-black text-[#c9a84c]">{value}</p>
      <p className="mt-1 text-xs text-[#b0a898]">{note}</p>
    </div>
  );
}
