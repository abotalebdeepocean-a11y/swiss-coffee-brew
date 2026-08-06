import { whatsappLink } from "@/lib/store";
import { WhatsAppIcon } from "./art";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("مرحبًا ROVENTO 👋 أرغب في الطلب من المتجر.")}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-5 start-5 z-40 flex items-center gap-3"
      aria-label="اطلب عبر واتساب"
    >
      <span className="hidden rounded-sm border border-white/10 bg-background/90 px-3 py-2 text-xs font-semibold backdrop-blur transition-all group-hover:bg-rv-red group-hover:text-white md:block">
        اطلب عبر واتساب
      </span>
      <span className="grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] animate-pulse-wa transition-transform group-hover:scale-110">
        <WhatsAppIcon className="size-7" />
      </span>
    </a>
  );
}
