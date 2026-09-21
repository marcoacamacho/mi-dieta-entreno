"use client";

import { useMemo } from "react";
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Profile, DailyLog } from "../types";
import { Targets } from "../calc";
import { Card, SectionTitle } from "../ui";

interface Props {
  profile: Profile;
  setProfile: (updater: (prev: Profile) => Profile) => void;
  targets: Targets;
  logs: Record<string, DailyLog>;
}

export default function PerfilTab({ profile, setProfile, targets, logs }: Props) {
  const pesoData = useMemo(() => {
    return Object.entries(logs)
      .filter(([, log]) => typeof log.pesoCorporal === "number")
      .map(([fecha, log]) => ({ fecha: fecha.slice(5), peso: log.pesoCorporal as number }))
      .sort((a, b) => a.fecha.localeCompare(b.fecha));
  }, [logs]);

  function set<K extends keyof Profile>(key: K, value: Profile[K]) {
    setProfile((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="space-y-5">
      <Card>
        <SectionTitle>Tu perfil</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs text-slate-400">
            Sexo
            <select
              value={profile.sexo}
              onChange={(e) => set("sexo", e.target.value as Profile["sexo"])}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:border-indigo-400"
            >
              <option value="hombre" className="bg-neutral-900">Hombre</option>
              <option value="mujer" className="bg-neutral-900">Mujer</option>
            </select>
          </label>
          <label className="text-xs text-slate-400">
            Edad
            <input
              type="number"
              value={profile.edad}
              onChange={(e) => set("edad", Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:border-indigo-400"
            />
          </label>
          <label className="text-xs text-slate-400">
            Peso (kg)
            <input
              type="number"
              step="0.1"
              value={profile.peso}
              onChange={(e) => set("peso", Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:border-indigo-400"
            />
          </label>
          <label className="text-xs text-slate-400">
            Altura (cm)
            <input
              type="number"
              value={profile.altura}
              onChange={(e) => set("altura", Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:border-indigo-400"
            />
          </label>
          <label className="text-xs text-slate-400 col-span-2">
            Nivel de actividad
            <select
              value={profile.actividad}
              onChange={(e) => set("actividad", e.target.value as Profile["actividad"])}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:border-indigo-400"
            >
              <option value="sedentario" className="bg-neutral-900">Sedentario (trabajo de oficina, poco movimiento)</option>
              <option value="ligero" className="bg-neutral-900">Ligero (entrenas 1-3 días/semana)</option>
              <option value="moderado" className="bg-neutral-900">Moderado (entrenas 4-5 días/semana)</option>
              <option value="activo" className="bg-neutral-900">Activo (entrenas 6-7 días/semana)</option>
              <option value="muy_activo" className="bg-neutral-900">Muy activo (trabajo físico + entreno)</option>
            </select>
          </label>
          <label className="text-xs text-slate-400 col-span-2">
            Objetivo
            <select
              value={profile.objetivo}
              onChange={(e) => set("objetivo", e.target.value as Profile["objetivo"])}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:border-indigo-400"
            >
              <option value="definir" className="bg-neutral-900">Perder grasa / definir (déficit ~20%)</option>
              <option value="recomposicion" className="bg-neutral-900">Recomposición (déficit ligero ~10%)</option>
              <option value="mantener" className="bg-neutral-900">Mantener peso</option>
            </select>
          </label>
        </div>
      </Card>

      <Card>
        <SectionTitle>Tus objetivos diarios calculados</SectionTitle>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-2xl font-bold text-white">{targets.kcal}</div>
            <div className="text-xs text-slate-500">kcal / día</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-400">{targets.proteina}g</div>
            <div className="text-xs text-slate-500">proteína / día (~2g/kg)</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-slate-300">{targets.grasa}g</div>
            <div className="text-xs text-slate-500">grasas / día</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-slate-300">{targets.carbohidratos}g</div>
            <div className="text-xs text-slate-500">carbohidratos / día</div>
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Gasto calórico estimado (TDEE): {targets.tdee} kcal/día. El menú de la pestaña &quot;Hoy&quot; ronda
          los 2150-2250 kcal como referencia: ajusta las raciones al alza o a la baja según este objetivo.
        </p>
      </Card>

      <Card>
        <SectionTitle>Evolución de tu peso corporal</SectionTitle>
        {pesoData.length < 2 ? (
          <p className="text-xs text-slate-500">
            Registra tu peso cada día desde la pestaña &quot;Hoy&quot; para ver aquí tu evolución.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={pesoData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="fecha" tick={{ fontSize: 11, fill: "#71717a" }} axisLine={{ stroke: "#3f3f46" }} tickLine={false} />
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
              <Line type="monotone" dataKey="peso" stroke="#a5b4fc" strokeWidth={2.5} dot={{ r: 3, fill: "#818cf8" }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Card>
    </div>
  );
}
