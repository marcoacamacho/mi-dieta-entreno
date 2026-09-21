"use client";

import { useMemo, useState } from "react";
import { ShoppingItem } from "../types";
import { SHOPPING_CATEGORIES, BASE_SHOPPING_LIST, CATEGORY_EMOJI } from "../planData";
import { Card, SectionTitle, ProgressBar } from "../ui";

interface Props {
  checked: Record<string, boolean>;
  setChecked: (updater: (prev: Record<string, boolean>) => Record<string, boolean>) => void;
  custom: ShoppingItem[];
  setCustom: (updater: (prev: ShoppingItem[]) => ShoppingItem[]) => void;
}

export default function CompraTab({ checked, setChecked, custom, setCustom }: Props) {
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaCategoria, setNuevaCategoria] = useState(SHOPPING_CATEGORIES[0]);

  const items = useMemo(() => [...BASE_SHOPPING_LIST, ...custom], [custom]);

  const porCategoria = useMemo(() => {
    const map = new Map<string, ShoppingItem[]>();
    for (const cat of SHOPPING_CATEGORIES) map.set(cat, []);
    for (const it of items) {
      if (!map.has(it.categoria)) map.set(it.categoria, []);
      map.get(it.categoria)!.push(it);
    }
    return map;
  }, [items]);

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function addCustom() {
    if (!nuevoNombre.trim()) return;
    const it: ShoppingItem = {
      id: `custom-${Date.now()}`,
      nombre: nuevoNombre.trim(),
      categoria: nuevaCategoria,
      base: false,
    };
    setCustom((prev) => [...prev, it]);
    setNuevoNombre("");
  }

  function removeCustom(id: string) {
    setCustom((prev) => prev.filter((i) => i.id !== id));
    setChecked((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  function resetChecks() {
    setChecked(() => ({}));
  }

  const totalMarcados = items.filter((i) => checked[i.id]).length;

  return (
    <div className="space-y-5">
      <Card>
        <SectionTitle>Añadir algo que ya tienes o que falta en la lista</SectionTitle>
        <div className="grid grid-cols-[1fr_auto_auto] gap-2">
          <input
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
            placeholder="Ej: papel de horno"
            className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:border-lime-400"
          />
          <select
            value={nuevaCategoria}
            onChange={(e) => setNuevaCategoria(e.target.value)}
            className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:border-lime-400"
          >
            {SHOPPING_CATEGORIES.map((c) => (
              <option key={c} value={c} className="bg-neutral-900">
                {c}
              </option>
            ))}
          </select>
          <button onClick={addCustom} className="btn-brand rounded-lg px-3 py-1.5 text-sm font-medium">
            Añadir
          </button>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400">🛒 {totalMarcados} de {items.length} ya en el carro / en casa</span>
          <button
            onClick={resetChecks}
            className="text-xs text-lime-300 transition-transform hover:text-lime-200 active:scale-90"
          >
            Desmarcar todo (nueva semana)
          </button>
        </div>
        <ProgressBar value={totalMarcados} max={items.length} colorClass="bg-emerald-500" />
      </Card>

      {SHOPPING_CATEGORIES.map((cat) => {
        const catItems = porCategoria.get(cat) ?? [];
        if (catItems.length === 0) return null;
        return (
          <Card key={cat}>
            <SectionTitle>
              <span className="mr-1.5">{CATEGORY_EMOJI[cat]}</span>
              {cat}
            </SectionTitle>
            <ul className="space-y-1.5">
              {catItems.map((it) => (
                <li key={it.id} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={!!checked[it.id]}
                    onChange={() => toggle(it.id)}
                    className="h-4 w-4 accent-emerald-500"
                  />
                  <span
                    className={`flex-1 text-sm transition-all duration-300 ${
                      checked[it.id] ? "text-slate-500 line-through opacity-60" : "text-slate-200"
                    }`}
                  >
                    {it.nombre}
                  </span>
                  {!it.base && (
                    <button
                      onClick={() => removeCustom(it.id)}
                      className="text-rose-400 transition-transform hover:text-rose-300 active:scale-90 text-xs"
                    >
                      Quitar
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        );
      })}
    </div>
  );
}
