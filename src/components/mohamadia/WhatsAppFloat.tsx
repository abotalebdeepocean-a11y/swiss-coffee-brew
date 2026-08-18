import { WhatsAppIcon } from "@/components/rovento/art";
import { COMPANY, waLink } from "./content";

export function WhatsAppFloat() {
  return (
    <a
      href={waLink(
        "السلام عليكم، أرغب في الاستفسار عن خدمات شركة المحمدية.",
      )}
      target="_blank"
      rel="noopener noreferrer"
      className="mh-export-hide fixed bottom-6 left-6 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.35)] transition-transform hover:scale-110"
      style={{ animation: "pulse-wa 2.4s ease-out infinite" }}
      aria-label="تواصل عبر واتساب"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
