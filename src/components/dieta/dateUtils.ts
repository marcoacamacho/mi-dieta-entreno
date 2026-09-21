import { DayKey } from "./types";

const DAY_INDEX: DayKey[] = [
  "domingo",
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
];

export function todayISO(): string {
  const d = new Date();
  return toISO(d);
}

function toISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseISO(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function dayOfWeekKey(iso: string): DayKey {
  const d = parseISO(iso);
  return DAY_INDEX[d.getDay()];
}

export function addDays(iso: string, n: number): string {
  const d = parseISO(iso);
  d.setDate(d.getDate() + n);
  return toISO(d);
}

const DISPLAY_FORMATTER = new Intl.DateTimeFormat("es-ES", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

export function formatDisplayDate(iso: string): string {
  const texto = DISPLAY_FORMATTER.format(parseISO(iso));
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
