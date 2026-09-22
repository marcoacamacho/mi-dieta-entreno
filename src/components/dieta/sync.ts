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

export async function pullRemote(pin: string): Promise<SyncPayload | null> {
  const res = await fetch("/api/sync", { headers: { "x-sync-pin": pin } });
  if (!res.ok) {
    throw new SyncError(res.status, res.status === 401 ? "PIN incorrecto" : "Error al sincronizar");
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
    throw new SyncError(res.status, res.status === 401 ? "PIN incorrecto" : "Error al sincronizar");
  }
}
