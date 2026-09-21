import { SUPLEMENTOS } from "../suplementosData";
import { Card, SectionTitle } from "../ui";

export default function SuplementosTab() {
  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-400">
        Precios orientativos revisados en septiembre de 2026 — cambian a menudo por ofertas.
        Usa los comparadores para ver el precio actualizado antes de comprar.
      </p>
      {SUPLEMENTOS.map((s) => (
        <Card key={s.id}>
          <SectionTitle>{s.nombre}</SectionTitle>
          <div className="space-y-2 text-sm text-slate-300 mb-3">
            <p><span className="text-slate-500">Para qué sirve: </span>{s.paraQue}</p>
            <p><span className="text-slate-500">Dosis: </span>{s.dosis}</p>
            <p><span className="text-slate-500">Cómo tomarla: </span>{s.comoTomarla}</p>
            <p><span className="text-slate-500">Consejo de compra: </span>{s.consejoCompra}</p>
          </div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
            Dónde comprarla
          </div>
          <ul className="space-y-1.5">
            {s.tiendas.map((t) => (
              <li key={t.url} className="text-sm">
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2"
                >
                  {t.nombre}
                </a>
                <span className="text-slate-500"> — {t.nota}</span>
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}
