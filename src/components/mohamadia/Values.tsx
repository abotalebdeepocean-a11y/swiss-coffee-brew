import { BadgeCheck, FileSignature, Globe, Handshake } from "lucide-react";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

const PILLARS = [
  { icon: BadgeCheck, title: "التزام بالجودة", sub: "والمواصفات" },
  { icon: Globe, title: "خبرة في الأسواق", sub: "العالمية" },
  { icon: FileSignature, title: "عقود دولية", sub: "موثقة" },
  { icon: Handshake, title: "شراكات دولية", sub: "موثقة" },
];

export function Values() {
  return (
    <Section id="values" className="bg-[#f8f6f1]">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="text-center text-xs font-black tracking-[0.3em] text-mh-gold-deep">
            قيمنا الراسخة
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {PILLARS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="group flex flex-col items-center text-center">
                <div className="relative">
                  <span
                    className="absolute -inset-3 rounded-full bg-mh-gold/15 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <div className="relative grid size-24 place-items-center rounded-full border-2 border-neutral-900 bg-white text-mh-gold-deep shadow-[0_14px_34px_rgba(10,10,10,0.1)] transition-all duration-300 group-hover:border-mh-gold group-hover:text-mh-gold md:size-28">
                    <item.icon className="size-9 md:size-10" />
                  </div>
                </div>
                <h3 className="mt-6 text-base font-black leading-snug text-neutral-900 md:text-lg">
                  {item.title}
                </h3>
                <p className="text-sm font-bold text-mh-gold-deep">{item.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
