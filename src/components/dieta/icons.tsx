export function IconHoy({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3.5" y="4.5" width="17" height="16" rx="3" stroke="currentColor" strokeWidth={1.7} />
      <path d="M3.5 9.5h17" stroke="currentColor" strokeWidth={1.7} />
      <path d="M8 3v3M16 3v3" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
      <path d="M8.5 14l2 2 4-4.5" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconProgreso({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 20V10M11 20V4M18 20v-7" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
      <path d="M4 20h16" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
    </svg>
  );
}

export function IconCompra({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 8h13l-1.4 9.1a2 2 0 01-2 1.7H8.4a2 2 0 01-2-1.7L5 8z" stroke="currentColor" strokeWidth={1.7} strokeLinejoin="round" />
      <path d="M8.5 8V6.5a3.5 3.5 0 017 0V8" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
    </svg>
  );
}

export function IconRecetas({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M5 4.5h9.5A3.5 3.5 0 0118 8v11.5H8.5A3.5 3.5 0 015 16V4.5z"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
      <path d="M5 16h13" stroke="currentColor" strokeWidth={1.7} />
      <path d="M8.5 8h6M8.5 11h6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
}

export function IconSuplementos({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect
        x="4.5"
        y="8.5"
        width="15"
        height="7"
        rx="3.5"
        transform="rotate(-45 12 12)"
        stroke="currentColor"
        strokeWidth={1.7}
      />
      <path d="M9.5 14.5l5-5" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
    </svg>
  );
}

export function IconPerfil({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="8.2" r="3.2" stroke="currentColor" strokeWidth={1.7} />
      <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
    </svg>
  );
}
