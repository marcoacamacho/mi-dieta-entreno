import { Profile } from "./types";

const ACTIVITY_FACTOR: Record<Profile["actividad"], number> = {
  sedentario: 1.2,
  ligero: 1.375,
  moderado: 1.55,
  activo: 1.725,
  muy_activo: 1.9,
};

// Déficit calibrado en vez de un porcentaje fijo para todos: se limita al
// menor entre un % del gasto y un tope absoluto de kcal/día (enfoque de
// entrenadores basados en evidencia tipo Helms/Trexler), y nunca se baja
// del metabolismo basal, para que el déficit sea sostenible y no agresivo
// en personas con TDEE alto ni excesivo en personas con TDEE bajo.
const GOAL_DEFICIT: Record<Profile["objetivo"], { pct: number; capKcal: number }> = {
  definir: { pct: 0.2, capKcal: 600 },
  recomposicion: { pct: 0.1, capKcal: 300 },
  mantener: { pct: 0, capKcal: 0 },
};

export interface Targets {
  kcal: number;
  proteina: number;
  grasa: number;
  carbohidratos: number;
  tdee: number;
}

export function calcularObjetivos(p: Profile): Targets {
  const bmr =
    p.sexo === "hombre"
      ? 10 * p.peso + 6.25 * p.altura - 5 * p.edad + 5
      : 10 * p.peso + 6.25 * p.altura - 5 * p.edad - 161;

  const tdee = bmr * ACTIVITY_FACTOR[p.actividad];
  const { pct, capKcal } = GOAL_DEFICIT[p.objetivo];
  const deficit = Math.min(tdee * pct, capKcal);
  const kcal = Math.round(Math.max(tdee - deficit, bmr));
  const proteina = Math.round(p.peso * 2); // 2 g/kg para preservar músculo en déficit
  const grasa = Math.round((kcal * 0.25) / 9);
  const kcalRestantes = kcal - proteina * 4 - grasa * 9;
  const carbohidratos = Math.max(0, Math.round(kcalRestantes / 4));

  return { kcal, proteina, grasa, carbohidratos, tdee: Math.round(tdee) };
}

export const DEFAULT_PROFILE: Profile = {
  sexo: "hombre",
  edad: 30,
  peso: 80,
  altura: 175,
  pesoObjetivo: 75,
  actividad: "moderado",
  objetivo: "definir",
  diaPesaje: "lunes",
};
