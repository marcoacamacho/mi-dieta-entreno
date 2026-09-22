"use client";

import { useMemo, useState } from "react";
import { DayPlan, WorkoutDay, DailyLog, ExtraFood, DayKey, DAY_LABELS } from "../types";
import { formatDisplayDate, addDays, dayOfWeekKey, diasHastaProximo } from "../dateUtils";
import { Card, SectionTitle, ProgressBar, Badge, Confetti, CollapsibleHeader, CollapsibleBody, CircularProgress } from "../ui";
import { MOMENTO_INFO, MEAL_PLAN, momentoDesdeHora, HORA_DESAYUNO, HORA_COMIDA } from "../planData";
import { FOOD_DATABASE, AlimentoRef } from "../foodDatabase";
import { youtubeSearchUrl } from "../youtube";
import { useCountUp } from "../useCountUp";
import { Targets } from "../calc";

function horaProgramada(momento: string, dia: DayKey): string | undefined {
  if (momento === "desayuno") return HORA_DESAYUNO[dia];
  if (momento === "comida") return HORA_COMIDA;
  return undefined;
}

const HERO_STYLES = {
  entreno: {
    gradient: "from-lime-500/25 via-sky-500/15 to-transparent",
    frase: "💪 Día de entreno — dale caña y llega fuerte a cada serie.",
  },
  descanso: {
    gradient: "from-emerald-500/15 via-teal-500/10 to-transparent",
    frase: "🌿 Descanso de entreno — el músculo también crece cuando recuperas.",
  },
  libre: {
    gradient: "from-amber-500/20 via-pink-500/15 to-transparent",
    frase: "🔁 Descarga dietética — sube algo los carbohidratos, mantén la proteína y disfruta sin culpa; mañana seguimos.",
  },
};

interface Props {
  date: string;
  setDate: (iso: string) => void;
  dayPlan: DayPlan;
  workoutDay: WorkoutDay | undefined;
  log: DailyLog;
  logs: Record<string, DailyLog>;
  updateLog: (updater: (prev: DailyLog) => DailyLog) => void;
  targets: Targets;
  diaPesaje: DayKey;
}

/** Última vez (antes de hoy) que se registró peso para este ejercicio, para
 * poder mostrar una referencia de sobrecarga progresiva junto al input. */
function ultimaVez(logs: Record<string, DailyLog>, exId: string, hoy: string) {
  let mejorFecha = "";
  let mejorEntry: { peso?: number; reps?: number } | null = null;
  for (const [fecha, log] of Object.entries(logs)) {
    if (fecha >= hoy) continue;
    const entry = log.ejercicios[exId];
    if (entry?.peso === undefined) continue;
    if (fecha > mejorFecha) {
      mejorFecha = fecha;
      mejorEntry = entry;
    }
  }
  return mejorEntry ? { fecha: mejorFecha, ...mejorEntry } : null;
}

interface IngredienteAñadido extends AlimentoRef {
  id: string;
  gramos: number;
}

function buscarAlimento(nombre: string): AlimentoRef | undefined {
  return FOOD_DATABASE.find((f) => f.nombre.toLowerCase() === nombre.trim().toLowerCase());
}

function kcalDe(i: AlimentoRef, gramos: number): number {
  return Math.round((i.kcalPor100g * gramos) / 100);
}

function protDe(i: AlimentoRef, gramos: number): number {
  return Math.round((i.proteinaPor100g * gramos) / 100);
}

