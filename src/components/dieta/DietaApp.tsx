"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { DailyLog, Profile, ShoppingItem } from "./types";
import { MEAL_PLAN, WORKOUT_PLAN } from "./planData";
import { todayISO, dayOfWeekKey } from "./dateUtils";
import { calcularObjetivos, DEFAULT_PROFILE } from "./calc";
import { IconHoy, IconProgreso, IconCompra, IconRecetas, IconSuplementos, IconPerfil } from "./icons";
import HoyTab from "./tabs/HoyTab";
import ProgresoTab from "./tabs/ProgresoTab";
import CompraTab from "./tabs/CompraTab";
import RecetasTab from "./tabs/RecetasTab";
import SuplementosTab from "./tabs/SuplementosTab";
import PerfilTab from "./tabs/PerfilTab";

type TabKey = "hoy" | "progreso" | "compra" | "recetas" | "suplementos" | "perfil";

const TABS: { key: TabKey; label: string; icon: (p: { className?: string }) => React.ReactElement }[] = [
  { key: "hoy", label: "Hoy", icon: IconHoy },
  { key: "progreso", label: "Progreso", icon: IconProgreso },
  { key: "compra", label: "Compra", icon: IconCompra },
  { key: "recetas", label: "Recetas", icon: IconRecetas },
  { key: "suplementos", label: "Suplem.", icon: IconSuplementos },
  { key: "perfil", label: "Perfil", icon: IconPerfil },
];

const EMPTY_LOG: DailyLog = { comidosIds: [], extras: [], ejercicios: {} };

function noopSubscribe() {
  return () => {};
}

function emptyServerSnapshot() {
  return "";
}

export default function DietaApp() {
  // El servidor no conoce la fecha del cliente: se renderiza vacío ahí y en
  // el primer pintado del cliente, y justo después React vuelve a leer
  // `todayISO()` y repinta ya con la fecha real, sin desajustes de hidratación.
  const liveToday = useSyncExternalStore(noopSubscribe, todayISO, emptyServerSnapshot);
  const [tab, setTab] = useState<TabKey>("hoy");
  const [dateOverride, setDateOverride] = useState("");
  const date = dateOverride || liveToday;

  const [logs, setLogs] = useLocalStorage<Record<string, DailyLog>>("logs", {});
  const [profile, setProfileRaw] = useLocalStorage<Profile>("profile", DEFAULT_PROFILE);
  const [shoppingChecked, setShoppingChecked] = useLocalStorage<Record<string, boolean>>(
    "compra-marcados",
    {}
  );
  const [shoppingCustom, setShoppingCustomRaw] = useLocalStorage<ShoppingItem[]>("compra-extra", []);

  const dayKey = date ? dayOfWeekKey(date) : "lunes";
  const dayPlan = useMemo(() => MEAL_PLAN.find((d) => d.day === dayKey)!, [dayKey]);
  const workoutDay = useMemo(() => WORKOUT_PLAN.find((d) => d.day === dayKey), [dayKey]);
  const log = logs[date] ?? EMPTY_LOG;
  const targets = useMemo(() => calcularObjetivos(profile), [profile]);

  function updateLog(updater: (prev: DailyLog) => DailyLog) {
    setLogs((prev) => ({ ...prev, [date]: updater(prev[date] ?? EMPTY_LOG) }));
  }

  function setProfile(updater: (prev: Profile) => Profile) {
    setProfileRaw(updater);
  }

  function setShoppingCustom(updater: (prev: ShoppingItem[]) => ShoppingItem[]) {
    setShoppingCustomRaw(updater);
  }

  if (!date) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 text-center text-sm text-slate-500">
        Cargando tu dieta y entreno…
      </div>
    );
  }

  return (
    <>
    <div className="mx-auto max-w-2xl select-text px-4 pb-28 pt-6 sm:pt-8">
      <header className="mb-6">
        <div className="flex items-center gap-2">
          <span className="animate-bounce-slow text-2xl">🔥</span>
          <h1 className="text-xl font-bold text-gradient-brand">Mi Dieta y Entreno</h1>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Plan personal de definición · entreno lunes, martes, jueves y viernes
        </p>
      </header>

      {tab === "hoy" && (
        <HoyTab
          date={date}
          setDate={setDateOverride}
          dayPlan={dayPlan}
          workoutDay={workoutDay}
          log={log}
          updateLog={updateLog}
          targets={targets}
          diaPesaje={profile.diaPesaje}
        />
      )}
      {tab === "progreso" && <ProgresoTab logs={logs} profile={profile} targets={targets} />}
      {tab === "compra" && (
        <CompraTab
          checked={shoppingChecked}
          setChecked={setShoppingChecked}
          custom={shoppingCustom}
          setCustom={setShoppingCustom}
        />
      )}
      {tab === "recetas" && <RecetasTab />}
      {tab === "suplementos" && <SuplementosTab />}
      {tab === "perfil" && (
        <PerfilTab profile={profile} setProfile={setProfile} targets={targets} logs={logs} />
      )}
    </div>

    <nav className="bottom-nav fixed inset-x-0 bottom-0 z-20">
      <div className="mx-auto flex max-w-2xl items-stretch justify-between px-1">
        {TABS.map((t) => {
          const active = tab === t.key;
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="flex flex-1 flex-col items-center gap-0.5 py-2.5 transition-transform active:scale-90"
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                  active ? "bg-lime-500/20 text-lime-300" : "text-slate-500"
                }`}
              >
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <span className={`text-[10px] font-medium ${active ? "text-lime-300" : "text-slate-500"}`}>
                {t.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
    </>
  );
}
