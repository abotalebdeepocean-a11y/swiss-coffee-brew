import { BadgeCheck, FileSignature, Globe, Handshake } from "lucide-react";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

const PILLARS = [
  {
    icon: BadgeCheck,
    title: "التزام بالجودة",
    sub: "والمواصفات",
  },
  {
    icon: Globe,
    title: "خبرة في الأسواق",
    sub: "العالمية",
  },
  {
    icon: FileSignature,
    title: "عقود دولية",
    sub: "موثقة",
  },
  {
    icon: Handshake,
    title: "شراكات دولية",
    sub: "موثقة",
  },
];

export function Values() {
  return (
    <Section id="values">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="text-center text-xs font-bold tracking-[0.3em] text-mh-gold">
            قيمنا الراسخة
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {PILLARS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="group flex flex-col items-center text-center">
                <div className="relative">
                  <span
                    className="absolute -inset-3 rounded-full bg-mh-gold/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <div className="relative grid size-24 place-items-center rounded-full border border-mh-gold/35 bg-gradient-to-b from-mh-navy-800 to-mh-navy-950 shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-105 md:size-28">
                    <item.icon className="size-9 text-mh-gold md:size-10" />
                  </div>
                </div>
                <h3 className="mt-6 text-base font-black leading-snug text-white md:text-lg">
                  {item.title}
                </h3>
                <p className="text-sm font-bold text-mh-gold">{item.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
