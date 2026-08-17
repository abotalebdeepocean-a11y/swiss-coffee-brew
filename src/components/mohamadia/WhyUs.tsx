import {
  ClipboardCheck,
  CreditCard,
  FileCheck2,
  Network,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Section";

const REASONS = [
  {
    icon: CreditCard,
    title: "حلول دفع مرنة",
    desc: "SBLC · LC · تحويلات بنكية — وفق متطلبات كل صفقة وطرف.",
  },
  {
    icon: FileCheck2,
    title: "عقود دولية موثقة",
    desc: "إجراءات احترافية موثقة تضمن حقوق جميع الأطراف.",
  },
  {
    icon: Network,
    title: "شبكة أعمال دولية",
    desc: "علاقات مباشرة مع موردين وشركاء في عدة أسواق عالمية.",
  },
  {
    icon: ClipboardCheck,
    title: "فحص ومطابقة",
    desc: "التأكد الكامل من الجودة والمواصفات قبل الشحن.",
  },
];

export function WhyUs() {
  return (
    <Section id="why" className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="لماذا المحمدية؟"
            title={
              <>
                حلول تجارية <span className="gold-text">متكاملة</span> بثقة
                وموثوقية
              </>
            }
            subtitle="نقدم حلولاً تجارية متكاملة تجمع بين الخبرة التنفيذية والشبكات الدولية والالتزام الكامل بمعايير الجودة والموثوقية."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {REASONS.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 0.12}>
              <div className="card-lux group flex h-full items-start gap-5 rounded-2xl bg-white p-7">
                <div className="grid size-13 shrink-0 place-items-center rounded-2xl border border-mh-gold/40 bg-mh-gold/10 text-mh-gold-deep transition-colors group-hover:border-mh-gold group-hover:text-mh-gold">
                  <item.icon className="size-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-mh-gold-deep">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-neutral-500">
                    {item.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
