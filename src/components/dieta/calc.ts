import { Profile } from "./types";

const ACTIVITY_FACTOR: Record<Profile["actividad"], number> = {
  sedentario: 1.2,
  ligero: 1.375,
  moderado: 1.55,
  activo: 1.725,
  muy_activo: 1.9,
};

const GOAL_ADJUST: Record<Profile["objetivo"], number> = {
  definir: 0.8, // déficit ~20%
  mantener: 1,
  recomposicion: 0.9, // déficit ligero ~10%
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
  const kcal = Math.round(tdee * GOAL_ADJUST[p.objetivo]);
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
  actividad: "moderado",
  objetivo: "definir",
};
