import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQ_DATA = [
  {
    q: "إيه الفرق بين البريميوم والكلاسيك؟",
    a: "البريميوم 70% أرابيكا بتحميص متوسط-غامق، نكهات كراميل وشوكولاتة داكنة. الكلاسيك 50% أرابيكا و50% روبوستا بتحميص وسط، أقوى في الكريما والكافيين. البريميوم للذواقة، الكلاسيك للروتين اليومي.",
  },
  {
    q: "بتوصّلوا لكل محافظات مصر؟",
    a: "أيوه! بنوصّل لكل المحافظات في مصر. الشحن من 24 إلى 72 ساعة حسب المحافظة. الشحن مجاني على الطلبات فوق 500 ج.م.",
  },
  {
    q: "إزاي بحتفظ بالقهوة طازجة؟",
    a: "بنحمّص على دفعات صغيرة كل أسبوع. كل كيس فيه صمام أحادي الاتجاه يطلّع الغاز من الحبوب ويمنع دخول الهواء، فتفضل طازجة لأسابيع.",
  },
  {
    q: "بتقبلوا أنهي طرق الدفع؟",
    a: "بنقبل الدفع عند الاستلام (COD)، فودافون كاش، إنستاباي، فوري، وبطاقات ائتمان. الدفع عند الاستلام هو الأشهر في مصر وبنوفره لكل المحافظات.",
  },
  {
    q: "لو مش عاجباني أقدر أرجعه؟",
    a: "لو المنتج مش مفتوح، تقدر ترجعه خلال 7 أيام من الاستلام. لو فيه أي مشكلة في الجودة، تواصل معنا وهنحلها فورًا.",
  },
  {
    q: "بتعملوا خلطات مخصصة؟",
    a: "أيوه! عندنا Blend Lab تفاعلي تقدر تختار فيه نسبة الأرابيكا والروبوستا والتحميص والطحن والوزن. خلطتك بتتحمّص وتتغلّف يوم الطلب.",
  },
  {
    q: "إيه الصمام اللي على الكيس؟",
    a: "صمام أحادي الاتجاه (One-Way Valve) — بينطلق الغاز اللي بيطلع من القهوة المحمصة ويمنع دخول الهواء والأكسجين، فحتى لو الكيس مفتوح، القهوة تفضل طازجة.",
  },
  {
    q: "القهاوى بتاعتكم م.credentialsquartered فين؟",
    a: "حبوبنا بتتجمع من أجود مزارع الأرابيكا في إثيوبيا وكولومبيا والبرازيل. التحميص والتغليف بيحصلوا في مصر تحت إشراف مباشر.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-4 text-start transition-colors hover:text-rv-gold"
      >
        <span className="text-sm font-bold md:text-base">{q}</span>
        <ChevronDown
          className={cn(
            "size-5 flex-shrink-0 text-muted-foreground transition-transform duration-300",
            open && "rotate-180 text-rv-gold",
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
            <p className="pb-4 text-sm leading-relaxed text-stone-400">
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
    <section className="border-b border-white/10 bg-coffee-950 py-12 md:py-16">
      <div className="mx-auto w-full max-w-[800px] px-4 md:px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="grid size-10 place-items-center rounded-full bg-rv-gold/10">
            <HelpCircle className="size-5 text-rv-gold" />
          </div>
          <div>
            <h2 className="text-xl font-black md:text-2xl">
              أسئلة <span className="text-rv-gold">شائعة</span>
            </h2>
            <p className="text-xs text-muted-foreground">
              كل إجاباتك في مكان واحد
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 md:p-6">
          {FAQ_DATA.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
