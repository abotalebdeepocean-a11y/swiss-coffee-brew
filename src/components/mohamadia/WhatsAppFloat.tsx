import { WhatsAppIcon } from "@/components/rovento/art";
import { waLink } from "./content";

export function WhatsAppFloat() {
  return (
    <a
      href={waLink("السلام عليكم، أرغب في الاستفسار عن خدمات شركة المحمدية.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل عبر واتساب"
      className="mh-export-hide fixed bottom-6 left-6 z-40 grid size-14 place-items-center rounded-full border-2 border-neutral-900 bg-[#25d366] text-white shadow-[0_12px_30px_rgba(10,10,10,0.3)] transition-transform hover:scale-105"
    >
      <span
        className="absolute inset-0 rounded-full bg-[#25d366] opacity-40 animate-ping [animation-duration:2.2s]"
        aria-hidden="true"
      />
      <WhatsAppIcon className="relative size-7" />
    </a>
  );
}
