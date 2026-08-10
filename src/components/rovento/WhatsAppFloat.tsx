import { whatsappLink } from "@/lib/store";
import { WhatsAppIcon } from "./art";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(
        "مرحبًا ROVENTO 👋 محتاج ترشيح نوع القهوة المناسب ليا. تقدر تساعدني؟",
      )}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-5 start-5 z-40 flex items-center gap-3"
      aria-label="اطلب عبر واتساب"
    >
      {/* فقاعة الترحيب */}
      <span className="hidden max-w-[240px] rounded-sm border border-white/10 bg-background/95 px-4 py-3 text-xs font-semibold leading-relaxed backdrop-blur transition-all group-hover:bg-rv-red group-hover:text-white md:block">
        محتاج ترشيح نوع القهوة المناسب ليك؟ 💬
      </span>
      {/* دائرة أكبر */}
      <span className="grid size-16 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_12px_35px_rgba(37,211,102,0.4)] animate-pulse-wa transition-transform group-hover:scale-110 md:size-[4.5rem]">
        <WhatsAppIcon className="size-8" />
      </span>
    </a>
  );
}
