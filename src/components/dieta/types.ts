export type DayKey =
  | "lunes"
  | "martes"
  | "miercoles"
  | "jueves"
  | "viernes"
  | "sabado"
  | "domingo";

export const DAY_KEYS: DayKey[] = [
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
  "domingo",
];

export const DAY_LABELS: Record<DayKey, string> = {
  lunes: "Lunes",
  martes: "Martes",
  miercoles: "Miércoles",
  jueves: "Jueves",
  viernes: "Viernes",
  sabado: "Sábado",
  domingo: "Domingo",
};

export type Momento = "desayuno" | "media_manana" | "comida" | "merienda" | "cena" | "libre";

export interface MealItem {
  id: string;
  nombre: string;
  kcal: number;
  proteina: number;
  ingredientes: string[];
  momento: Momento;
}

export interface DayPlan {
  day: DayKey;
  entreno: boolean;
  diaLibreDieta: boolean;
  meals: MealItem[];
}

export interface Exercise {
  id: string;
  nombre: string;
  pauta: string;
  emoji: string;
  comoHacerlo: string;
}

export interface WorkoutDay {
  day: DayKey;
  titulo: string;
  ejercicios: Exercise[];
}

export interface ExtraFood {
  id: string;
  nombre: string;
  kcal: number;
  proteina: number;
  hora?: string;
  momento?: Momento;
}

export interface ExerciseLogEntry {
  peso?: number;
  reps?: number;
  nota?: string;
}

export interface DailyLog {
  comidosIds: string[];
  extras: ExtraFood[];
  pesoCorporal?: number;
  ejercicios: Record<string, ExerciseLogEntry>;
}

export interface ShoppingItem {
  id: string;
  nombre: string;
  categoria: string;
  base: boolean;
}

export interface Profile {
  sexo: "hombre" | "mujer";
  edad: number;
  peso: number;
  altura: number;
  pesoObjetivo: number;
  actividad: "sedentario" | "ligero" | "moderado" | "activo" | "muy_activo";
  objetivo: "definir" | "mantener" | "recomposicion";
  diaPesaje: DayKey;
}
