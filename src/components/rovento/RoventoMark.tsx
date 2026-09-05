/**
 * RoventoMark — The "R" letterform merged with a golden eagle head silhouette.
 * Used as the single, consistent brand mark across the entire page.
 */
export function RoventoMark({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="ROVENTO"
      role="img"
    >
      <defs>
        <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e0c872" />
          <stop offset="50%" stopColor="#c9a84c" />
          <stop offset="100%" stopColor="#a08030" />
        </linearGradient>
        <linearGradient id="gold-grad-dark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c9a84c" />
          <stop offset="100%" stopColor="#7a6020" />
        </linearGradient>
      </defs>

      {/* R letterform */}
      <path
        d="M55 170V30h40c30 0 50 18 50 42s-20 42-50 42h-10l48 56h-32l-44-52v12zm24-72h14c18 0 28-10 28-24s-10-24-28-24H79v48z"
        fill="url(#gold-grad)"
      />

      {/* Eagle head silhouette merging from the top-right of the R */}
      <path
        d="M128 28c8-6 18-12 28-14 4-1 8 1 9 5 1 8-2 16-6 22-2 3-1 7 2 9l8 5c3 2 4 6 2 9l-6 10c-3 5-2 11 2 15l6 6c2 2 2 5 0 7l-8 4c-4 2-7 6-7 11 0 6 3 11 8 14l10 6c3 2 4 6 2 9-2 4-6 7-11 8l-12 2c-2 0-4 2-4 4v8l-10-8c-3-2-7-2-10 0l-14 12c-2 2-5 2-7 0l-8-10c-2-3-1-7 2-9l6-4"
        fill="url(#gold-grad-dark)"
        opacity="0.9"
      />

      {/* Eagle eye */}
      <circle cx="148" cy="52" r="3" fill="#050505" />
      <circle cx="149" cy="51" r="1" fill="#e0c872" />

      {/* Eagle beak */}
      <path
        d="M158 62l8-2c2-1 3-3 2-5-1-1-2-1-3 0l-7 4z"
        fill="#a08030"
      />
    </svg>
  );
}
