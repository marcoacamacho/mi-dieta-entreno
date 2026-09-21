export type CategoriaReceta = "dulce" | "salado";

export interface Receta {
  id: string;
  nombre: string;
  categoria: CategoriaReceta;
  emoji: string;
  kcal: number;
  proteina: number;
  ingredientes: string[];
  pasos: string[];
}

export const RECETAS: Receta[] = [
  {
    id: "mug-cake",
    nombre: "Mug cake proteico de chocolate",
    categoria: "dulce",
    emoji: "🍫",
    kcal: 220,
    proteina: 28,
    ingredientes: [
      "1 medida de proteína whey de chocolate (30g)",
      "1 huevo",
      "2 cdas de cacao puro en polvo",
      "1 cdta de levadura",
      "3-4 cdas de leche desnatada",
      "Edulcorante al gusto",
    ],
    pasos: [
      "Mezcla todos los ingredientes en una taza apta para microondas hasta que quede una masa homogénea.",
      "Microondas 90 segundos a máxima potencia.",
      "Deja templar 1 minuto antes de comer.",
    ],
  },
  {
    id: "tortitas-proteicas",
    nombre: "Tortitas de avena y proteína",
    categoria: "dulce",
    emoji: "🥞",
    kcal: 320,
    proteina: 34,
    ingredientes: [
      "40g de avena",
      "1 medida de proteína whey (30g)",
      "1 huevo",
      "1 plátano maduro",
      "Canela al gusto",
    ],
    pasos: [
      "Tritura todos los ingredientes hasta obtener una masa fina.",
      "Cocina en sartén antiadherente a fuego medio, 2-3 min por lado.",
      "Sirve con fruta fresca o un poco de miel.",
    ],
  },
  {
    id: "yogur-bowl",
    nombre: "Bowl de yogur griego con proteína",
    categoria: "dulce",
    emoji: "🍓",
    kcal: 260,
    proteina: 35,
    ingredientes: [
      "200g de yogur griego 0%",
      "1/2 medida de proteína whey",
      "Frutos rojos",
      "Un puñado de granola sin azúcar",
    ],
    pasos: [
      "Mezcla el yogur con la proteína en polvo hasta integrar bien.",
      "Añade los frutos rojos y la granola por encima.",
    ],
  },
  {
    id: "nice-cream",
    nombre: '"Helado" proteico de plátano (nice cream)',
    categoria: "dulce",
    emoji: "🍌",
    kcal: 210,
    proteina: 22,
    ingredientes: [
      "1 plátano congelado en trozos",
      "1 medida de proteína whey",
      "2-3 cdas de leche desnatada o bebida vegetal",
    ],
    pasos: [
      "Tritura el plátano congelado con la proteína y la leche en una batidora potente.",
      "Añade líquido poco a poco hasta lograr textura de helado.",
      "Sirve de inmediato o congela 20 min para que quede más firme.",
    ],
  },
  {
    id: "brownie-alubias",
    nombre: "Brownie proteico de alubias negras",
    categoria: "dulce",
    emoji: "🍰",
    kcal: 180,
    proteina: 16,
    ingredientes: [
      "1 bote de alubias negras cocidas escurridas (240g)",
      "1 medida de proteína whey de chocolate",
      "2 cdas de cacao puro",
      "2 huevos",
      "Edulcorante al gusto",
      "1 cdta de levadura",
    ],
    pasos: [
      "Tritura las alubias con el resto de ingredientes hasta obtener una masa lisa.",
      "Vierte en un molde pequeño y hornea 20-25 min a 180°C.",
      "Deja enfriar antes de cortar en porciones.",
    ],
  },
  {
    id: "cloud-bread",
    nombre: "Nube de requesón al horno (cloud bread proteico)",
    categoria: "dulce",
    emoji: "☁️",
    kcal: 150,
    proteina: 18,
    ingredientes: [
      "100g de requesón o queso batido 0%",
      "2 claras de huevo",
      "1 cdta de levadura",
      "Edulcorante o canela al gusto",
    ],
    pasos: [
      "Monta las claras a punto de nieve.",
      "Mezcla con cuidado el requesón, la levadura y el edulcorante.",
      "Hornea a 150°C durante 25 min sobre papel de horno.",
    ],
  },
  {
    id: "pudding-chia",
    nombre: "Pudding de chía y proteína",
    categoria: "dulce",
    emoji: "🍮",
    kcal: 240,
    proteina: 26,
    ingredientes: [
      "2 cdas de semillas de chía",
      "200ml de leche desnatada o bebida vegetal",
      "1 medida de proteína whey",
      "Fruta fresca para decorar",
    ],
    pasos: [
      "Mezcla la leche con la proteína hasta disolver bien.",
      "Añade las semillas de chía y remueve.",
      "Deja reposar en la nevera mínimo 4 horas o toda la noche.",
    ],
  },
  {
    id: "galletas-avena",
    nombre: "Galletas de avena, plátano y proteína",
    categoria: "dulce",
    emoji: "🍪",
    kcal: 90,
    proteina: 8,
    ingredientes: [
      "1 plátano maduro",
      "60g de avena",
      "1 medida de proteína whey",
      "Un puñado de pepitas de chocolate 85%",
    ],
    pasos: [
      "Machaca el plátano y mezcla con la avena y la proteína.",
      "Añade las pepitas de chocolate e integra.",
      "Forma galletas pequeñas y hornea 12-15 min a 180°C.",
    ],
  },
  {
    id: "tortilla-claras-verduras",
    nombre: "Tortilla de claras con verduras",
    categoria: "salado",
    emoji: "🍳",
    kcal: 210,
    proteina: 28,
    ingredientes: [
      "5 claras de huevo",
      "1 huevo entero",
      "Espinacas, champiñones y pimiento a elegir",
      "Sal, pimienta y especias al gusto",
    ],
    pasos: [
      "Saltea las verduras un par de minutos en una sartén antiadherente.",
      "Añade las claras y el huevo batidos y cuaja a fuego medio-bajo.",
      "Dobla por la mitad y sirve.",
    ],
  },
  {
    id: "wrap-pollo-yogur",
    nombre: "Wrap de pollo y yogur",
    categoria: "salado",
    emoji: "🌯",
    kcal: 380,
    proteina: 40,
    ingredientes: [
      "1 tortita integral de trigo o maíz",
      "150g de pechuga de pollo a la plancha",
      "2 cdas de yogur griego 0% con mostaza",
      "Lechuga y tomate",
    ],
    pasos: [
      "Trocea el pollo y mézclalo con el yogur y la mostaza.",
      "Rellena la tortita con el pollo, lechuga y tomate.",
      "Enrolla bien apretado y corta por la mitad.",
    ],
  },
  {
    id: "ensalada-atun-garbanzos",
    nombre: "Ensalada de atún y garbanzos",
    categoria: "salado",
    emoji: "🥗",
    kcal: 340,
    proteina: 32,
    ingredientes: [
      "1 lata de atún al natural",
      "150g de garbanzos cocidos",
      "Tomate, pepino y cebolla morada",
      "Aceite de oliva, limón y sal",
    ],
    pasos: [
      "Escurre el atún y mezcla con los garbanzos y las verduras troceadas.",
      "Aliña con aceite, limón y sal justo antes de comer.",
    ],
  },
  {
    id: "rollitos-pavo-queso",
    nombre: "Rollitos de pavo y queso fresco",
    categoria: "salado",
    emoji: "🧀",
    kcal: 160,
    proteina: 24,
    ingredientes: [
      "6 lonchas de pechuga de pavo",
      "100g de queso fresco batido 0% o requesón",
      "Cebollino o eneldo al gusto",
    ],
    pasos: [
      "Unta cada loncha de pavo con el queso fresco y las hierbas.",
      "Enrolla bien apretado y corta por la mitad si quieres hacerlo bocado a bocado.",
    ],
  },
  {
    id: "revuelto-claras-champi",
    nombre: "Revuelto de claras con champiñones y jamón",
    categoria: "salado",
    emoji: "🍄",
    kcal: 230,
    proteina: 30,
    ingredientes: [
      "5 claras de huevo",
      "100g de champiñones laminados",
      "40g de jamón cocido extra o pavo en taquitos",
    ],
    pasos: [
      "Saltea los champiñones hasta que suelten el agua y se doren.",
      "Añade el jamón y las claras, remueve a fuego medio hasta que cuaje.",
    ],
  },
  {
    id: "poke-salmon",
    nombre: "Poke bowl ligero de salmón",
    categoria: "salado",
    emoji: "🐟",
    kcal: 420,
    proteina: 36,
    ingredientes: [
      "120g de salmón fresco en dados (o ahumado)",
      "80g de arroz integral cocido",
      "Edamame, pepino, aguacate y zanahoria",
      "Salsa de soja baja en sal",
    ],
    pasos: [
      "Cuece el arroz y déjalo templar.",
      "Coloca el arroz en un bowl y añade el salmón y las verduras troceadas.",
      "Riega con un chorrito de salsa de soja.",
    ],
  },
  {
    id: "crema-calabacin-pollo",
    nombre: "Crema de calabacín con pollo desmenuzado",
    categoria: "salado",
    emoji: "🥣",
    kcal: 280,
    proteina: 34,
    ingredientes: [
      "2 calabacines",
      "1/2 cebolla",
      "150g de pechuga de pollo cocida y desmenuzada",
      "Caldo de verduras, sal y pimienta",
    ],
    pasos: [
      "Cuece el calabacín y la cebolla en el caldo hasta que estén tiernos.",
      "Tritura hasta que quede una crema fina.",
      "Sirve con el pollo desmenuzado por encima.",
    ],
  },
];
