"use client";

import { useMemo } from "react";
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
import { Profile, DailyLog, DAY_KEYS, DAY_LABELS } from "../types";
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

  const pesoActual = pesoData.length > 0 ? pesoData[pesoData.length - 1].peso : profile.peso;
  const diferencia = pesoActual - profile.pesoObjetivo;
  const yaConseguido = Math.abs(diferencia) < 0.1;

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
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:border-lime-400"
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
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:border-lime-400"
            />
          </label>
          <label className="text-xs text-slate-400">
            Peso (kg)
            <input
              type="number"
              step="0.1"
              value={profile.peso}
              onChange={(e) => set("peso", Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:border-lime-400"
            />
          </label>
          <label className="text-xs text-slate-400">
            Altura (cm)
            <input
              type="number"
              value={profile.altura}
              onChange={(e) => set("altura", Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:border-lime-400"
            />
          </label>
          <label className="text-xs text-slate-400 col-span-2">
            🎯 Peso que quiero conseguir (kg)
            <input
              type="number"
              step="0.1"
              value={profile.pesoObjetivo}
              onChange={(e) => set("pesoObjetivo", Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:border-lime-400"
            />
          </label>
          <label className="text-xs text-slate-400 col-span-2">
            Nivel de actividad
            <select
              value={profile.actividad}
              onChange={(e) => set("actividad", e.target.value as Profile["actividad"])}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:border-lime-400"
            >
              <option value="sedentario" className="bg-neutral-900">Sedentario (trabajo de oficina, poco movimiento)</option>
              <option value="ligero" className="bg-neutral-900">Ligero (entrenas 1-3 días/semana)</option>
              <option value="moderado" className="bg-neutral-900">Moderado (entrenas 4-5 días/semana)</option>
              <option value="activo" className="bg-neutral-900">Activo (entrenas 6-7 días/semana)</option>
              <option value="muy_activo" className="bg-neutral-900">Muy activo (trabajo físico + entreno)</option>
            </select>
          </label>
          <label className="text-xs text-slate-400 col-span-2">
            ⚖️ Día de la semana para pesarte
            <select
              value={profile.diaPesaje}
              onChange={(e) => set("diaPesaje", e.target.value as Profile["diaPesaje"])}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:border-lime-400"
            >
              {DAY_KEYS.map((d) => (
                <option key={d} value={d} className="bg-neutral-900">
                  {DAY_LABELS[d]}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs text-slate-400 col-span-2">
            Objetivo
            <select
              value={profile.objetivo}
              onChange={(e) => set("objetivo", e.target.value as Profile["objetivo"])}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:border-lime-400"
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
          los 1970-2150 kcal como referencia (por debajo de tu objetivo a propósito, para dejar margen):
          ajusta las raciones al alza o a la baja según este objetivo.
        </p>
      </Card>

      <Card className="bg-gradient-to-br from-lime-500/15 via-sky-500/10 to-transparent">
        <SectionTitle>🎯 Tu objetivo de peso</SectionTitle>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-xl font-bold text-white">{pesoActual}</div>
            <div className="text-xs text-slate-500">actual (kg)</div>
          </div>
          <div>
            <div className="text-xl font-bold text-lime-300">{profile.pesoObjetivo}</div>
            <div className="text-xs text-slate-500">objetivo (kg)</div>
          </div>
          <div>
            <div className="text-xl font-bold text-emerald-400">
              {yaConseguido ? "🎉" : `${diferencia > 0 ? "-" : "+"}${Math.abs(diferencia).toFixed(1)}`}
            </div>
            <div className="text-xs text-slate-500">{yaConseguido ? "¡conseguido!" : "kg para llegar"}</div>
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle>🧭 Pilares además de la dieta y el entreno</SectionTitle>
        <ul className="space-y-2.5 text-sm text-slate-300">
          <li className="flex gap-2">
            <span className="shrink-0">😴</span>
            <span>
              <strong className="text-slate-200">Sueño:</strong> 7-9h por noche. Es cuando más se
              recupera el músculo y se regulan las hormonas del hambre — dormir poco sabotea
              cualquier dieta.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0">🚶</span>
            <span>
              <strong className="text-slate-200">Pasos / NEAT:</strong> apunta a 8.000-10.000
              pasos al día. El movimiento fuera del gimnasio quema más calorías de lo que parece y
              hace el déficit mucho más sostenible.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0">💧</span>
            <span>
              <strong className="text-slate-200">Hidratación:</strong> 30-35ml por kg de peso al
              día como referencia, más si entrenas fuerte o hace calor.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0">🧘</span>
            <span>
              <strong className="text-slate-200">Estrés:</strong> el estrés crónico eleva el
              cortisol y dificulta perder grasa y recuperar del entreno. Busca 10 min al día para
              desconectar (paseo, respiración, lo que te funcione).
            </span>
          </li>
        </ul>
      </Card>

      <Card>
        <SectionTitle>Evolución de tu peso corporal</SectionTitle>
        {pesoData.length < 2 ? (
          <p className="text-xs text-slate-500">
            Pésate una vez por semana (el {DAY_LABELS[profile.diaPesaje].toLowerCase()}) desde la
            pestaña &quot;Hoy&quot; para ver aquí tu evolución.
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
              <ReferenceLine
                y={profile.pesoObjetivo}
                stroke="#34d399"
                strokeDasharray="4 4"
                label={{ value: "🎯 objetivo", position: "insideTopRight", fill: "#34d399", fontSize: 11 }}
              />
              <Line type="monotone" dataKey="peso" stroke="#bef264" strokeWidth={2.5} dot={{ r: 3, fill: "#a3e635" }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Card>
    </div>
  );
}
