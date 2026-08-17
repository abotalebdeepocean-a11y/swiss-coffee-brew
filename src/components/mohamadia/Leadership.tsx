import {
  CalendarDays,
  Lightbulb,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Section";

const HIGHLIGHTS = [
  {
    icon: CalendarDays,
    title: "خبرة عملية منذ 1995",
    desc: "ثلاثة عقود من العمل التنفيذي في المقاولات والتوريدات وإدارة العقود.",
  },
  {
    icon: Users,
    title: "فريق متعدد الجنسيات والثقافات",
    desc: "فريق عمل من جميع جنسيات العالم، بكل لغاتهم وثقافاتهم.",
  },
  {
    icon: UserCheck,
    title: "اختيار الكفاءات بعناية فائقة",
    desc: "أفضل الأطباء والمهندسين والاستشاريين المتخصصين في كل مجال.",
  },
  {
    icon: TrendingUp,
    title: "حلول تمويلية مبتكرة للمشاريع",
    desc: "إيجاد الحلول التمويلية للمشاريع في شتى المجالات.",
  },
  {
    icon: ShieldCheck,
    title: "المثابرة وتحمل الضغوط",
    desc: "التزام كامل بالمثابرة وروح قيادية تتحمل أعباء المشاريع الكبرى.",
  },
  {
    icon: Lightbulb,
    title: "قيادة قائمة على الذكاء والتفاني",
    desc: "قيادة بالقدوة: ذكاء، تفانٍ في العمل، ورؤية بعيدة المدى.",
  },
];

export function Leadership() {
  return (
    <Section id="leadership" className="bg-white/[0.015]">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="ما يميز قيادتنا"
            title={
              <>
                رؤية قيادية <span className="gold-gradient-text">بمعايير عالمية</span>
              </>
            }
            subtitle="نؤمن أن نجاح الشركات الكبرى يبدأ من اختيار الكفاءات وبناء فريق قادر على تحمل المسؤولية والابتكار في كل تفصيلة."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTS.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.1}>
              <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-mh-gold/40 hover:bg-mh-gold/[0.05]">
                <div className="grid size-13 place-items-center rounded-2xl border border-mh-gold/30 bg-mh-gold/[0.08] text-mh-gold transition-colors group-hover:border-mh-gold/60 group-hover:text-mh-gold-soft">
                  <item.icon className="size-6" />
                </div>
                <h3 className="mt-5 text-lg font-black text-white">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-7 text-slate-400">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
