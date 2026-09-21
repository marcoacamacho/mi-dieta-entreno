export interface Receta {
  id: string;
  nombre: string;
  kcal: number;
  proteina: number;
  ingredientes: string[];
  pasos: string[];
}

export const RECETAS: Receta[] = [
  {
    id: "mug-cake",
    nombre: "Mug cake proteico de chocolate",
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
];
