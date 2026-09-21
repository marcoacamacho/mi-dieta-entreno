"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const PREFIX = "dieta:";
const listeners = new Set<() => void>();

function readRaw(fullKey: string): string | null {
  try {
    return window.localStorage.getItem(fullKey);
  } catch {
    return null;
  }
}

function writeRaw(fullKey: string, json: string) {
  try {
    window.localStorage.setItem(fullKey, json);
  } catch {
    // localStorage no disponible (modo privado, cuota llena, etc.): se ignora,
    // el estado en memoria del render actual sigue siendo el correcto.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getServerSnapshot() {
  return null;
}

/** Estado persistido en localStorage, sincronizado entre pestañas y sin
 * desajustes de hidratación: en el servidor y en el primer render del
 * cliente se usa siempre `initialValue`, y justo después del montaje
 * React vuelve a leer localStorage y repinta con el valor real. */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const fullKey = PREFIX + key;

  const getSnapshot = useCallback(() => readRaw(fullKey), [fullKey]);
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const value = useMemo<T>(() => {
    if (raw == null) return initialValue;
    try {
      return JSON.parse(raw) as T;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_e) {
      return initialValue;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raw]);

  const setValue = useCallback(
    (updater: T | ((prev: T) => T)) => {
      const currentRaw = readRaw(fullKey);
      let prev = initialValue;
      if (currentRaw != null) {
        try {
          prev = JSON.parse(currentRaw) as T;
        } catch {
          prev = initialValue;
        }
      }
      const next = typeof updater === "function" ? (updater as (p: T) => T)(prev) : updater;
      writeRaw(fullKey, JSON.stringify(next));
    },
    [fullKey, initialValue]
  );

  return [value, setValue] as const;
}
