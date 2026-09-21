/** Silueta humana estilizada tipo "escáner holográfico", con un giro 3D en
 * CSS (perspective + rotateY). Al ser una silueta simétrica, al girar se ve
 * bien todo el recorrido: no es un modelo 3D real (necesitaría un motor 3D
 * y un asset que no tenemos), pero da ese efecto de "escultura girando". */
export function RotatingFigure({ size = 140 }: { size?: number }) {
  return (
    <div className="relative mx-auto" style={{ width: size, height: size, perspective: 700 }}>
      <div
        className="animate-spin-3d absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        <svg viewBox="0 0 100 190" className="h-full w-full overflow-visible" style={{ filter: "drop-shadow(0 0 14px rgba(56,189,248,0.55))" }}>
          <defs>
            <linearGradient id="figuraGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="45%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
            <radialGradient id="baseGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0" />
            </radialGradient>
          </defs>

          <ellipse cx="50" cy="182" rx="30" ry="6" fill="url(#baseGlow)" />
          <ellipse cx="50" cy="182" rx="22" ry="2.5" fill="#7dd3fc" opacity="0.6" />

          <g fill="url(#figuraGrad)">
            <circle cx="50" cy="16" r="11" />
            <path d="M44 26 L56 26 L58 36 L42 36 Z" />
            <path
              d="M27 40
                 Q50 30 73 40
                 L78 62
                 L70 64
                 L66 92
                 Q50 98 34 92
                 L30 64
                 L22 62
                 Z"
            />
            <path d="M27 40 L14 68 Q12 74 16 76 L22 78 L30 55 Z" />
            <path d="M73 40 L86 68 Q88 74 84 76 L78 78 L70 55 Z" />
            <path d="M38 93 L34 140 L30 175 L40 176 L46 142 L50 108 Z" />
            <path d="M62 93 L66 140 L70 175 L60 176 L54 142 L50 108 Z" />
          </g>

          {Array.from({ length: 9 }, (_, i) => (
            <rect key={i} x="10" y={18 + i * 18} width="80" height="0.6" fill="#e0f2fe" opacity="0.35" />
          ))}
        </svg>
      </div>
    </div>
  );
}
