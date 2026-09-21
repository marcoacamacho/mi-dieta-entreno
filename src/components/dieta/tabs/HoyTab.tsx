"use client";

import { useState } from "react";
import { DayPlan, WorkoutDay, DailyLog, ExtraFood } from "../types";
import { formatDisplayDate, addDays } from "../dateUtils";
import { Card, SectionTitle, ProgressBar, Badge } from "../ui";
import { MOMENTO_INFO } from "../planData";
import { Targets } from "../calc";

const HERO_STYLES = {
  entreno: {
    gradient: "from-indigo-500/25 via-violet-500/15 to-transparent",
    frase: "💪 Día de entreno — dale caña y llega fuerte a cada serie.",
  },
  descanso: {
    gradient: "from-emerald-500/15 via-teal-500/10 to-transparent",
    frase: "🌿 Descanso de entreno — el músculo también crece cuando recuperas.",
  },
  libre: {
    gradient: "from-amber-500/20 via-pink-500/15 to-transparent",
    frase: "🎉 Día libre de dieta — disfruta sin culpa, mañana seguimos.",
  },
};

interface Props {
  date: string;
  setDate: (iso: string) => void;
  dayPlan: DayPlan;
  workoutDay: WorkoutDay | undefined;
  log: DailyLog;
  updateLog: (updater: (prev: DailyLog) => DailyLog) => void;
  targets: Targets;
}

export default function HoyTab({ date, setDate, dayPlan, workoutDay, log, updateLog, targets }: Props) {
  const [extraNombre, setExtraNombre] = useState("");
  const [extraKcal, setExtraKcal] = useState("");
  const [extraProt, setExtraProt] = useState("");

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

  function toggleMeal(id: string) {
    updateLog((prev) => ({
      ...prev,
      comidosIds: prev.comidosIds.includes(id)
        ? prev.comidosIds.filter((x) => x !== id)
        : [...prev.comidosIds, id],
    }));
  }

  function addExtra() {
    const kcal = Number(extraKcal);
    const proteina = Number(extraProt) || 0;
    if (!extraNombre.trim() || !kcal) return;
    const nueva: ExtraFood = { id: `${Date.now()}`, nombre: extraNombre.trim(), kcal, proteina };
    updateLog((prev) => ({ ...prev, extras: [...prev.extras, nueva] }));
    setExtraNombre("");
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
            className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-300 hover:bg-white/10"
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
              {dayPlan.diaLibreDieta && <Badge tone="amber">Día libre de dieta</Badge>}
            </div>
          </div>
          <button
            onClick={() => setDate(addDays(date, 1))}
            className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-300 hover:bg-white/10"
          >
            Mañana →
          </button>
        </div>
        <p className="mt-3 text-center text-sm text-slate-200">{hero.frase}</p>
      </div>

      <Card>
        <SectionTitle>Calorías de hoy</SectionTitle>
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <div className="text-2xl font-bold text-white">{consumidoKcal}</div>
            <div className="text-xs text-slate-500">kcal consumidas de {targets.kcal}</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-400">{consumidoProt}g</div>
            <div className="text-xs text-slate-500">proteína de {targets.proteina}g objetivo</div>
          </div>
        </div>
        <ProgressBar value={consumidoKcal} max={targets.kcal} colorClass={consumidoKcal > targets.kcal ? "bg-rose-500" : "bg-indigo-500"} />
        <div className="mt-1 text-xs text-slate-500">
          {restante >= 0 ? `Te quedan ${restante} kcal` : `Te has pasado ${Math.abs(restante)} kcal`}
        </div>
        <ProgressBar value={consumidoProt} max={targets.proteina} colorClass="bg-emerald-500" />

        <div className="mt-4 flex items-center gap-3">
          <label className="text-xs text-slate-400 shrink-0">Tu peso corporal hoy (kg)</label>
          <input
            type="number"
            step="0.1"
            value={log.pesoCorporal ?? ""}
            onChange={(e) => setPesoCorporal(e.target.value)}
            placeholder="—"
            className="w-24 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-sm text-white outline-none focus:border-indigo-400"
          />
        </div>
      </Card>

      <Card>
        <SectionTitle>{dayPlan.diaLibreDieta ? "Comidas orientativas" : "Menú del día"}</SectionTitle>
        <ul className="space-y-2">
          {dayPlan.meals.map((meal) => {
            const done = log.comidosIds.includes(meal.id);
            const info = MOMENTO_INFO[meal.momento];
            return (
              <li
                key={meal.id}
                className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors ${
                  done ? "border-emerald-500/30 bg-emerald-500/10" : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-lg">
                  {info.emoji}
                </span>
                <input
                  type="checkbox"
                  checked={done}
                  onChange={() => toggleMeal(meal.id)}
                  className="h-4 w-4 shrink-0 accent-emerald-500"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">{info.label}</div>
                  <div className="text-sm text-slate-200">{meal.nombre}</div>
                  {meal.kcal > 0 && (
                    <div className="text-xs text-slate-500">
                      {meal.kcal} kcal · {meal.proteina}g proteína
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </Card>

      <Card>
        <SectionTitle>Comida fuera del menú</SectionTitle>
        <div className="grid grid-cols-[1fr_80px_80px_auto] gap-2 mb-3">
          <input
            value={extraNombre}
            onChange={(e) => setExtraNombre(e.target.value)}
            placeholder="Qué has comido"
            className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:border-indigo-400"
          />
          <input
            value={extraKcal}
            onChange={(e) => setExtraKcal(e.target.value)}
            type="number"
            placeholder="kcal"
            className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:border-indigo-400"
          />
          <input
            value={extraProt}
            onChange={(e) => setExtraProt(e.target.value)}
            type="number"
            placeholder="prot g"
            className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:border-indigo-400"
          />
          <button onClick={addExtra} className="btn-brand rounded-lg px-3 py-1.5 text-sm font-medium">
            Añadir
          </button>
        </div>
        {log.extras.length > 0 && (
          <ul className="space-y-1.5">
            {log.extras.map((e) => (
              <li key={e.id} className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2 text-sm">
                <span className="text-slate-300">
                  {e.nombre} <span className="text-slate-500">· {e.kcal} kcal · {e.proteina}g prot</span>
                </span>
                <button onClick={() => removeExtra(e.id)} className="text-rose-400 hover:text-rose-300 text-xs">
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
          <SectionTitle>Entreno de hoy — {workoutDay.titulo}</SectionTitle>
          <ul className="space-y-2">
            {workoutDay.ejercicios.map((ex) => {
              const entry = log.ejercicios[ex.id] ?? {};
              return (
                <li key={ex.id} className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5">
                  <div className="flex items-start gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-lg">
                      {ex.emoji}
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm text-slate-200">{ex.nombre}</div>
                      <div className="text-xs text-slate-500">{ex.pauta}</div>
                      <div className="mt-1 text-xs italic text-slate-500">{ex.comoHacerlo}</div>
                    </div>
                  </div>
                  <div className="mt-2.5 flex gap-2">
                    <input
                      type="number"
                      step="0.5"
                      value={entry.peso ?? ""}
                      onChange={(e) => setEjercicio(ex.id, "peso", e.target.value)}
                      placeholder="kg"
                      className="w-20 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-sm text-white outline-none focus:border-indigo-400"
                    />
                    <input
                      type="number"
                      value={entry.reps ?? ""}
                      onChange={(e) => setEjercicio(ex.id, "reps", e.target.value)}
                      placeholder="reps"
                      className="w-20 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-sm text-white outline-none focus:border-indigo-400"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      )}
    </div>
  );
}
