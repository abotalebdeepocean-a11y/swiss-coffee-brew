import { COMPANY, WHO_WE_ARE, WHO_WE_ARE_EN } from "./content";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Section";

export function WhoWeAre() {
  return (
    <Section id="who" className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="من نحن"
            eyebrowEn="About Us"
            title={
              <>
                <span className="text-mh-black editorial-heading">WHO WE ARE</span>
                <br />
                <span className="text-mh-gold-deep editorial-heading">{COMPANY.nameEn}</span>
              </>
            }
            subtitle={WHO_WE_ARE}
            subtitleEn={WHO_WE_ARE_EN}
          />
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mx-auto mt-14 max-w-3xl text-center">
            <div className="w-16 h-0.5 bg-mh-gold mx-auto mb-8" />
            <p className="text-lg leading-9 text-mh-black/50 md:text-xl md:leading-10">
              {COMPANY.vision}
            </p>
            <p className="mt-4 text-sm leading-7 text-mh-black/30 italic">
              {COMPANY.visionEn}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
