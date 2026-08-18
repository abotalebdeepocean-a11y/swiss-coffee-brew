import { BadgeCheck, FileSignature, Globe, Handshake } from "lucide-react";
import { VALUES } from "./content";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

const ICONS = [BadgeCheck, Globe, FileSignature, Handshake];

export function Values() {
  return (
    <Section id="values" className="bg-mh-cream">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="text-center text-xs font-black tracking-[0.3em] uppercase text-mh-gold-deep editorial-heading">
            OUR CORE VALUES
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {VALUES.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="group flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="relative grid size-24 place-items-center rounded-full border-2 border-mh-black/10 bg-white shadow-[0_14px_34px_rgba(0,0,0,0.06)] transition-all duration-300 group-hover:border-mh-gold md:size-28">
                      <Icon className="size-9 text-mh-black md:size-10" />
                    </div>
                  </div>
                  <h3 className="mt-6 text-base font-black leading-snug text-mh-black md:text-lg">
                    {item.title}
                  </h3>
                  <p className="text-xs font-bold text-mh-gold-deep uppercase tracking-wider">
                    {item.titleEn}
                  </p>
                  <p className="text-sm font-bold text-mh-gold-deep">{item.sub}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
