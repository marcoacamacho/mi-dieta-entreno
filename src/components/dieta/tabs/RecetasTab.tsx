import { RECETAS } from "../recetasData";
import { Card, SectionTitle } from "../ui";

export default function RecetasTab() {
  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-400">
        Postres y snacks dulces bajos en calorías y altos en proteína, del estilo de los que
        circulan por Instagram/TikTok fitness. Ideales para la merienda o para un antojo dulce
        sin salirte del objetivo.
      </p>
      {RECETAS.map((r) => (
        <Card key={r.id}>
          <div className="flex items-start justify-between gap-3 mb-2">
            <SectionTitle>{r.nombre}</SectionTitle>
            <span className="shrink-0 text-xs text-slate-500 whitespace-nowrap">
              {r.kcal} kcal · {r.proteina}g prot
            </span>
          </div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Ingredientes</div>
          <ul className="list-disc list-inside text-sm text-slate-300 space-y-0.5 mb-3">
            {r.ingredientes.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Preparación</div>
          <ol className="list-decimal list-inside text-sm text-slate-300 space-y-0.5">
            {r.pasos.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ol>
        </Card>
      ))}
    </div>
  );
}
