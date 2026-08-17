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
    <Section id="why" className="bg-white/[0.015]">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="لماذا المحمدية؟"
            title={
              <>
                حلول تجارية <span className="gold-gradient-text">متكاملة</span> بثقة
                وموثوقية
              </>
            }
            subtitle="نقدم حلولاً تجارية متكاملة تجمع بين الخبرة التنفيذية والشبكات الدولية والالتزام الكامل بمعايير الجودة والموثوقية."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {REASONS.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 0.12}>
              <div className="group flex h-full items-start gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-mh-gold/40 hover:bg-mh-gold/[0.05]">
                <div className="grid size-13 shrink-0 place-items-center rounded-2xl border border-mh-gold/30 bg-mh-gold/[0.08] text-mh-gold transition-colors group-hover:border-mh-gold/60 group-hover:text-mh-gold-soft">
                  <item.icon className="size-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-mh-gold-soft">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-400">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
