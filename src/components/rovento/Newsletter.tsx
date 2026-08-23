import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Gift, Check } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-coffee-950 via-[#1a160e] to-coffee-950 py-12 md:py-16">
      {/* توهج */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_50%,rgba(212,175,55,0.08),transparent_70%)]" />

      <div className="relative z-10 mx-auto w-full max-w-[600px] px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-rv-gold/10">
            <Gift className="size-7 text-rv-gold" />
          </div>

          <h2 className="text-xl font-black md:text-2xl">
            اشترك واحصل على{" "}
            <span className="text-rv-gold">10% خصم</span>
          </h2>
          <p className="mt-2 text-sm text-stone-400">
            سجّل بريدك وهنبعتلك كود الخصم فورًا + أحدث العروض
          </p>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-6 flex items-center justify-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-4"
            >
              <Check className="size-5 text-emerald-400" />
              <span className="text-sm font-bold text-emerald-400">
                تم التسجيل! تحقق من بريدك
              </span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="بريدك الإلكتروني"
                  required
                  className="h-12 w-full rounded-xl border border-white/15 bg-white/5 pe-4 ps-10 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-rv-gold focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="h-12 rounded-xl bg-rv-gold px-6 text-sm font-black text-black transition-all hover:bg-rv-gold/90 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                اشترك
              </button>
            </form>
          )}

          <p className="mt-3 text-[10px] text-stone-600">
            بالاشتراك أنت توافق على سياسة الخصوصية. يمكنك إلغاء الاشتراك في أي وقت.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
