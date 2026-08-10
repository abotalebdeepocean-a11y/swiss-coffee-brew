import { whatsappLink } from "@/lib/store";
import { WhatsAppIcon } from "./art";

export function WhatsAppFloat() {
  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
      {/* فقاعة الترحيب */}
      <div className="hidden rounded-2xl border border-emerald-500/50 bg-stone-900 px-4 py-2 text-xs font-bold text-stone-200 shadow-xl sm:block">
        محتاج ترشيح نوع القهوة المناسب ليك؟
        <br />
        <span className="text-emerald-400">تواصل معنا الآن على واتساب!</span>
      </div>
      <a
        href={whatsappLink(
          "مرحبًا ROVENTO 👋 محتاج ترشيح نوع القهوة المناسب ليا. تقدر تساعدني؟",
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="اطلب عبر واتساب"
        className="grid size-14 place-items-center rounded-full bg-emerald-500 text-white shadow-2xl transition duration-300 hover:scale-110 hover:bg-emerald-600"
      >
        <WhatsAppIcon className="size-7" />
      </a>
    </div>
  );
}
