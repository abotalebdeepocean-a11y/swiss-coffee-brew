import { COMPANY, WHO_WE_ARE } from "./content";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Section";

export function WhoWeAre() {
  return (
    <Section id="who" className="bg-[#0a0a0a]">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="من نحن"
            title={
              <>
                <span className="gold-text">شركة المحمدية</span>
                <br />
                للمقاولات العامة والتوريدات العمومية
              </>
            }
            subtitle={WHO_WE_ARE}
          />
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mx-auto mt-14 max-w-3xl text-center">
            <p className="text-lg leading-9 text-white/60 md:text-xl md:leading-10">
              {COMPANY.vision}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
