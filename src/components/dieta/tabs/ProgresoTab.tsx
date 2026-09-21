import {
  Line,
  LineChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DailyLog, Profile } from "../types";
import { Targets } from "../calc";
import { calcularResumenProgreso, calcularResumenSemanal, calcularEntrenosRecientes, EstadoProgreso } from "../progreso";
import { Card, SectionTitle, ProgressBar } from "../ui";

interface Props {
  logs: Record<string, DailyLog>;
  profile: Profile;
  targets: Targets;
}

const ESTADO_STYLE: Record<EstadoProgreso, { gradient: string; emoji: string; titulo: string }> = {
  inicio: {
    gradient: "from-lime-500/20 via-sky-500/10 to-transparent",
    emoji: "🌱",
    titulo: "Estás empezando",
  },
  objetivo: {
    gradient: "from-emerald-500/25 via-teal-500/15 to-transparent",
    emoji: "🏆",
    titulo: "¡Objetivo conseguido!",
  },
  bien: {
    gradient: "from-emerald-500/20 via-lime-500/10 to-transparent",
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
  const semana = calcularResumenSemanal(logs);
  const recientes = calcularEntrenosRecientes(logs);
  const style = ESTADO_STYLE[r.estado];

  return (
    <div className="space-y-5">
      <div className={`rounded-2xl bg-gradient-to-br ${style.gradient} p-5 text-center`}>
        <div className="animate-bounce-slow text-3xl">{style.emoji}</div>
        <div className="mt-1 text-base font-bold text-white">{style.titulo}</div>
        <p className="mt-2 text-sm text-slate-200">{r.frase}</p>
      </div>

      <Card>
        <SectionTitle>📅 Esta semana</SectionTitle>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl bg-white/5 px-2 py-3">
            <div className="text-lg font-bold text-lime-300 tabular-nums">
              {semana.entrenosCompletados}/{semana.entrenosPlanificados}
            </div>
            <div className="text-[10px] text-slate-500">🏋️ entrenos</div>
          </div>
          <div className="rounded-xl bg-white/5 px-2 py-3">
            <div className="text-lg font-bold text-white tabular-nums">{semana.pesoTotalLevantado}</div>
            <div className="text-[10px] text-slate-500">💪 kg levantados</div>
          </div>
          <div className="rounded-xl bg-white/5 px-2 py-3">
            <div className="text-lg font-bold text-white tabular-nums">{semana.setsRegistrados}</div>
            <div className="text-[10px] text-slate-500">📝 sets anotados</div>
          </div>
        </div>
      </Card>

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
                    <ProgressBar value={r.adherenciaMenuPct} max={100} colorClass="bg-lime-500" />
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
                      colorClass={r.kcalPromedioPct > 110 ? "bg-rose-500" : "bg-lime-500"}
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
                  <div className="text-lg font-bold text-lime-300">{r.pesoActual}</div>
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

              {r.serieDePeso.length >= 2 ? (
                <ResponsiveContainer width="100%" height={220} className="mt-4">
                  <LineChart data={r.serieDePeso}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis
                      dataKey="fecha"
                      tick={{ fontSize: 11, fill: "#71717a" }}
                      axisLine={{ stroke: "#3f3f46" }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "#71717a" }}
                      domain={["dataMin - 1", "dataMax + 1"]}
                      width={40}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 12,
                        background: "rgba(23,23,27,0.9)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                      labelStyle={{ color: "#e4e4e7" }}
                      itemStyle={{ color: "#e4e4e7" }}
                    />
                    <ReferenceLine
                      y={profile.pesoObjetivo}
                      stroke="#34d399"
                      strokeDasharray="4 4"
                      label={{ value: "🎯 objetivo", position: "insideTopRight", fill: "#34d399", fontSize: 11 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="peso"
                      stroke="#bef264"
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: "#a3e635" }}
                      activeDot={{ r: 5, fill: "#a3e635", stroke: "#e4e4e7", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="mt-3 text-xs text-slate-500">
                  Con un pesaje más ya se podrá dibujar aquí la gráfica de evolución.
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

          {recientes.length > 0 && (
            <Card>
              <SectionTitle>🗓️ Últimos entrenos</SectionTitle>
              <ul className="space-y-1.5">
                {recientes.map((e) => (
                  <li
                    key={e.fecha}
                    className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.03] px-3 py-2.5"
                  >
                    <div className="min-w-0">
                      <div className="text-sm text-slate-200">
                        {e.diaLabel} {e.esHoy && <span className="text-slate-500">(hoy)</span>}
                      </div>
                      <div className="text-xs text-slate-500">{e.titulo}</div>
                    </div>
                    {e.completado ? (
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime-500/20 text-lime-300">
                        ✓
                      </span>
                    ) : (
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 text-slate-600">
                        ·
                      </span>
                    )}
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
