import Link from "next/link";
import type { ReactNode } from "react";

type Skill = { name: string; band: number; href: string; color: string; icon: ReactNode };

const icon = (d: ReactNode) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
);

const skills: Skill[] = [
  { name: "Reading", band: 7.5, href: "/reading", color: "#4169d8", icon: icon(<path d="M12 6.5C10 5 7 4.6 4 5v12c3-.4 6 0 8 1.5 2-1.5 5-1.9 8-1.5V5c-3-.4-6 0-8 1.5ZM12 6.5v12" />) },
  { name: "Listening", band: 7.0, href: "/listening", color: "#b34fc4", icon: icon(<path d="M4 15v-3a8 8 0 0 1 16 0v3M4 15h3v5H5a1 1 0 0 1-1-1v-4Zm16 0h-3v5h2a1 1 0 0 0 1-1v-4Z" />) },
  { name: "Writing", band: 6.5, href: "/writing", color: "#f28a45", icon: icon(<path d="m4 20 1-4L16.5 4.5a2 2 0 0 1 3 3L8 19l-4 1ZM14 7l3 3" />) },
  { name: "Speaking", band: 7.0, href: "/speaking", color: "#1f9d8b", icon: icon(<path d="M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3ZM5 11a7 7 0 0 0 14 0M12 18v3" />) },
];

const TARGET = 7.5;
const overall = Math.round((skills.reduce((s, k) => s + k.band, 0) / skills.length) * 2) / 2;
const gap = TARGET - overall;

// Segmented ring: one quarter per skill, clockwise from the top.
const C = 90;
const RING_R = 68;
const GAP_DEG = 8;

function arc(fromDeg: number, toDeg: number) {
  const pt = (d: number) => {
    const a = ((d - 90) * Math.PI) / 180;
    return [C + RING_R * Math.cos(a), C + RING_R * Math.sin(a)];
  };
  const [x1, y1] = pt(fromDeg);
  const [x2, y2] = pt(toDeg);
  return `M${x1.toFixed(2)} ${y1.toFixed(2)}A${RING_R} ${RING_R} 0 ${toDeg - fromDeg > 180 ? 1 : 0} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

function Ring() {
  const summary = skills.map((s) => `${s.name} ${s.band.toFixed(1)}`).join(", ");
  return (
    <div className="relative size-[190px] shrink-0">
      <svg viewBox="0 0 180 180" className="size-full" role="img" aria-label={`Overall band ${overall.toFixed(1)}. ${summary}.`}>
        {skills.map((s, i) => {
          const start = i * 90 + GAP_DEG / 2;
          const span = 90 - GAP_DEG;
          return (
            <g key={s.name} fill="none" strokeWidth="15" strokeLinecap="round">
              <path d={arc(start, start + span)} stroke={s.color} strokeOpacity="0.18" />
              <path d={arc(start, start + span * (s.band / 9))} stroke={s.color} />
            </g>
          );
        })}
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <span className="text-[11px] font-extrabold tracking-[0.18em] text-muted">OVERALL</span>
        <span className="text-6xl font-extrabold leading-none tracking-tight text-ink">{overall.toFixed(1)}</span>
      </div>
    </div>
  );
}

function Delta({ band }: { band: number }) {
  const d = band - TARGET;
  return (
    <span className={`text-xs font-bold ${d >= 0 ? "text-success" : "text-muted"}`}>
      {d >= 0 ? "✓ On target" : `${d.toFixed(1)} to target`}
    </span>
  );
}

export default function SampleReport() {
  return (
    <div className="relative">
      <div
        className="absolute -top-5 -right-2 z-10 grid size-24 rotate-12 place-items-center rounded-full border-4 border-white bg-brand text-center text-[11px] font-extrabold leading-tight tracking-wider text-white shadow-lg sm:-right-5"
        aria-hidden="true"
      >
        SAMPLE
        <br />
        REPORT
      </div>
      <div
        className="absolute -bottom-4 -left-3 z-10 rotate-[-4deg] rounded-full bg-gold px-4 py-2 text-sm font-extrabold text-ink shadow-lg sm:-left-6"
        aria-hidden="true"
      >
        🔥 12-day streak
      </div>

      <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_12px_40px_rgba(17,24,39,0.10)]">
        <div className="flex h-2" aria-hidden="true">
          {skills.map((s) => (
            <span key={s.name} className="flex-1" style={{ background: s.color }} />
          ))}
        </div>

        <div className="p-5 sm:p-7">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
            <Ring />
            <div className="text-center sm:text-left">
              <p className="text-xs font-extrabold tracking-[0.18em] text-brand">YOUR BAND REPORT</p>
              <p className="mt-2 text-2xl font-extrabold leading-snug text-ink">
                {gap > 0 ? (
                  <>
                    {gap === 0.5 ? "Half a band" : `${gap.toFixed(1)} bands`} to go
                  </>
                ) : (
                  "Target reached!"
                )}
              </p>
              <p className="mt-1 text-muted">
                Your goal is <b className="text-ink">Band {TARGET.toFixed(1)}</b>. Lift Writing next for the fastest gain.
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-sm font-bold text-success">
                ▲ +0.5 this month
              </span>
            </div>
          </div>

          <ul className="mt-7 grid grid-cols-2 gap-3">
            {skills.map((s) => (
              <li key={s.name}>
                <Link
                  href={s.href}
                  className="flex items-center gap-3 rounded-2xl border p-3.5 transition-transform hover:-translate-y-0.5"
                  style={{ background: `${s.color}14`, borderColor: `${s.color}40` }}
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl text-white" style={{ background: s.color }}>
                    {s.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-ink">{s.name}</span>
                    <span className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold leading-tight text-ink">{s.band.toFixed(1)}</span>
                    </span>
                    <Delta band={s.band} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
