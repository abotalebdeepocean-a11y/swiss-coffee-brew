import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQ_DATA = [
  {
    q: "كم مدة التوصيل؟",
    a: "التوصيل داخل القاهرة والجيزة خلال 24-48 ساعة. باقي المحافظات من 48-72 ساعة. ومجاني 100%.",
  },
  {
    q: "هل القهوة محمصة طازجة؟",
    a: "آه! كل كيس بيتحمص بعد الطلب مباشرة. ما بنخزنش. الطازجة هنا مش مجرد إعلان.",
  },
  {
    q: "ممكن أرجع المنتج لو مش عجبني؟",
    a: "طبعاً. عندك 14 يوم من تاريخ الاستلام لإرجاع أي منتج غير مفتوح — بنسترجعه وبنرد لك قيمة المنتج مخصومًا منها قيمة الشحن فقط. ولو فيه عيب صناعة، نبدله فوراً بدون أسئلة.",
  },
  {
    q: "الدفع عند الاستلام متاح؟",
    a: "آه، وبدون أي رسوم إضافية. كمان بنقبل فودافون كاش، فوري، وإنستا باي.",
  },
  {
    q: "بتقبلوا أنهي طرق الدفع؟",
    a: "بنقبل الدفع عند الاستلام (COD)، فودافون كاش، إنستاباي، فوري، وبطاقات ائتمان.",
  },
  {
    q: "بتوصّلوا لكل محافظات مصر؟",
    a: "أيوه! بنوصّل لكل المحافظات في مصر. الشحن من 24 إلى 72 ساعة حسب المحافظة. الشحن مجاني على كل الطلبات.",
  },
  {
    q: "إزاي بحتفظ بالقهوة طازجة؟",
    a: "بنحمّص على دفعات صغيرة كل أسبوع. كل كيس فيه صمام أحادي الاتجاه يطلّع الغاز من الحبوب ويمنع دخول الهواء، فتفضل طازجة لأسابيع.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.06] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-4 text-start transition-colors hover:text-[#c9a84c]"
      >
        <span className="text-sm font-bold text-[#f5efe6] md:text-base">
          {q}
        </span>
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-[#888888] transition-transform duration-300",
            open && "rotate-180 text-[#c9a84c]",
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm leading-relaxed text-[#888888]">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  return (
    <section className="bg-[#0a0a0a] py-16 md:py-20">
      <div className="mx-auto w-full max-w-[800px] px-4 md:px-6">
        <div className="mb-8 flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-full border border-[#c9a84c]/15 bg-[#c9a84c]/[0.06]">
            <HelpCircle className="size-5 text-[#c9a84c]" />
          </div>
          <div>
            <h2 className="text-xl font-black md:text-2xl">
              عندك سؤال؟ عندنا{" "}
              <span className="text-[#c9a84c]">إجابة</span> ☕
            </h2>
            <p className="text-xs text-[#888888]">كل إجاباتك في مكان واحد</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-[#111111] p-4 md:p-6">
          {FAQ_DATA.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
