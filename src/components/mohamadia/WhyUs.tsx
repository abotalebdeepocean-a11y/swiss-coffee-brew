import {
  ClipboardCheck,
  CreditCard,
  FileCheck2,
  Network,
} from "lucide-react";
import { WHY_US } from "./content";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Section";

const ICONS = [CreditCard, FileCheck2, Network, ClipboardCheck];

export function WhyUs() {
  return (
    <Section id="why" className="bg-[#0d0d0d]">
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
          {WHY_US.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={item.title} delay={(i % 2) * 0.12}>
                <div className="card-dark group flex h-full items-start gap-5 rounded-2xl p-7">
                  <div className="grid size-13 shrink-0 place-items-center rounded-2xl border border-mh-gold/30 bg-mh-gold/10 text-mh-gold transition-colors group-hover:border-mh-gold/60">
                    <Icon className="size-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-mh-gold-soft">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-white/50">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
