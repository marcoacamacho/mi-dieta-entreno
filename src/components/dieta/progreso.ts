import { DailyLog, Profile, DAY_KEYS, DAY_LABELS } from "./types";
import { Targets } from "./calc";
import { MEAL_PLAN, EXERCISE_INDEX, WORKOUT_PLAN } from "./planData";
import { dayOfWeekKey, todayISO, addDays } from "./dateUtils";

export interface EjercicioProgreso {
  id: string;
  nombre: string;
  emoji: string;
  primerPeso: number;
  ultimoPeso: number;
  delta: number;
}

export type EstadoProgreso = "inicio" | "objetivo" | "bien" | "mejorable";

export interface PuntoPeso {
  fecha: string;
  peso: number;
}

export interface ResumenProgreso {
  diasRegistrados: number;
  adherenciaMenuPct: number | null;
  proteinaPromedioPct: number | null;
  kcalPromedioPct: number | null;
  diasSobrepasadoPct: number | null;
  pesosRegistrados: number;
  pesoInicio: number | null;
  pesoActual: number | null;
  deltaPesoTotal: number | null;
  ritmoSemanalKg: number | null;
  serieDePeso: PuntoPeso[];
  ejerciciosProgreso: EjercicioProgreso[];
  consejos: string[];
  frase: string;
  estado: EstadoProgreso;
}

const FRASES: Record<EstadoProgreso, string[]> = {
  inicio: [
    "Cada gran cambio empieza con un primer paso. Hoy es ese paso. 💪",
    "No hace falta ser perfecto, solo hace falta empezar. 🌱",
    "Dentro de unas semanas, el tú de hoy será el inicio de la historia. 🚀",
  ],
  objetivo: [
    "¡Lo has conseguido! Esto es la prueba de que la constancia funciona. 🎉",
    "Objetivo cumplido — ahora toca decidir hasta dónde quieres llegar. 🏆",
    "Este resultado no ha sido suerte, ha sido disciplina. Enhorabuena. 🔥",
  ],
  bien: [
    "Lo estás haciendo muy bien — la constancia de hoy es el cuerpo de mañana. 🔥",
    "Cada día que cumples suma más de lo que parece. Sigue así. 💪",
    "Vas por el buen camino: no lo sueltes ahora. 🌟",
  ],
  mejorable: [
    "No pasa nada por tropezar, lo que cuenta es seguir levantándote. 🌱",
    "Los días difíciles también forman parte del progreso — no tires la toalla. ❤️",
    "Un mal día no borra el esfuerzo de los demás. Vuelve a intentarlo mañana. 💛",
  ],
};

function fraseMotivacional(estado: EstadoProgreso, semilla: number): string {
  const opciones = FRASES[estado];
  return opciones[semilla % opciones.length];
}

