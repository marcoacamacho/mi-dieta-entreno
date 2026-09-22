import { NextRequest, NextResponse } from "next/server";
import { put, list } from "@vercel/blob";

const BLOB_PATHNAME = "dieta-entreno-state.json";

function pinValido(req: NextRequest): boolean {
  const pin = process.env.SYNC_PIN;
  if (!pin) return false;
  return req.headers.get("x-sync-pin") === pin;
}

export async function GET(req: NextRequest) {
  if (!pinValido(req)) {
    return NextResponse.json({ error: "PIN incorrecto" }, { status: 401 });
  }
  const { blobs } = await list({ prefix: BLOB_PATHNAME, limit: 1 });
  const blob = blobs.find((b) => b.pathname === BLOB_PATHNAME);
  if (!blob) {
    return NextResponse.json({ data: null });
  }
  const res = await fetch(blob.url, { cache: "no-store" });
  const data = await res.json();
  return NextResponse.json({ data });
}

export async function PUT(req: NextRequest) {
  if (!pinValido(req)) {
    return NextResponse.json({ error: "PIN incorrecto" }, { status: 401 });
  }
  const body = await req.json();
  await put(BLOB_PATHNAME, JSON.stringify(body), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
  return NextResponse.json({ ok: true });
}
