import {
  Boxes,
  CircleDollarSign,
  Coins,
  Gem,
  Layers,
  Pickaxe,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Section";

const METALS = [
  { icon: Coins, label: "النحاس (سبائك - أسلاك - بودرة)" },
  { icon: CircleDollarSign, label: "الذهب بجميع العيارات" },
  { icon: Gem, label: "الألماس الخام أو المصقول" },
  { icon: Layers, label: "النيكل كروم" },
  { icon: Pickaxe, label: "الرصاص والزنك والكوارتز" },
  { icon: Boxes, label: "الألومنيوم وسبائكه" },
];

export function Metals() {
  return (
    <Section id="metals" className="bg-[#f8f6f1]">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="المعادن المطلوبة"
            title={
              <>
                توريد وتصدير <span className="gold-text">المعادن الثمينة</span>{" "}
                والاستراتيجية
              </>
            }
            subtitle="نستقبل عروض التوريد والتصدير لهذه المعادن والعناصر وفق مواصفات محددة وأسعار تنافسية، مع فحص ومطابقة كاملة قبل الشحن."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {METALS.map((item, i) => (
            <Reveal key={item.label} delay={(i % 3) * 0.08}>
              <div className="group flex items-center gap-4 rounded-2xl border border-neutral-200 border-s-2 border-s-mh-gold bg-white px-6 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-300 hover:border-s-mh-gold-deep hover:shadow-[0_14px_30px_rgba(10,10,10,0.08)]">
                <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-mh-gold/40 bg-mh-gold/10 text-mh-gold-deep transition-colors group-hover:text-mh-gold">
                  <item.icon className="size-5" />
                </div>
                <p className="text-[15px] font-black leading-snug text-neutral-800">
                  {item.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-sm font-bold text-neutral-500">
            للاستفسار عن المواصفات والأسعار —{" "}
            <a
              href="#contact"
              className="text-mh-gold-deep underline-offset-4 hover:underline"
            >
              تواصل معنا
            </a>
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
