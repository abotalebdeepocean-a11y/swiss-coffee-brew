import { useState } from "react";
import { Download, FileImage, FileText, Loader2, X } from "lucide-react";
import { snapdom } from "@zumer/snapdom";
import { jsPDF } from "jspdf";

type Format = "jpg" | "pdf";

export function ExportTool() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  async function download(format: Format) {
    setBusy(true);
    try {
      const el = document.getElementById("mohamadia-export-target");
      if (!el) return;

      const canvas = await snapdom.toCanvas(el, { fast: true });

      if (format === "jpg") {
        const blob = await new Promise<Blob>((resolve) =>
          canvas.toBlob((b) => resolve(b!), "image/jpeg", 0.92),
        );
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "mohamadia-profile.jpg";
        a.click();
        URL.revokeObjectURL(url);
      } else {
        const imgData = canvas.toDataURL("image/png");
        const img = new Image();
        img.src = imgData;
        await new Promise((r) => {
          img.onload = r;
        });

        const pxW = img.naturalWidth;
        const pxH = img.naturalHeight;
        const mmW = 210;
        const mmH = (pxH / pxW) * mmW;

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: [mmW, mmH],
        });
        pdf.addImage(imgData, "PNG", 0, 0, mmW, mmH);
        pdf.save("mohamadia-profile.pdf");
      }
    } catch (e) {
      console.error("Export failed", e);
    } finally {
      setBusy(false);
      setOpen(false);
    }
  }

  return (
    <div className="mh-export-hide fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {open && (
        <div className="flex flex-col gap-2 rounded-2xl border border-mh-black/10 bg-white p-2 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
          <button
            onClick={() => download("jpg")}
            disabled={busy}
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-mh-black transition-colors hover:bg-mh-cream disabled:opacity-50"
          >
            <FileImage className="size-4 text-mh-gold-deep" />
            تنزيل JPG
          </button>
          <button
            onClick={() => download("pdf")}
            disabled={busy}
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-mh-black transition-colors hover:bg-mh-cream disabled:opacity-50"
          >
            <FileText className="size-4 text-mh-gold-deep" />
            تنزيل PDF
          </button>
        </div>
      )}

      <button
        onClick={() => {
          if (!busy) setOpen((v) => !v);
        }}
        disabled={busy}
        className="grid size-14 place-items-center rounded-full bg-mh-black text-white shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-transform hover:scale-110 disabled:opacity-70"
        aria-label="تصدير الصفحة"
      >
        {busy ? (
          <Loader2 className="size-6 animate-spin" />
        ) : open ? (
          <X className="size-5" />
        ) : (
          <Download className="size-5" />
        )}
      </button>
    </div>
  );
}
