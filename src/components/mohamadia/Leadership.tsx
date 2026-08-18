import {
  CalendarDays,
  Lightbulb,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import { LEADERSHIP } from "./content";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Section";

const ICONS = [CalendarDays, Users, UserCheck, TrendingUp, ShieldCheck, Lightbulb];

export function Leadership() {
  return (
    <Section id="leadership" className="bg-[#0d0d0d]">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="ما يميز قيادتنا"
            title={
              <>
                رؤية قيادية <span className="gold-text">بمعايير عالمية</span>
              </>
            }
            subtitle="نؤمن أن نجاح الشركات الكبرى يبدأ من اختيار الكفاءات وبناء فريق قادر على تحمل المسؤولية والابتكار في كل تفصيلة."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LEADERSHIP.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={item.title} delay={(i % 3) * 0.1}>
                <div className="card-dark group h-full rounded-2xl p-7">
                  <div className="grid size-13 place-items-center rounded-2xl border border-mh-gold/30 bg-mh-gold/10 text-mh-gold transition-colors group-hover:border-mh-gold/60">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-black text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-7 text-white/50">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
