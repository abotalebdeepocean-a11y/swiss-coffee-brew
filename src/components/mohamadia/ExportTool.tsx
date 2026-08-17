import { useState } from "react";
import { snapdom } from "@zumer/snapdom";
import { Download, FileImage, FileText, Loader2, X } from "lucide-react";
import { jsPDF } from "jspdf";

/** Capture settings: fixed desktop width, dark navy background (JPEG has no
 *  alpha), embedded fonts, and the floating UI excluded from the export. */
const CAPTURE = {
  width: 1600,
  backgroundColor: "#060a12",
  embedFonts: true,
  cache: "full" as const,
  exclude: [".mh-export-hide"],
};

async function captureCanvas() {
  try {
    await document.fonts?.ready;
  } catch {
    /* continue anyway */
  }
  return snapdom.toCanvas(document.documentElement, CAPTURE);
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export function ExportTool() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState<"jpg" | "pdf" | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run(kind: "jpg" | "pdf") {
    setBusy(kind);
    setError(null);
    try {
      const canvas = await captureCanvas();
      if (kind === "jpg") {
        const blob = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob(resolve, "image/jpeg", 0.92),
        );
        if (!blob) throw new Error("تعذر إنشاء الصورة.");
        downloadBlob(blob, "mohamadia-profile.jpg");
      } else {
        const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [canvas.width, canvas.height],
          compress: true,
        });
        pdf.addImage(dataUrl, "JPEG", 0, 0, canvas.width, canvas.height);
        pdf.save("mohamadia-profile.pdf");
      }
      setOpen(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "فشل التصدير.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="mh-export-hide fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="w-64 rounded-2xl border border-white/10 bg-mh-navy-900/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <p className="text-sm font-black text-white">تصدير الصفحة</p>
            <button
              onClick={() => setOpen(false)}
              className="grid size-7 place-items-center rounded-full border border-white/15 text-slate-300 hover:text-white"
              aria-label="إغلاق"
            >
              <X className="size-3.5" />
            </button>
          </div>
          <p className="mt-1.5 text-[11px] leading-5 text-slate-400">
            صورة واحدة بطول الصفحة كاملة — JPG أو PDF.
          </p>
          <div className="mt-3 grid gap-2">
            <button
              onClick={() => run("jpg")}
              disabled={busy !== null}
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-mh-gold-soft via-mh-gold to-mh-gold-deep text-sm font-black text-mh-navy-950 transition hover:brightness-110 disabled:opacity-60"
            >
              {busy === "jpg" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <FileImage className="size-4" />
              )}
              {busy === "jpg" ? "جارٍ التصدير…" : "تنزيل JPG"}
            </button>
            <button
              onClick={() => run("pdf")}
              disabled={busy !== null}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-mh-gold/40 bg-mh-navy-800/70 text-sm font-black text-mh-gold-soft transition hover:bg-mh-gold/10 disabled:opacity-60"
            >
              {busy === "pdf" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <FileText className="size-4" />
              )}
              {busy === "pdf" ? "جارٍ التصدير…" : "تنزيل PDF"}
            </button>
          </div>
          {error && (
            <p className="mt-2 text-[11px] font-bold text-red-400">{error}</p>
          )}
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="grid size-14 place-items-center rounded-full border border-mh-gold/50 bg-mh-navy-900/90 text-mh-gold shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur transition hover:scale-105 hover:text-mh-gold-soft"
        aria-label="تصدير الصفحة كصورة أو PDF"
        title="تصدير الصفحة كصورة أو PDF"
      >
        <Download className="size-6" />
      </button>
    </div>
  );
}
