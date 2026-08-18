import { BadgeCheck, FileSignature, Globe, Handshake } from "lucide-react";
import { VALUES } from "./content";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

const ICONS = [BadgeCheck, Globe, FileSignature, Handshake];

export function Values() {
  return (
    <Section id="values" className="bg-[#0a0a0a]">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="text-center text-xs font-black tracking-[0.3em] text-mh-gold-deep">
            قيمنا الراسخة
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {VALUES.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="group flex flex-col items-center text-center">
                  <div className="relative">
                    <span
                      className="absolute -inset-3 rounded-full bg-mh-gold/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                    <div className="relative grid size-24 place-items-center rounded-full border-2 border-mh-gold/40 bg-[#111] text-mh-gold shadow-[0_14px_34px_rgba(0,0,0,0.4)] transition-all duration-300 group-hover:border-mh-gold md:size-28">
                      <Icon className="size-9 md:size-10" />
                    </div>
                  </div>
                  <h3 className="mt-6 text-base font-black leading-snug text-white md:text-lg">
                    {item.title}
                  </h3>
                  <p className="text-sm font-bold text-mh-gold-soft">{item.sub}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
