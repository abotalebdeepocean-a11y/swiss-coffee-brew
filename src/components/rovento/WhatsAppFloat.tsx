import { whatsappLink } from "@/lib/store";
import { WhatsAppIcon } from "./art";

export function WhatsAppFloat() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-row-reverse items-center gap-3">
      {/* فقاعة الترحيب */}
      <div className="hidden rounded-2xl border border-[#25D366]/50 bg-stone-900 px-4 py-2 text-xs font-bold text-stone-200 shadow-xl sm:block">
        محتاج ترشيح نوع القهوة المناسب ليك؟
        <br />
        <span className="text-[#25D366]">تواصل معنا الآن على واتساب!</span>
      </div>
      <a
        href={whatsappLink(
          "مرحبًا ROVENTO 👋 محتاج ترشيح نوع القهوة المناسب ليا. تقدر تساعدني؟",
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="اطلب عبر واتساب"
        className="grid size-14 place-items-center rounded-[10px] bg-[#25D366] text-white shadow-2xl transition duration-300 hover:scale-110 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(37,211,102,0.4)]"
      >
        <WhatsAppIcon className="size-7" />
      </a>
    </div>
  );
}
