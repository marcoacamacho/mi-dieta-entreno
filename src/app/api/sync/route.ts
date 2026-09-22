import { NextRequest, NextResponse } from "next/server";
import { put, list } from "@vercel/blob";

const BLOB_PATHNAME = "dieta-entreno-state.json";

/** null = autorizado, si no un mensaje de error listo para mostrar. */
function comprobarPin(req: NextRequest): string | null {
  const pin = process.env.SYNC_PIN;
  if (!pin) return "El servidor no tiene SYNC_PIN configurado (revisa las variables de entorno en Vercel)";
  if (req.headers.get("x-sync-pin") !== pin) return "PIN incorrecto";
  return null;
}

export async function GET(req: NextRequest) {
  const error = comprobarPin(req);
  if (error) return NextResponse.json({ error }, { status: 401 });

  try {
    const { blobs } = await list({ prefix: BLOB_PATHNAME, limit: 1 });
    const blob = blobs.find((b) => b.pathname === BLOB_PATHNAME);
    if (!blob) return NextResponse.json({ data: null });
    // El almacén está configurado en acceso privado: hace falta el token
    // para leer el contenido, la URL sola ya no es públicamente accesible.
    const res = await fetch(blob.url, {
      cache: "no-store",
      headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
    });
    if (!res.ok) throw new Error(`No se pudo leer el almacén (${res.status})`);
    const data = await res.json();
    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Error desconocido al leer el almacén" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const error = comprobarPin(req);
  if (error) return NextResponse.json({ error }, { status: 401 });

  try {
    const body = await req.json();
    await put(BLOB_PATHNAME, JSON.stringify(body), {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Error desconocido al escribir en el almacén" },
      { status: 500 }
    );
  }
}