export default function HoyTab({ date, setDate, dayPlan, workoutDay, log, logs, updateLog, targets, diaPesaje }: Props) {
  const [extraNombre, setExtraNombre] = useState("");
  const [extraKcal, setExtraKcal] = useState("");
  const [extraProt, setExtraProt] = useState("");
  const [extraHora, setExtraHora] = useState(() => new Date().toTimeString().slice(0, 5));
  const [entrenoAbierto, setEntrenoAbierto] = useState(true);
  const [menuAbierto, setMenuAbierto] = useState(true);

  const [ingredientes, setIngredientes] = useState<IngredienteAñadido[]>([]);
  const [ingNombre, setIngNombre] = useState("");
  const [ingGramos, setIngGramos] = useState("");

  const totalIngKcal = useMemo(
    () => ingredientes.reduce((acc, i) => acc + kcalDe(i, i.gramos), 0),
    [ingredientes]
  );
  const totalIngProt = useMemo(
    () => ingredientes.reduce((acc, i) => acc + protDe(i, i.gramos), 0),
    [ingredientes]
  );

  function addIngrediente() {
    const alimento = buscarAlimento(ingNombre);
    const gramos = Number(ingGramos);
    if (!alimento || !gramos) return;
    setIngredientes((prev) => [...prev, { ...alimento, id: `${Date.now()}`, gramos }]);
    setIngNombre("");
    setIngGramos("");
  }

  function removeIngrediente(id: string) {
    setIngredientes((prev) => prev.filter((i) => i.id !== id));
  }

  const dayKey = dayOfWeekKey(date);
  const diasParaPesaje = diasHastaProximo(dayKey, diaPesaje);
  const esDiaPesaje = diasParaPesaje === 0;
  const mananaKey = dayOfWeekKey(addDays(date, 1));
  const mananaEsPesaje = diasHastaProximo(mananaKey, diaPesaje) === 0;
  const mananaPlan = MEAL_PLAN.find((d) => d.day === mananaKey);

  const mealsKcal = dayPlan.meals
    .filter((m) => log.comidosIds.includes(m.id))
    .reduce((acc, m) => acc + m.kcal, 0);
  const mealsProt = dayPlan.meals
    .filter((m) => log.comidosIds.includes(m.id))
    .reduce((acc, m) => acc + m.proteina, 0);
  const extrasKcal = log.extras.reduce((acc, e) => acc + e.kcal, 0);
  const extrasProt = log.extras.reduce((acc, e) => acc + e.proteina, 0);
  const consumidoKcal = mealsKcal + extrasKcal;
  const consumidoProt = mealsProt + extrasProt;
  const restante = targets.kcal - consumidoKcal;
  const menuCompletado =
    !dayPlan.diaLibreDieta && dayPlan.meals.length > 0 && dayPlan.meals.every((m) => log.comidosIds.includes(m.id));
  const totalMenuKcal = dayPlan.meals.reduce((acc, m) => acc + m.kcal, 0);
  const menuSePasaDelObjetivo = !dayPlan.diaLibreDieta && totalMenuKcal > targets.kcal;
  const kcalMostrado = useCountUp(consumidoKcal);
  const protMostrado = useCountUp(consumidoProt);

  function toggleMeal(id: string) {
    updateLog((prev) => ({
      ...prev,
      comidosIds: prev.comidosIds.includes(id)
        ? prev.comidosIds.filter((x) => x !== id)
        : [...prev.comidosIds, id],
    }));
  }

  function addExtra() {
    const kcal = ingredientes.length > 0 ? totalIngKcal : Number(extraKcal);
    const proteina = ingredientes.length > 0 ? totalIngProt : (Number(extraProt) || 0);
    if (!extraNombre.trim() || !kcal) return;
    const nueva: ExtraFood = {
      id: `${Date.now()}`,
      nombre: extraNombre.trim(),
      kcal,
      proteina,
      hora: extraHora || undefined,
      momento: extraHora ? momentoDesdeHora(extraHora) : undefined,
    };
    updateLog((prev) => ({ ...prev, extras: [...prev.extras, nueva] }));
    setExtraNombre("");
    setIngredientes([]);
    setExtraKcal("");
    setExtraProt("");
  }

  function removeExtra(id: string) {
    updateLog((prev) => ({ ...prev, extras: prev.extras.filter((e) => e.id !== id) }));
  }

  function setPesoCorporal(v: string) {
    const n = v === "" ? undefined : Number(v);
    updateLog((prev) => ({ ...prev, pesoCorporal: n }));
  }

  function setEjercicio(exId: string, field: "peso" | "reps", v: string) {
    const n = v === "" ? undefined : Number(v);
    updateLog((prev) => ({
      ...prev,
      ejercicios: {
        ...prev.ejercicios,
        [exId]: { ...prev.ejercicios[exId], [field]: n },
      },
    }));
  }

  const tipoDia = dayPlan.diaLibreDieta ? "libre" : dayPlan.entreno ? "entreno" : "descanso";
  const hero = HERO_STYLES[tipoDia];

  return (
    <div className="space-y-5">
      <div className={`rounded-2xl bg-gradient-to-br ${hero.gradient} p-4`}>
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setDate(addDays(date, -1))}
            className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-300 transition-all hover:bg-white/10 active:scale-90"
          >
            ← Ayer
          </button>
          <div className="flex flex-col items-center">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-transparent text-center text-sm text-slate-300 outline-none"
            />
            <span className="text-base font-semibold text-white">{formatDisplayDate(date)}</span>
            <div className="mt-1 flex gap-2">
              {dayPlan.entreno && <Badge tone="indigo">Día de entreno</Badge>}
              {!dayPlan.entreno && !dayPlan.diaLibreDieta && <Badge tone="slate">Descanso de entreno</Badge>}
              {dayPlan.diaLibreDieta && <Badge tone="amber">Descarga dietética</Badge>}
            </div>
          </div>
          <button
            onClick={() => setDate(addDays(date, 1))}
            className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-300 transition-all hover:bg-white/10 active:scale-90"
          >
            Mañana →
          </button>
        </div>
        <p className="mt-3 text-center text-sm text-slate-200">{hero.frase}</p>
      </div>

      <Card>
        <SectionTitle>Calorías de hoy</SectionTitle>
        <div className="flex items-center gap-5">
          <CircularProgress
            value={consumidoKcal}
            max={targets.kcal}
            colorClass={consumidoKcal > targets.kcal ? "stroke-rose-400" : "stroke-lime-400"}
          >
            <span className="text-2xl font-bold text-white tabular-nums">{kcalMostrado}</span>
            <span className="text-[10px] text-slate-500">de {targets.kcal} kcal</span>
          </CircularProgress>
          <div className="min-w-0 flex-1 space-y-3">
            <div>
              <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
                <span>🍗 Proteína</span>
                <span className="font-semibold text-emerald-400 tabular-nums">
                  {protMostrado}g / {targets.proteina}g
                </span>
              </div>
              <ProgressBar value={consumidoProt} max={targets.proteina} colorClass="bg-emerald-500" />
            </div>
            <div
              className={`rounded-xl px-3 py-2 text-xs font-medium ${
                restante >= 0 ? "bg-white/5 text-slate-300" : "bg-rose-500/10 text-rose-300"
              }`}
            >
              {restante >= 0 ? `⏳ Te quedan ${restante} kcal` : `⚠️ Te has pasado ${Math.abs(restante)} kcal`}
            </div>
          </div>
        </div>

        <div className="mt-4">
          {esDiaPesaje && (
            <div className="mb-2 rounded-xl border border-lime-400/30 bg-lime-500/10 p-3">
              <div className="text-sm font-semibold text-lime-200">📅 ¡Hoy toca pesarte!</div>
              <p className="mt-0.5 text-xs text-slate-400">
                Pésate en ayunas, recién levantado, y anota el resultado.
              </p>
            </div>
          )}
          {!esDiaPesaje && mananaEsPesaje && (
            <div className="mb-2 rounded-xl border border-amber-400/30 bg-amber-500/10 p-3">
              <div className="text-sm font-semibold text-amber-200">⏰ Mañana toca pesarte</div>
              <p className="mt-0.5 text-xs text-slate-400">
                Descansa bien esta noche y pésate mañana en ayunas para que el dato sea fiable.
              </p>
            </div>
          )}
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              {esDiaPesaje
                ? "⚖️ Tu peso de hoy"
                : `⚖️ Próximo pesaje: ${DAY_LABELS[diaPesaje]} (en ${diasParaPesaje} día${diasParaPesaje === 1 ? "" : "s"})`}
            </span>
            <input
              type="number"
              step="0.1"
              value={log.pesoCorporal ?? ""}
              onChange={(e) => setPesoCorporal(e.target.value)}
              placeholder="kg"
              autoFocus={esDiaPesaje}
              className="w-24 shrink-0 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-sm text-white outline-none focus:border-lime-400"
            />
          </div>
        </div>
      </Card>

      <Card>
        <CollapsibleHeader
          title={dayPlan.diaLibreDieta ? "Comidas orientativas" : "Menú del día"}
          open={menuAbierto}
          onToggle={() => setMenuAbierto((v) => !v)}
        />
        <CollapsibleBody open={menuAbierto}>
          <div className="pt-1">
            {menuCompletado && (
              <div className="animate-pop relative mb-3 overflow-hidden rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-2.5 text-center text-sm font-semibold text-emerald-300">
                <Confetti active={menuCompletado} />
                🎉 ¡Menú del día completado!
              </div>
            )}
            {!menuCompletado && menuSePasaDelObjetivo && (
              <div className="mb-3 rounded-xl border border-amber-400/30 bg-amber-500/10 p-2.5 text-xs text-amber-200">
                ⚠️ El menú completo de hoy son {totalMenuKcal} kcal, por encima de tu objetivo ({targets.kcal} kcal).
                Recorta un poco alguna ración o salta la media mañana si vas sobrado.
              </div>
            )}
            <ul className="space-y-2">
              {dayPlan.meals.map((meal) => {
                const done = log.comidosIds.includes(meal.id);
                const info = MOMENTO_INFO[meal.momento];
                return (
                  <li
                    key={meal.id}
                    className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-all duration-300 ${
                      done ? "border-emerald-500/30 bg-emerald-500/10" : "border-white/10 bg-white/[0.02]"
                    }`}
                  >
                    <span
                      key={done ? `${meal.id}-done` : `${meal.id}-pending`}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/5 text-lg leading-none transition-transform duration-300 ${
                        done ? "animate-pop scale-110" : "scale-100"
                      }`}
                    >
                      {info.emoji}
                    </span>
                    <input
                      type="checkbox"
                      checked={done}
                      onChange={() => toggleMeal(meal.id)}
                      className="h-4 w-4 shrink-0 accent-emerald-500"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                        {info.label}
                        {horaProgramada(meal.momento, dayKey) && ` · ${horaProgramada(meal.momento, dayKey)}`}
                      </div>
                      <div className="text-sm text-slate-200">{meal.nombre}</div>
                      {meal.kcal > 0 && (
                        <div className="text-xs text-slate-500">
                          {meal.kcal} kcal · {meal.proteina}g proteína
                        </div>
                      )}
                      {meal.kcal > 0 && (
                        <a
                          href={youtubeSearchUrl(`${meal.nombre} receta`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-0.5 inline-block text-xs text-lime-300 hover:text-lime-200"
                        >
                          ▶ Ver cómo se hace
                        </a>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </CollapsibleBody>
      </Card>

      {mananaPlan && (
        <Card className="border-dashed">
          <SectionTitle>🔜 Adelanto de mañana — {DAY_LABELS[mananaKey]}</SectionTitle>
          <ul className="space-y-1.5">
            {mananaPlan.meals.map((meal) => {
              const info = MOMENTO_INFO[meal.momento];
              const hora = horaProgramada(meal.momento, mananaKey);
              return (
                <li key={meal.id} className="flex items-center gap-2.5 text-sm text-slate-400">
                  <span className="text-base">{info.emoji}</span>
                  <span className="min-w-0 flex-1 truncate">{meal.nombre}</span>
                  {hora && <span className="shrink-0 text-xs text-slate-600">{hora}</span>}
                  {meal.kcal > 0 && <span className="shrink-0 text-xs text-slate-600">{meal.kcal} kcal</span>}
                </li>
              );
            })}
          </ul>
          {mananaPlan.entreno && (
            <p className="mt-2 text-xs text-slate-500">
              🏋️ Mañana también toca entreno — prepara lo que necesites con antelación.
            </p>
          )}
        </Card>
      )}

      <Card>
        <SectionTitle>Comida fuera del menú</SectionTitle>
        <div className="flex flex-col gap-2 mb-3">
          <input
            value={extraNombre}
            onChange={(e) => setExtraNombre(e.target.value)}
            placeholder="Qué has comido"
            className="w-full min-w-0 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:border-lime-400"
          />
          <datalist id="alimentos-conocidos">
            {FOOD_DATABASE.map((f) => (
              <option key={f.nombre} value={f.nombre} />
            ))}
          </datalist>
          <input
            value={extraHora}
            onChange={(e) => setExtraHora(e.target.value)}
            type="time"
            className="w-[6.5rem] shrink-0 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:border-lime-400"
          />

          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-2.5">
            <div className="mb-2 text-xs font-semibold text-slate-400">
              Ingredientes (opcional, para calcular las kcal)
            </div>
            <div className="flex gap-2">
              <input
                value={ingNombre}
                onChange={(e) => setIngNombre(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addIngrediente()}
                placeholder="Alimento"
                list="alimentos-conocidos"
                className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:border-lime-400"
              />
              <input
                value={ingGramos}
                onChange={(e) => setIngGramos(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addIngrediente()}
                type="number"
                placeholder="g"
                className="w-16 shrink-0 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:border-lime-400"
              />
              <button
                onClick={addIngrediente}
                disabled={!buscarAlimento(ingNombre) || !Number(ingGramos)}
                className="shrink-0 rounded-lg bg-lime-500/20 px-3 text-sm font-semibold text-lime-300 transition-colors hover:bg-lime-500/30 disabled:opacity-30"
              >
                +
              </button>
            </div>
            {ingNombre && !buscarAlimento(ingNombre) && (
              <p className="mt-1.5 text-xs text-amber-300/80">
                No encuentro &quot;{ingNombre}&quot; en la base de alimentos, elige una sugerencia de la lista.
              </p>
            )}
            {ingredientes.length > 0 && (
              <>
                <ul className="mt-2 space-y-1">
                  {ingredientes.map((i) => (
                    <li key={i.id} className="flex items-center justify-between gap-2 text-xs text-slate-400">
                      <span className="min-w-0 truncate">
                        {i.nombre} · {i.gramos}g
                      </span>
                      <span className="flex shrink-0 items-center gap-2">
                        <span className="text-slate-300">
                          {kcalDe(i, i.gramos)} kcal · {protDe(i, i.gramos)}g
                        </span>
                        <button onClick={() => removeIngrediente(i.id)} className="text-rose-400 hover:text-rose-300">
                          ✕
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 border-t border-white/10 pt-2 text-xs font-semibold text-lime-300">
                  Total: {totalIngKcal} kcal · {totalIngProt}g proteína
                </div>
              </>
            )}
          </div>

          {ingredientes.length === 0 && (
            <div className="flex gap-2">
              <input
                value={extraKcal}
                onChange={(e) => setExtraKcal(e.target.value)}
                type="number"
                placeholder="kcal"
                className="w-0 min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:border-lime-400"
              />
              <input
                value={extraProt}
                onChange={(e) => setExtraProt(e.target.value)}
                type="number"
                placeholder="prot g"
                className="w-0 min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:border-lime-400"
              />
            </div>
          )}
          {extraHora && (
            <p className="text-xs text-slate-500">
              {MOMENTO_INFO[momentoDesdeHora(extraHora)].emoji} Se contará como{" "}
              {MOMENTO_INFO[momentoDesdeHora(extraHora)].label.toLowerCase()}
            </p>
          )}
          <button onClick={addExtra} className="btn-brand w-full rounded-lg px-3 py-1.5 text-sm font-medium">
            Añadir
          </button>
        </div>
        {log.extras.length > 0 && (
          <ul className="space-y-1.5">
            {log.extras.map((e) => (
              <li key={e.id} className="flex items-center justify-between gap-2 rounded-lg bg-white/[0.03] px-3 py-2 text-sm">
                <div className="min-w-0">
                  <span className="text-slate-300">{e.nombre}</span>
                  <div className="text-xs text-slate-500">
                    {e.momento && (
                      <>
                        {MOMENTO_INFO[e.momento].emoji} {MOMENTO_INFO[e.momento].label}
                        {e.hora && ` · ${e.hora}`} ·{" "}
                      </>
                    )}
                    {e.kcal} kcal · {e.proteina}g prot
                  </div>
                </div>
                <button
                  onClick={() => removeExtra(e.id)}
                  className="shrink-0 text-rose-400 transition-transform hover:text-rose-300 active:scale-90 text-xs"
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        )}
        {log.extras.length === 0 && <p className="text-xs text-slate-500">Nada añadido todavía.</p>}
      </Card>

      {workoutDay && (
        <Card>
          <CollapsibleHeader
            title={`Entreno de hoy — ${workoutDay.titulo}`}
            open={entrenoAbierto}
            onToggle={() => setEntrenoAbierto((v) => !v)}
          />
          <CollapsibleBody open={entrenoAbierto}>
            <div className="pt-1">
              <div className="mb-3 rounded-xl border border-sky-400/30 bg-sky-500/10 p-2.5 text-xs text-sky-200">
                🔥 <strong>Calienta antes de empezar:</strong> 5 min de cardio suave + 1-2 series ligeras
                del primer ejercicio antes de ir a la carga de trabajo. RIR = repeticiones en reserva:
                deja 1-2 reps en el depósito en la mayoría de series, no llegues siempre al fallo.
              </div>
              <ul className="space-y-2">
                {workoutDay.ejercicios.map((ex) => {
                  const entry = log.ejercicios[ex.id] ?? {};
                  const previa = ultimaVez(logs, ex.id, date);
                  return (
                    <li key={ex.id} className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5">
                      <div className="flex items-start gap-2.5">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/5 text-lg leading-none">
                          {ex.emoji}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm text-slate-200">{ex.nombre}</div>
                          <div className="text-xs text-slate-500">
                            {ex.pauta} · descanso {ex.descanso}
                          </div>
                          <div className="mt-1 text-xs italic text-slate-500">{ex.comoHacerlo}</div>
                          <a
                            href={youtubeSearchUrl(`${ex.nombre} técnica ejercicio`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-0.5 inline-block text-xs text-lime-300 hover:text-lime-200"
                          >
                            ▶ Ver vídeo
                          </a>
                        </div>
                      </div>
                      {previa && (
                        <div className="mt-2 text-xs text-sky-300">
                          📈 Última vez: {previa.peso}kg{previa.reps ? ` × ${previa.reps} reps` : ""} — intenta
                          superarlo hoy (más peso, más reps o una serie más).
                        </div>
                      )}
                      <div className="mt-2.5 flex gap-2">
                        <input
                          type="number"
                          step="0.5"
                          value={entry.peso ?? ""}
                          onChange={(e) => setEjercicio(ex.id, "peso", e.target.value)}
                          placeholder="kg"
                          className="w-20 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-sm text-white outline-none focus:border-lime-400"
                        />
                        <input
                          type="number"
                          value={entry.reps ?? ""}
                          onChange={(e) => setEjercicio(ex.id, "reps", e.target.value)}
                          placeholder="reps"
                          className="w-20 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-sm text-white outline-none focus:border-lime-400"
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </CollapsibleBody>
        </Card>
      )}
    </div>
  );
}
