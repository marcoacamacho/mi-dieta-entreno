export interface TiendaLink {
  nombre: string;
  url: string;
  nota: string;
}

export interface Suplemento {
  id: string;
  nombre: string;
  paraQue: string;
  dosis: string;
  comoTomarla: string;
  consejoCompra: string;
  tiendas: TiendaLink[];
}

// Precios orientativos consultados en septiembre de 2026: cambian a menudo
// por ofertas, así que antes de comprar compara en un comparador en vivo.
export const SUPLEMENTOS: Suplemento[] = [
  {
    id: "whey",
    nombre: "Proteína whey (suero)",
    paraQue:
      "Completar la proteína diaria de forma rápida y barata cuando no llegas con comida real (media mañana, merienda o post-entreno).",
    dosis: "1 medida (25-30 g) por toma, 1-2 tomas al día según cuánto te falte para tu objetivo de proteína.",
    comoTomarla: "Mezclada con agua, leche desnatada o bebida vegetal en un shaker.",
    consejoCompra:
      "No hace falta la más cara: cualquier whey concentrado o whey isolate de una marca seria cumple igual. Compara siempre el precio por cada 10 g de proteína, no el precio del bote. HSN Evowhey y MyProtein Impact Whey suelen ser las mejores relaciones calidad-precio del mercado español.",
    tiendas: [
      { nombre: "StackFit — comparador de precios €/kg en vivo", url: "https://stackfit.es/proteina-whey/", nota: "compara HSN, MyProtein, Nutritienda y Prozis a la vez" },
      { nombre: "HSN Evowhey", url: "https://www.hsnstore.com/evowhey-protein", nota: "marca española, envío 24-48h, buena relación calidad-precio" },
      { nombre: "MyProtein Impact Whey", url: "https://www.myprotein.es/nutrition/protein/whey-protein.list", nota: "ofertas frecuentes del 40-50%, suscríbete a su newsletter antes de comprar" },
    ],
  },
  {
    id: "creatina",
    nombre: "Creatina monohidrato",
    paraQue:
      "Mejora la fuerza y el rendimiento en series de pocas repeticiones; ayuda a mantener masa muscular en déficit calórico. Es el suplemento con más evidencia científica junto a la proteína.",
    dosis: "3-5 g al día, todos los días (también los días de descanso). No hace falta fase de carga.",
    comoTomarla: "Disuelta en agua, batido o zumo, a cualquier hora del día — lo importante es la constancia diaria, no el momento.",
    consejoCompra:
      "La creatina monohidrato básica (sin marcas registradas tipo \"Creapure\" premium) funciona igual de bien y es mucho más barata: no pagues de más por versiones \"mejoradas\". Busca precio por kg, no por bote pequeño.",
    tiendas: [
      { nombre: "idealo.es — comparador de precios en vivo", url: "https://www.idealo.es/cat/14272F8149051/nutricion-deportiva.html", nota: "compara todas las tiendas a la vez" },
      { nombre: "Decathlon Creatina monohidrato", url: "https://www.decathlon.es/es/salud-y-bienestar/creatina-monohidrato", nota: "de las opciones más baratas por kg" },
      { nombre: "HSN Creatina monohidrato", url: "https://www.hsnstore.com/creatina-monohidrato", nota: "pureza certificada con analíticas públicas" },
    ],
  },
  {
    id: "beta-alanina",
    nombre: "Beta-alanina",
    paraQue:
      "Retrasa la fatiga muscular en esfuerzos de 1-4 minutos (series largas, circuitos, HIIT), útil para los entrenos de piernas y el circuito metabólico del viernes.",
    dosis: "3.2-6.4 g al día, repartidos en 2-3 tomas para reducir el hormigueo (parestesia) en la piel, que es normal e inofensivo.",
    comoTomarla: "Con o sin comida, repartida a lo largo del día en tomas de 1.6-2 g.",
    consejoCompra:
      "Es opcional frente a proteína y creatina — notarás menos diferencia. Cómprala solo si ya tienes proteína y creatina cubiertas y quieres un extra en entrenos largos o intensos.",
    tiendas: [
      { nombre: "Nutritienda Beta-alanina", url: "https://www.nutritienda.com/es/beta-alanina", nota: "amplio catálogo, envío 24-48h" },
      { nombre: "MASmusculo Beta-alanina", url: "https://www.masmusculo.com/es/30507-beta-alanina", nota: "buena variedad de formatos y precios" },
      { nombre: "Decathlon Beta-alanina en polvo", url: "https://www.decathlon.es/es/salud-y-bienestar/betaalanina-en-polvo", nota: "opción económica" },
    ],
  },
];
