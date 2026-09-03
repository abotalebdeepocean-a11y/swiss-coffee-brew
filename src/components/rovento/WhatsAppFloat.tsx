import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/store";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("مرحباً، عايز أعرف أكتر عن منتجات روفينتو")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-110 hover:shadow-green-500/40 animate-pulse-wa"
      aria-label="تواصل واتساب"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
