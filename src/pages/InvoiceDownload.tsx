import { Link } from "react-router";

export default function InvoiceDownload() {
  return (
    <div
      style={{
        fontFamily: "'Cairo', 'Tahoma', sans-serif",
        background: "#1a1410",
        color: "#f5f0e8",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #2c2218, #1a1410)",
          border: "1px solid rgba(212,175,55,.3)",
          borderRadius: 16,
          padding: "40px 30px",
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,.4)",
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            background: "linear-gradient(135deg, #d4af37, #b89728)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 900,
            color: "#1a1410",
            margin: "0 auto 16px",
          }}
        >
          R
        </div>

        <h1 style={{ fontSize: 22, fontWeight: 900, marginBottom: 6 }}>
          فاتورة <span style={{ color: "#d4af37" }}>روڤينتو</span>
        </h1>
        <p style={{ fontSize: 13, color: "#8a7a6a", marginBottom: 28 }}>
          ROVENTO — Sales Invoice A5
        </p>

        <div
          style={{
            background: "rgba(212,175,55,.08)",
            border: "1px solid rgba(212,175,55,.15)",
            borderRadius: 10,
            padding: 14,
            marginBottom: 24,
            fontSize: 13,
          }}
        >
          <strong style={{ color: "#d4af37" }}>📄 rovento-invoice-A5.doc</strong>
          <br />
          مقاس A5 • جاهز للطباعة • قابل للتعديل
        </div>

        <a
          href="/rovento-invoice-A5.doc"
          download="rovento-invoice-A5.doc"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "linear-gradient(135deg, #d4af37, #b89728)",
            color: "#1a1410",
            border: "none",
            borderRadius: 12,
            padding: "16px 36px",
            fontFamily: "'Cairo', sans-serif",
            fontSize: 16,
            fontWeight: 900,
            cursor: "pointer",
            textDecoration: "none",
            boxShadow: "0 4px 16px rgba(212,175,55,.3)",
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          تحميل ملف Word
        </a>

        <p
          style={{
            marginTop: 18,
            fontSize: 11,
            color: "#8a7a6a",
            lineHeight: 1.6,
          }}
        >
          اضغط الزر ثم افتح الملف بـ Microsoft Word
          <br />
          يمكنك تعديل أي بند مباشرة في الوورد
        </p>

        <div style={{ marginTop: 20 }}>
          <Link
            to="/"
            style={{
              color: "#d4af37",
              fontSize: 12,
              textDecoration: "none",
            }}
          >
            ← العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