export function calcularResumenProgreso(
  logs: Record<string, DailyLog>,
  profile: Profile,
  targets: Targets
): ResumenProgreso {
  const fechas = Object.keys(logs).sort();
  const diasConActividad = fechas.filter((f) => {
    const l = logs[f];
    return (
      l.comidosIds.length > 0 ||
      l.extras.length > 0 ||
      typeof l.pesoCorporal === "number" ||
      Object.keys(l.ejercicios).length > 0
    );
  });

  let sumAdherencia = 0;
  let nAdherencia = 0;
  let sumProteinaPct = 0;
  let nProteina = 0;
  let sumKcalPct = 0;
  let nKcal = 0;
  let diasSobre = 0;

  for (const f of diasConActividad) {
    const log = logs[f];
    const plan = MEAL_PLAN.find((d) => d.day === dayOfWeekKey(f));
    if (!plan || plan.diaLibreDieta || plan.meals.length === 0) continue;

    const comidos = plan.meals.filter((m) => log.comidosIds.includes(m.id));
    sumAdherencia += comidos.length / plan.meals.length;
    nAdherencia++;

    const kcalConsumido = comidos.reduce((a, m) => a + m.kcal, 0) + log.extras.reduce((a, e) => a + e.kcal, 0);
    const protConsumido =
      comidos.reduce((a, m) => a + m.proteina, 0) + log.extras.reduce((a, e) => a + e.proteina, 0);

    if (kcalConsumido > 0) {
      sumKcalPct += kcalConsumido / targets.kcal;
      nKcal++;
      if (kcalConsumido > targets.kcal) diasSobre++;
    }
    if (protConsumido > 0) {
      sumProteinaPct += protConsumido / targets.proteina;
      nProteina++;
    }
  }

  const adherenciaMenuPct = nAdherencia > 0 ? Math.round((sumAdherencia / nAdherencia) * 100) : null;
  const proteinaPromedioPct = nProteina > 0 ? Math.round((sumProteinaPct / nProteina) * 100) : null;
  const kcalPromedioPct = nKcal > 0 ? Math.round((sumKcalPct / nKcal) * 100) : null;
  const diasSobrepasadoPct = nKcal > 0 ? Math.round((diasSobre / nKcal) * 100) : null;

  const pesosOrdenados = fechas
    .filter((f) => typeof logs[f].pesoCorporal === "number")
    .map((f) => ({ fecha: f, peso: logs[f].pesoCorporal as number }));

  const pesoInicio = pesosOrdenados.length > 0 ? pesosOrdenados[0].peso : null;
  const pesoActual = pesosOrdenados.length > 0 ? pesosOrdenados[pesosOrdenados.length - 1].peso : null;
  const deltaPesoTotal = pesoInicio !== null && pesoActual !== null ? pesoActual - pesoInicio : null;

  let ritmoSemanalKg: number | null = null;
  if (pesosOrdenados.length >= 2 && deltaPesoTotal !== null) {
    const primerT = new Date(pesosOrdenados[0].fecha).getTime();
    const ultimoT = new Date(pesosOrdenados[pesosOrdenados.length - 1].fecha).getTime();
    const semanas = Math.max(1 / 7, (ultimoT - primerT) / (1000 * 60 * 60 * 24 * 7));
    ritmoSemanalKg = deltaPesoTotal / semanas;
  }

  const porEjercicio = new Map<string, { fecha: string; peso: number }[]>();
  for (const f of fechas) {
    for (const [exId, entry] of Object.entries(logs[f].ejercicios)) {
      if (typeof entry.peso !== "number") continue;
      if (!porEjercicio.has(exId)) porEjercicio.set(exId, []);
      porEjercicio.get(exId)!.push({ fecha: f, peso: entry.peso });
    }
  }
  const ejerciciosProgreso: EjercicioProgreso[] = [];
  for (const [exId, entries] of porEjercicio) {
    if (entries.length < 2) continue;
    const info = EXERCISE_INDEX[exId];
    if (!info) continue;
    entries.sort((a, b) => a.fecha.localeCompare(b.fecha));
    const primerPeso = entries[0].peso;
    const ultimoPeso = entries[entries.length - 1].peso;
    ejerciciosProgreso.push({ id: exId, nombre: info.nombre, emoji: info.emoji, primerPeso, ultimoPeso, delta: ultimoPeso - primerPeso });
  }
  ejerciciosProgreso.sort((a, b) => b.delta - a.delta);

  const objetivoConseguido = pesoActual !== null && Math.abs(pesoActual - profile.pesoObjetivo) < 0.3;

  let estado: EstadoProgreso;
  if (objetivoConseguido) {
    estado = "objetivo";
  } else if (diasConActividad.length === 0) {
    estado = "inicio";
  } else {
    let puntos = 0;
    let señales = 0;
    if (adherenciaMenuPct !== null) {
      señales++;
      if (adherenciaMenuPct >= 70) puntos++;
    }
    if (proteinaPromedioPct !== null) {
      señales++;
      if (proteinaPromedioPct >= 85) puntos++;
    }
    if (diasSobrepasadoPct !== null) {
      señales++;
      if (diasSobrepasadoPct <= 40) puntos++;
    }
    estado = señales === 0 ? "inicio" : puntos / señales >= 0.6 ? "bien" : "mejorable";
  }

  const consejos: string[] = [];

  if (adherenciaMenuPct !== null && adherenciaMenuPct < 70) {
    consejos.push(
      `Solo completas el ${adherenciaMenuPct}% de las comidas del menú planeado. Prueba a dejar comida preparada con antelación (batch cooking) para los días más liados.`
    );
  }
  if (proteinaPromedioPct !== null && proteinaPromedioPct < 85) {
    consejos.push(
      `Te está costando llegar a tu objetivo de proteína (${proteinaPromedioPct}% de media). No te saltes el batido si vas justo de tiempo.`
    );
  }
  if (diasSobrepasadoPct !== null && diasSobrepasadoPct > 40) {
    consejos.push(
      `Te pasas de calorías el ${diasSobrepasadoPct}% de los días registrados. Revisa si las comidas fuera de menú se están acumulando.`
    );
  }
  if (pesosOrdenados.length === 0) {
    consejos.push("Todavía no has registrado tu peso. Hazlo el día de pesaje que elegiste en Perfil para empezar a ver tu evolución aquí.");
  } else if (pesosOrdenados.length === 1) {
    consejos.push("Solo tienes un pesaje registrado — la semana que viene ya podrás ver la tendencia.");
  } else if (ritmoSemanalKg !== null && pesoInicio !== null) {
    const quiereBajar = profile.pesoObjetivo < pesoInicio;
    if (quiereBajar && ritmoSemanalKg > -0.05) {
      consejos.push("Tu peso no está bajando al ritmo esperado. Revisa la constancia con la dieta y con el entreno.");
    } else if (!quiereBajar && ritmoSemanalKg < 0.05) {
      consejos.push("Tu peso no está subiendo hacia tu objetivo. Asegúrate de llegar a las calorías objetivo cada día.");
    }
  }
  const exEstancados = ejerciciosProgreso.filter((e) => e.delta <= 0);
  if (exEstancados.length > 0) {
    consejos.push(
      `En ${exEstancados.slice(0, 2).map((e) => e.nombre).join(" y ")} no has subido el peso últimamente — prueba a añadir una repetición más o un poco más de carga.`
    );
  }
  if (consejos.length === 0 && diasConActividad.length > 0) {
    consejos.push("Todo bajo control: sigue registrando cada día para mantener esta racha.");
  }

  const semilla = fechas.length > 0 ? new Date(fechas[fechas.length - 1]).getDate() : new Date().getDate();

  return {
    diasRegistrados: diasConActividad.length,
    adherenciaMenuPct,
    proteinaPromedioPct,
    kcalPromedioPct,
    diasSobrepasadoPct,
    pesosRegistrados: pesosOrdenados.length,
    pesoInicio,
    pesoActual,
    deltaPesoTotal,
    ritmoSemanalKg,
    serieDePeso: pesosOrdenados.map((p) => ({ fecha: p.fecha.slice(5), peso: p.peso })),
    ejerciciosProgreso,
    consejos,
    frase: fraseMotivacional(estado, semilla),
    estado,
  };
}

