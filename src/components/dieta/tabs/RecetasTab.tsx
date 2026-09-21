import { RECETAS, CategoriaReceta } from "../recetasData";
import { Card, SectionTitle } from "../ui";
import { youtubeSearchUrl } from "../youtube";

const SECCIONES: { categoria: CategoriaReceta; titulo: string; emoji: string }[] = [
  { categoria: "dulce", titulo: "Recetas dulces", emoji: "🍓" },
  { categoria: "salado", titulo: "Recetas saladas", emoji: "🥗" },
];

export default function RecetasTab() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-400">
        Postres, snacks y comidas rápidas bajas en calorías y altas en proteína, del estilo de
        los que circulan por Instagram/TikTok fitness. Ideales para romper la rutina del menú
        semanal sin salirte del objetivo.
      </p>
      {SECCIONES.map((seccion) => {
        const recetas = RECETAS.filter((r) => r.categoria === seccion.categoria);
        return (
          <div key={seccion.categoria} className="space-y-4">
            <h2 className="flex items-center gap-2 text-base font-bold text-white">
              <span>{seccion.emoji}</span> {seccion.titulo}
            </h2>
            {recetas.map((r) => (
              <Card key={r.id}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <SectionTitle>
                    <span className="mr-1.5">{r.emoji}</span>
                    {r.nombre}
                  </SectionTitle>
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
                <a
                  href={youtubeSearchUrl(`${r.nombre} receta`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-xs text-lime-300 hover:text-lime-200"
                >
                  ▶ Ver vídeo de cómo hacerla
                </a>
              </Card>
            ))}
          </div>
        );
      })}
    </div>
  );
}
