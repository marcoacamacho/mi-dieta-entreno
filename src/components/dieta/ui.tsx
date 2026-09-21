import { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`glass-card animate-fade-in-up rounded-2xl p-4 sm:p-5 ${className}`}>{children}</div>;
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-sm font-semibold text-slate-200 mb-3 tracking-wide">{children}</h2>;
}

export function CollapsibleHeader({
  title,
  open,
  onToggle,
}: {
  title: ReactNode;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button onClick={onToggle} className="flex w-full items-center justify-between text-left">
      <SectionTitle>{title}</SectionTitle>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${
          open ? "rotate-180" : "rotate-0"
        }`}
      >
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export function CollapsibleBody({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <div
      className={`grid transition-all duration-300 ease-in-out ${
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

export function ProgressBar({
  value,
  max,
  colorClass = "bg-lime-500",
}: {
  value: number;
  max: number;
  colorClass?: string;
}) {
  const pct = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  return (
    <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
      <div
        className={`h-full rounded-full ${colorClass} transition-all`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function CircularProgress({
  value,
  max,
  size = 128,
  strokeWidth = 11,
  colorClass = "stroke-lime-400",
  trackClass = "stroke-white/10",
  children,
}: {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  colorClass?: string;
  trackClass?: string;
  children?: ReactNode;
}) {
  const pct = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - pct);
  return (
    <div className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} fill="none" className={trackClass} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`${colorClass} transition-[stroke-dashoffset] duration-700 ease-out`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}

export function Badge({ children, tone = "indigo" }: { children: ReactNode; tone?: "indigo" | "emerald" | "amber" | "slate" }) {
  const tones: Record<string, string> = {
    indigo: "bg-lime-500/15 text-lime-300 border-lime-500/30",
    emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    amber: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    slate: "bg-white/5 text-slate-400 border-white/10",
  };
  return (
    <span
      className={`animate-pop inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

const CONFETTI_EMOJIS = ["🎉", "✨", "💪", "🔥", "⭐", "🥳"];

/** Ráfaga de confeti de un solo uso: solo "estalla" cuando `active` pasa de
 * false a true (al montarse), no se repite en cada re-render. */
export function Confetti({ active }: { active: boolean }) {
  if (!active) return null;
  const piezas = Array.from({ length: 14 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {piezas.map((i) => (
        <span
          key={i}
          className="animate-confetti-fall absolute top-0 text-base"
          style={{
            left: `${(i * 37) % 100}%`,
            animationDelay: `${(i % 5) * 0.08}s`,
            animationDuration: `${1.1 + (i % 4) * 0.15}s`,
          }}
        >
          {CONFETTI_EMOJIS[i % CONFETTI_EMOJIS.length]}
        </span>
      ))}
    </div>
  );
}
