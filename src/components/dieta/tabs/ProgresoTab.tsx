import { DailyLog, Profile } from "../types";
import { Targets } from "../calc";
import { calcularResumenProgreso, EstadoProgreso } from "../progreso";
import { Card, SectionTitle, ProgressBar } from "../ui";

interface Props {
  logs: Record<string, DailyLog>;
  profile: Profile;
  targets: Targets;
}

const ESTADO_STYLE: Record<EstadoProgreso, { gradient: string; emoji: string; titulo: string }> = {
  inicio: {
    gradient: "from-indigo-500/20 via-violet-500/10 to-transparent",
    emoji: "🌱",
    titulo: "Estás empezando",
  },
  objetivo: {
    gradient: "from-emerald-500/25 via-teal-500/15 to-transparent",
    emoji: "🏆",
    titulo: "¡Objetivo conseguido!",
  },
  bien: {
    gradient: "from-emerald-500/20 via-indigo-500/10 to-transparent",
    emoji: "🔥",
    titulo: "Vas muy bien",
  },
  mejorable: {
    gradient: "from-amber-500/20 via-pink-500/10 to-transparent",
    emoji: "💛",
    titulo: "Hay margen de mejora",
  },
};

export default function ProgresoTab({ logs, profile, targets }: Props) {
  const r = calcularResumenProgreso(logs, profile, targets);
  const style = ESTADO_STYLE[r.estado];

  return (
    <div className="space-y-5">
      <div className={`rounded-2xl bg-gradient-to-br ${style.gradient} p-5 text-center`}>
        <div className="text-3xl">{style.emoji}</div>
        <div className="mt-1 text-base font-bold text-white">{style.titulo}</div>
        <p className="mt-2 text-sm text-slate-200">{r.frase}</p>
      </div>

      {r.diasRegistrados === 0 ? (
        <Card>
          <p className="text-sm text-slate-400">
            Aún no hay datos suficientes. En cuanto marques comidas, registres tu peso o apuntes
            los pesos del entreno desde la pestaña &quot;Hoy&quot;, aquí verás tu evolución.
          </p>
        </Card>
      ) : (
        <>
          {(r.adherenciaMenuPct !== null || r.proteinaPromedioPct !== null) && (
            <Card>
              <SectionTitle>📋 Constancia con la dieta</SectionTitle>
              <div className="space-y-3">
                {r.adherenciaMenuPct !== null && (
                  <div>
                    <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
                      <span>Comidas del menú completadas</span>
                      <span className="font-semibold text-slate-200">{r.adherenciaMenuPct}%</span>
                    </div>
                    <ProgressBar value={r.adherenciaMenuPct} max={100} colorClass="bg-indigo-500" />
                  </div>
                )}
                {r.proteinaPromedioPct !== null && (
                  <div>
                    <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
                      <span>Proteína media vs. objetivo</span>
                      <span className="font-semibold text-slate-200">{r.proteinaPromedioPct}%</span>
                    </div>
                    <ProgressBar
                      value={r.proteinaPromedioPct}
                      max={100}
                      colorClass={r.proteinaPromedioPct >= 85 ? "bg-emerald-500" : "bg-amber-500"}
                    />
                  </div>
                )}
                {r.kcalPromedioPct !== null && (
                  <div>
                    <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
                      <span>Calorías medias vs. objetivo</span>
                      <span className="font-semibold text-slate-200">{r.kcalPromedioPct}%</span>
                    </div>
                    <ProgressBar
                      value={r.kcalPromedioPct}
                      max={100}
                      colorClass={r.kcalPromedioPct > 110 ? "bg-rose-500" : "bg-indigo-500"}
                    />
                  </div>
                )}
              </div>
            </Card>
          )}

          {r.pesosRegistrados > 0 && (
            <Card>
              <SectionTitle>⚖️ Evolución de peso</SectionTitle>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-lg font-bold text-white">{r.pesoInicio}</div>
                  <div className="text-xs text-slate-500">inicio (kg)</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-indigo-300">{r.pesoActual}</div>
                  <div className="text-xs text-slate-500">actual (kg)</div>
                </div>
                <div>
                  <div className={`text-lg font-bold ${(r.deltaPesoTotal ?? 0) <= 0 ? "text-emerald-400" : "text-amber-400"}`}>
                    {r.deltaPesoTotal !== null ? `${r.deltaPesoTotal > 0 ? "+" : ""}${r.deltaPesoTotal.toFixed(1)}` : "—"}
                  </div>
                  <div className="text-xs text-slate-500">cambio total</div>
                </div>
              </div>
              {r.ritmoSemanalKg !== null && (
                <p className="mt-3 text-center text-xs text-slate-500">
                  Ritmo aproximado: {r.ritmoSemanalKg > 0 ? "+" : ""}
                  {r.ritmoSemanalKg.toFixed(2)} kg/semana
                </p>
              )}
            </Card>
          )}

          {r.ejerciciosProgreso.length > 0 && (
            <Card>
              <SectionTitle>🏋️ Progreso de fuerza</SectionTitle>
              <ul className="space-y-1.5">
                {r.ejerciciosProgreso.map((e) => (
                  <li key={e.id} className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">
                      {e.emoji} {e.nombre}
                    </span>
                    <span
                      className={`font-semibold ${
                        e.delta > 0 ? "text-emerald-400" : e.delta < 0 ? "text-rose-400" : "text-slate-500"
                      }`}
                    >
                      {e.primerPeso}kg → {e.ultimoPeso}kg ({e.delta > 0 ? "+" : ""}
                      {e.delta}kg)
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {r.consejos.length > 0 && (
            <Card>
              <SectionTitle>💡 Qué puedes mejorar</SectionTitle>
              <ul className="space-y-2.5">
                {r.consejos.map((c, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-300">
                    <span className="shrink-0">💡</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
