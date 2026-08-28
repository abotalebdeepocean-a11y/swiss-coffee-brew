import { Download, FileArchive, Package } from "lucide-react";

export default function DownloadProject() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-[#0d0b09] px-4 py-20">
      <div className="w-full max-w-lg rounded-3xl border border-rv-gold/30 bg-white/[0.03] p-8 text-center shadow-2xl">
        <div className="mx-auto mb-6 grid size-20 place-items-center rounded-full bg-rv-gold/10">
          <Package className="size-10 text-rv-gold" />
        </div>

        <h1 className="text-2xl font-black text-white">تحميل مشروع Rovento</h1>
        <p className="mt-2 text-sm text-stone-400">
          كل ملفات الموقع في ملف مضغوط واحد (5.6 MB)
        </p>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-right text-xs text-stone-400">
          <p className="mb-2 font-bold text-stone-300">📁 الملف يحتوي على:</p>
          <ul className="space-y-1">
            <li>✅ src/components/rovento/* — كل مكونات الموقع</li>
            <li>✅ src/lib/* — بيانات المنتجات والمتجر</li>
            <li>✅ src/pages/* — الصفحات الرئيسية</li>
            <li>✅ public/images/* — صور اللوجو والحبوب</li>
            <li>✅ index.html + package.json + vite.config.ts</li>
          </ul>
        </div>

        <a
          href="/rovento-project.tar.gz"
          download="rovento-project.tar.gz"
          className="mt-8 inline-flex h-14 items-center gap-3 rounded-2xl bg-gradient-to-r from-rv-gold to-[#b89728] px-10 text-base font-black text-black shadow-lg shadow-rv-gold/20 transition hover:-translate-y-0.5 hover:shadow-rv-gold/40"
        >
          <Download className="size-5" />
          📦 تحميل المشروع كامل
          <FileArchive className="size-5" />
        </a>

        <p className="mt-4 text-[11px] text-stone-500">
          صيغة: tar.gz — استخرجها بـ <span className="text-stone-300">tar -xzf</span> أو WinRAR
        </p>
      </div>
    </section>
  );
}
