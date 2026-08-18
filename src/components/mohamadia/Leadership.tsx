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
    <Section id="leadership" className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="ما يميز قيادتنا"
            title={
              <>
                رؤية قيادية <span className="text-mh-gold-deep">بمعايير عالمية</span>
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
                <div className="card-editorial group h-full rounded-2xl p-7">
                  <div className="grid size-12 place-items-center rounded-full bg-mh-black text-white transition-colors group-hover:bg-mh-gold-deep">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-black text-mh-black">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-7 text-mh-black/50">
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
