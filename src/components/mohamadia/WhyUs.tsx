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
    <Section id="why" className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="لماذا المحمدية؟"
            eyebrowEn="Why Al Mohammadiya?"
            title={
              <>
                <span className="text-mh-black editorial-heading">INTEGRATED</span>{" "}
                <span className="text-mh-gold-deep editorial-heading">SOLUTIONS</span>{" "}
                <span className="text-mh-black editorial-heading">WITH TRUST</span>
              </>
            }
            subtitle="نقدم حلولاً تجارية متكاملة تجمع بين الخبرة التنفيذية والشبكات الدولية والالتزام الكامل بمعايير الجودة والموثوقية."
            subtitleEn="We provide integrated business solutions that combine executive expertise, international networks, and full commitment to quality and reliability standards."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {WHY_US.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={item.title} delay={(i % 2) * 0.12}>
                <div className="card-editorial group flex h-full items-start gap-5 rounded-2xl p-7">
                  <div className="grid size-12 shrink-0 place-items-center rounded-full bg-mh-black text-white transition-colors group-hover:bg-mh-gold-deep">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-mh-black">
                      {item.title}
                    </h3>
                    <p className="text-xs font-bold text-mh-gold-deep uppercase tracking-wider mt-1">
                      {item.titleEn}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-mh-black/50">
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
