export default function Ring({ value, max, label, caption }: { value: number; max: number; label: string; caption: string }) {
  const pct = max > 0 ? Math.min(1, value / max) : 0;
  const r = 52;
  const circumference = 2 * Math.PI * r;

  return (
    <div className="relative size-[140px] shrink-0">
      <svg viewBox="0 0 140 140" className="size-full -rotate-90" role="img" aria-label={`${caption}: ${value} of ${max}`}>
        <circle cx="70" cy="70" r={r} fill="none" stroke="var(--color-border)" strokeWidth="12" />
        <circle
          cx="70" cy="70" r={r} fill="none"
          stroke={pct >= 1 ? "var(--color-success)" : "var(--color-brand)"}
          strokeWidth="12" strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - pct)}
        />
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <span className="text-3xl font-extrabold leading-none text-ink">{label}</span>
        <span className="mt-1 text-[11px] font-extrabold tracking-[0.14em] text-muted">{caption}</span>
      </div>
    </div>
  );
}
