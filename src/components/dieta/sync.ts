import { DailyLog, Profile, ShoppingItem } from "./types";

export interface SyncPayload {
  logs: Record<string, DailyLog>;
  profile: Profile;
  shoppingChecked: Record<string, boolean>;
  shoppingCustom: ShoppingItem[];
  updatedAt: number;
}

class SyncError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function mensajeError(res: Response): Promise<string> {
  try {
    const json = await res.json();
    if (typeof json.error === "string") return json.error;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_e) {
    // el cuerpo no era JSON (p.ej. una página de error genérica del hosting)
  }
  return `Error al sincronizar (${res.status})`;
}

export async function pullRemote(pin: string): Promise<SyncPayload | null> {
  const res = await fetch("/api/sync", { headers: { "x-sync-pin": pin } });
  if (!res.ok) {
    throw new SyncError(res.status, await mensajeError(res));
  }
  const json = await res.json();
  return (json.data as SyncPayload | null) ?? null;
}

export async function pushRemote(pin: string, payload: SyncPayload): Promise<void> {
  const res = await fetch("/api/sync", {
    method: "PUT",
    headers: { "content-type": "application/json", "x-sync-pin": pin },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new SyncError(res.status, await mensajeError(res));
  }
}