function tieneEntrenoRegistrado(log: DailyLog | undefined): boolean {
  if (!log) return false;
  return Object.values(log.ejercicios).some((e) => typeof e.peso === "number" || typeof e.reps === "number");
}

export interface ResumenSemanal {
  entrenosCompletados: number;
  entrenosPlanificados: number;
  pesoTotalLevantado: number;
  setsRegistrados: number;
}

/** Resumen de la semana en curso (lunes a hoy — los días futuros de la
 * semana no cuentan todavía). */
export function calcularResumenSemanal(logs: Record<string, DailyLog>): ResumenSemanal {
  const hoy = todayISO();
  const idxHoy = DAY_KEYS.indexOf(dayOfWeekKey(hoy));
  const lunes = addDays(hoy, -idxHoy);

  let entrenosCompletados = 0;
  let entrenosPlanificados = 0;
  let pesoTotalLevantado = 0;
  let setsRegistrados = 0;

  for (let i = 0; i < 7; i++) {
    const fecha = addDays(lunes, i);
    if (fecha > hoy) break;
    const workoutDay = WORKOUT_PLAN.find((d) => d.day === dayOfWeekKey(fecha));
    if (!workoutDay) continue;
    entrenosPlanificados++;
    const log = logs[fecha];
    if (tieneEntrenoRegistrado(log)) entrenosCompletados++;
    if (log) {
      for (const entry of Object.values(log.ejercicios)) {
        if (typeof entry.peso === "number") {
          setsRegistrados++;
          pesoTotalLevantado += entry.peso * (entry.reps ?? 1);
        }
      }
    }
  }

  return {
    entrenosCompletados,
    entrenosPlanificados,
    pesoTotalLevantado: Math.round(pesoTotalLevantado),
    setsRegistrados,
  };
}

export interface EntrenoReciente {
  fecha: string;
  diaLabel: string;
  titulo: string;
  completado: boolean;
  esHoy: boolean;
}

/** Últimos días de entreno planificados (hacia atrás desde hoy), con si se
 * registró o no. Para poder ver la constancia reciente de un vistazo. */
export function calcularEntrenosRecientes(logs: Record<string, DailyLog>, cantidad = 5): EntrenoReciente[] {
  const hoy = todayISO();
  const resultado: EntrenoReciente[] = [];
  let fecha = hoy;
  let vueltas = 0;
  while (resultado.length < cantidad && vueltas < 60) {
    const dayKey = dayOfWeekKey(fecha);
    const workoutDay = WORKOUT_PLAN.find((d) => d.day === dayKey);
    if (workoutDay) {
      resultado.push({
        fecha,
        diaLabel: DAY_LABELS[dayKey],
        titulo: workoutDay.titulo,
        completado: tieneEntrenoRegistrado(logs[fecha]),
        esHoy: fecha === hoy,
      });
    }
    fecha = addDays(fecha, -1);
    vueltas++;
  }
  return resultado;
}
