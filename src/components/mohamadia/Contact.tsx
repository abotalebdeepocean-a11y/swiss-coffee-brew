import { Phone, Mail, MapPin, Send } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-mh-black relative">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-mh-gold/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-mh-cream mb-4">
            تواصل <span className="text-mh-gold">معنا</span>
          </h2>
          <div className="gold-line w-24 mx-auto mb-6" />
          <p className="text-xl text-mh-cream/60 max-w-2xl mx-auto">
            نحن على استعداد للتعاون معكم في مشاريعكم القادمة
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="space-y-6">
            <div className="card-dark-editorial rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-mh-gold mb-6">
                بيانات التواصل
              </h3>

              <div className="space-y-6">
                <a
                  href="tel:+201060991949"
                  className="flex items-center gap-4 p-4 rounded-xl bg-mh-dark/50 hover:bg-mh-gold/10 transition-colors group"
                >
                  <div className="w-14 h-14 rounded-full bg-mh-gold/10 flex items-center justify-center group-hover:bg-mh-gold/20 transition-colors">
                    <Phone className="w-6 h-6 text-mh-gold" />
                  </div>
                  <div>
                    <div className="text-sm text-mh-cream/50 mb-1">الهاتف</div>
                    <div className="text-xl text-mh-cream font-medium" dir="ltr">
                      +20 106 099 1949
                    </div>
                  </div>
                </a>

                <a
                  href="mailto:elmohamadya2030@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-xl bg-mh-dark/50 hover:bg-mh-gold/10 transition-colors group"
                >
                  <div className="w-14 h-14 rounded-full bg-mh-gold/10 flex items-center justify-center group-hover:bg-mh-gold/20 transition-colors">
                    <Mail className="w-6 h-6 text-mh-gold" />
                  </div>
                  <div>
                    <div className="text-sm text-mh-cream/50 mb-1">البريد الإلكتروني</div>
                    <div className="text-lg text-mh-cream font-medium">
                      elmohamadya2030@gmail.com
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-mh-dark/50">
                  <div className="w-14 h-14 rounded-full bg-mh-gold/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-mh-gold" />
                  </div>
                  <div>
                    <div className="text-sm text-mh-cream/50 mb-1">العنوان</div>
                    <div className="text-lg text-mh-cream font-medium">
                      13 شارع أبو بكر الصديق - مدينة الأمل - مدينة نصر أول - القاهرة
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form placeholder */}
          <div className="card-dark-editorial rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-mh-gold mb-6">
              أرسل لنا رسالة
            </h3>

            <form className="space-y-4">
              <div>
                <label className="block text-sm text-mh-cream/60 mb-2">الاسم</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-mh-dark border border-mh-gold/20 text-mh-cream focus:border-mh-gold focus:outline-none transition-colors"
                  placeholder="أدخل اسمك"
                />
              </div>
              <div>
                <label className="block text-sm text-mh-cream/60 mb-2">البريد الإلكتروني</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl bg-mh-dark border border-mh-gold/20 text-mh-cream focus:border-mh-gold focus:outline-none transition-colors"
                  placeholder="أدخل بريدك الإلكتروني"
                />
              </div>
              <div>
                <label className="block text-sm text-mh-cream/60 mb-2">الرسالة</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-mh-dark border border-mh-gold/20 text-mh-cream focus:border-mh-gold focus:outline-none transition-colors resize-none"
                  placeholder="اكتب رسالتك هنا..."
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-mh-gold text-mh-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-mh-gold-soft transition-colors"
              >
                <Send className="w-5 h-5" />
                إرسال الرسالة
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
