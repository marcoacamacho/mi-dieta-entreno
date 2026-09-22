export interface AlimentoRef {
  nombre: string;
  kcalPor100g: number;
  proteinaPor100g: number;
}

/** Valores aproximados (composición media, no de un producto concreto) para
 * poder calcular kcal/proteína a partir de los gramos que se registren en
 * "Comida fuera del menú", sin tener que teclear las calorías a mano. */
export const FOOD_DATABASE: AlimentoRef[] = [
  // Platos y comida social
  { nombre: "Pizza", kcalPor100g: 266, proteinaPor100g: 11 },
  { nombre: "Hamburguesa", kcalPor100g: 295, proteinaPor100g: 17 },
  { nombre: "Bocadillo de jamón", kcalPor100g: 280, proteinaPor100g: 15 },
  { nombre: "Bocadillo de calamares", kcalPor100g: 250, proteinaPor100g: 12 },
  { nombre: "Tortilla de patata", kcalPor100g: 200, proteinaPor100g: 7 },
  { nombre: "Paella", kcalPor100g: 170, proteinaPor100g: 8 },
  { nombre: "Croquetas", kcalPor100g: 260, proteinaPor100g: 7 },
  { nombre: "Calamares fritos", kcalPor100g: 250, proteinaPor100g: 13 },
  { nombre: "Ensaladilla rusa", kcalPor100g: 190, proteinaPor100g: 4 },
  { nombre: "Empanada", kcalPor100g: 270, proteinaPor100g: 9 },
  { nombre: "Kebab", kcalPor100g: 220, proteinaPor100g: 15 },
  { nombre: "Sushi (variado)", kcalPor100g: 150, proteinaPor100g: 6 },
  { nombre: "Lasaña", kcalPor100g: 170, proteinaPor100g: 9 },
  { nombre: "Pasta con tomate", kcalPor100g: 150, proteinaPor100g: 5 },
  { nombre: "Pasta carbonara", kcalPor100g: 210, proteinaPor100g: 8 },
  { nombre: "Guacamole", kcalPor100g: 150, proteinaPor100g: 2 },
  { nombre: "Nachos con queso", kcalPor100g: 340, proteinaPor100g: 7 },
  { nombre: "Ensalada mixta", kcalPor100g: 60, proteinaPor100g: 2 },
  { nombre: "Gazpacho", kcalPor100g: 40, proteinaPor100g: 1 },
  { nombre: "Cocido / puchero", kcalPor100g: 150, proteinaPor100g: 10 },
  { nombre: "Lentejas estofadas", kcalPor100g: 130, proteinaPor100g: 8 },
  { nombre: "Alubias estofadas", kcalPor100g: 130, proteinaPor100g: 8 },
  { nombre: "Garbanzos con espinacas", kcalPor100g: 140, proteinaPor100g: 7 },

  // Panadería y desayuno
  { nombre: "Pan blanco", kcalPor100g: 265, proteinaPor100g: 9 },
  { nombre: "Pan integral", kcalPor100g: 250, proteinaPor100g: 10 },
  { nombre: "Tostada con tomate", kcalPor100g: 220, proteinaPor100g: 6 },
  { nombre: "Croissant", kcalPor100g: 400, proteinaPor100g: 8 },
  { nombre: "Churros", kcalPor100g: 400, proteinaPor100g: 6 },
  { nombre: "Magdalena", kcalPor100g: 390, proteinaPor100g: 6 },
  { nombre: "Donut", kcalPor100g: 420, proteinaPor100g: 5 },
  { nombre: "Gofio", kcalPor100g: 380, proteinaPor100g: 10 },
  { nombre: "Tortitas", kcalPor100g: 230, proteinaPor100g: 6 },
  { nombre: "Cereales de desayuno", kcalPor100g: 380, proteinaPor100g: 7 },
  { nombre: "Muesli", kcalPor100g: 360, proteinaPor100g: 10 },
  { nombre: "Avena", kcalPor100g: 375, proteinaPor100g: 13 },

  // Snacks y dulces
  { nombre: "Patatas fritas (bolsa)", kcalPor100g: 540, proteinaPor100g: 6 },
  { nombre: "Palomitas", kcalPor100g: 380, proteinaPor100g: 9 },
  { nombre: "Chocolate con leche", kcalPor100g: 535, proteinaPor100g: 7 },
  { nombre: "Chocolate negro 70%", kcalPor100g: 600, proteinaPor100g: 8 },
  { nombre: "Helado", kcalPor100g: 210, proteinaPor100g: 4 },
  { nombre: "Galletas", kcalPor100g: 470, proteinaPor100g: 6 },
  { nombre: "Nutella", kcalPor100g: 540, proteinaPor100g: 6 },
  { nombre: "Mermelada", kcalPor100g: 250, proteinaPor100g: 0.5 },
  { nombre: "Miel", kcalPor100g: 305, proteinaPor100g: 0.3 },
  { nombre: "Azúcar", kcalPor100g: 400, proteinaPor100g: 0 },
  { nombre: "Barrita de cereales", kcalPor100g: 400, proteinaPor100g: 7 },
  { nombre: "Turrón", kcalPor100g: 480, proteinaPor100g: 10 },

  // Carnes y pescados
  { nombre: "Pollo asado", kcalPor100g: 190, proteinaPor100g: 27 },
  { nombre: "Pechuga de pollo", kcalPor100g: 165, proteinaPor100g: 31 },
  { nombre: "Muslo de pollo", kcalPor100g: 210, proteinaPor100g: 24 },
  { nombre: "Pechuga de pavo", kcalPor100g: 150, proteinaPor100g: 29 },
  { nombre: "Filete de ternera", kcalPor100g: 250, proteinaPor100g: 26 },
  { nombre: "Ternera magra", kcalPor100g: 175, proteinaPor100g: 26 },
  { nombre: "Lomo de cerdo", kcalPor100g: 200, proteinaPor100g: 27 },
  { nombre: "Solomillo de cerdo", kcalPor100g: 145, proteinaPor100g: 26 },
  { nombre: "Costillas de cerdo", kcalPor100g: 290, proteinaPor100g: 22 },
  { nombre: "Cordero asado", kcalPor100g: 280, proteinaPor100g: 25 },
  { nombre: "Salmón", kcalPor100g: 200, proteinaPor100g: 22 },
  { nombre: "Merluza", kcalPor100g: 90, proteinaPor100g: 18 },
  { nombre: "Bacalao", kcalPor100g: 82, proteinaPor100g: 18 },
  { nombre: "Atún en aceite (lata)", kcalPor100g: 200, proteinaPor100g: 25 },
  { nombre: "Atún al natural (lata)", kcalPor100g: 115, proteinaPor100g: 26 },
  { nombre: "Gambas / langostinos", kcalPor100g: 100, proteinaPor100g: 21 },
  { nombre: "Calamares (crudos)", kcalPor100g: 92, proteinaPor100g: 16 },
  { nombre: "Huevo frito", kcalPor100g: 195, proteinaPor100g: 14 },
  { nombre: "Huevo cocido / duro", kcalPor100g: 155, proteinaPor100g: 13 },
  { nombre: "Huevos", kcalPor100g: 155, proteinaPor100g: 13 },
  { nombre: "Claras de huevo", kcalPor100g: 52, proteinaPor100g: 11 },
  { nombre: "Jamón ibérico", kcalPor100g: 340, proteinaPor100g: 30 },
  { nombre: "Jamón serrano", kcalPor100g: 240, proteinaPor100g: 31 },
  { nombre: "Jamón york", kcalPor100g: 110, proteinaPor100g: 18 },
  { nombre: "Chorizo", kcalPor100g: 450, proteinaPor100g: 22 },
  { nombre: "Chorizo magro", kcalPor100g: 300, proteinaPor100g: 25 },
  { nombre: "Salchichón", kcalPor100g: 430, proteinaPor100g: 24 },
  { nombre: "Salchichas", kcalPor100g: 280, proteinaPor100g: 12 },
  { nombre: "Beicon / panceta", kcalPor100g: 540, proteinaPor100g: 14 },

  // Lácteos y quesos
  { nombre: "Queso", kcalPor100g: 350, proteinaPor100g: 24 },
  { nombre: "Queso manchego", kcalPor100g: 400, proteinaPor100g: 25 },
  { nombre: "Queso fresco", kcalPor100g: 170, proteinaPor100g: 13 },
  { nombre: "Queso fresco batido 0%", kcalPor100g: 55, proteinaPor100g: 8 },
  { nombre: "Queso feta", kcalPor100g: 260, proteinaPor100g: 14 },
  { nombre: "Queso parmesano", kcalPor100g: 400, proteinaPor100g: 36 },
  { nombre: "Queso mozzarella", kcalPor100g: 280, proteinaPor100g: 22 },
  { nombre: "Queso en lonchas", kcalPor100g: 330, proteinaPor100g: 20 },
  { nombre: "Queso de untar", kcalPor100g: 245, proteinaPor100g: 6 },
  { nombre: "Requesón", kcalPor100g: 100, proteinaPor100g: 12 },
  { nombre: "Skyr", kcalPor100g: 63, proteinaPor100g: 11 },
  { nombre: "Yogur griego 0%", kcalPor100g: 60, proteinaPor100g: 8 },
  { nombre: "Yogur griego", kcalPor100g: 120, proteinaPor100g: 6 },
  { nombre: "Yogur natural", kcalPor100g: 60, proteinaPor100g: 3.5 },
  { nombre: "Leche entera", kcalPor100g: 64, proteinaPor100g: 3.2 },
  { nombre: "Leche desnatada", kcalPor100g: 35, proteinaPor100g: 3.4 },
  { nombre: "Nata", kcalPor100g: 340, proteinaPor100g: 2.5 },
  { nombre: "Mantequilla", kcalPor100g: 720, proteinaPor100g: 0.9 },
  { nombre: "Proteína whey (polvo)", kcalPor100g: 380, proteinaPor100g: 78 },

  // Legumbres, cereales y féculas
  { nombre: "Lentejas cocidas", kcalPor100g: 116, proteinaPor100g: 9 },
  { nombre: "Garbanzos cocidos", kcalPor100g: 164, proteinaPor100g: 9 },
  { nombre: "Alubias blancas cocidas", kcalPor100g: 130, proteinaPor100g: 9 },
  { nombre: "Guisantes", kcalPor100g: 81, proteinaPor100g: 5.4 },
  { nombre: "Arroz blanco cocido", kcalPor100g: 130, proteinaPor100g: 2.7 },
  { nombre: "Arroz integral cocido", kcalPor100g: 120, proteinaPor100g: 2.5 },
  { nombre: "Quinoa cocida", kcalPor100g: 120, proteinaPor100g: 4.4 },
  { nombre: "Pasta cocida", kcalPor100g: 155, proteinaPor100g: 5.5 },
  { nombre: "Pasta integral cocida", kcalPor100g: 150, proteinaPor100g: 6 },
  { nombre: "Patata cocida", kcalPor100g: 85, proteinaPor100g: 2 },
  { nombre: "Patata asada", kcalPor100g: 95, proteinaPor100g: 2.1 },
  { nombre: "Boniato asado", kcalPor100g: 90, proteinaPor100g: 1.6 },

  // Verduras y hortalizas
  { nombre: "Espinacas", kcalPor100g: 23, proteinaPor100g: 2.9 },
  { nombre: "Brócoli", kcalPor100g: 34, proteinaPor100g: 2.8 },
  { nombre: "Pimiento", kcalPor100g: 26, proteinaPor100g: 1 },
  { nombre: "Cebolla", kcalPor100g: 40, proteinaPor100g: 1.1 },
  { nombre: "Espárragos", kcalPor100g: 20, proteinaPor100g: 2.2 },
  { nombre: "Calabacín", kcalPor100g: 17, proteinaPor100g: 1.2 },
  { nombre: "Judías verdes", kcalPor100g: 31, proteinaPor100g: 1.8 },
  { nombre: "Coliflor", kcalPor100g: 25, proteinaPor100g: 1.9 },
  { nombre: "Tomate", kcalPor100g: 18, proteinaPor100g: 0.9 },
  { nombre: "Lechuga", kcalPor100g: 15, proteinaPor100g: 1.4 },
  { nombre: "Rúcula", kcalPor100g: 25, proteinaPor100g: 2.6 },
  { nombre: "Pepino", kcalPor100g: 15, proteinaPor100g: 0.7 },
  { nombre: "Zanahoria", kcalPor100g: 41, proteinaPor100g: 0.9 },
  { nombre: "Champiñones", kcalPor100g: 22, proteinaPor100g: 3.1 },
  { nombre: "Aceitunas", kcalPor100g: 145, proteinaPor100g: 1 },
  { nombre: "Aguacate", kcalPor100g: 160, proteinaPor100g: 2 },

  // Fruta
  { nombre: "Plátano", kcalPor100g: 90, proteinaPor100g: 1.1 },
  { nombre: "Manzana", kcalPor100g: 52, proteinaPor100g: 0.3 },
  { nombre: "Naranja", kcalPor100g: 47, proteinaPor100g: 0.9 },
  { nombre: "Pera", kcalPor100g: 57, proteinaPor100g: 0.4 },
  { nombre: "Fresas", kcalPor100g: 32, proteinaPor100g: 0.7 },
  { nombre: "Arándanos", kcalPor100g: 57, proteinaPor100g: 0.7 },
  { nombre: "Uvas", kcalPor100g: 69, proteinaPor100g: 0.7 },
  { nombre: "Sandía", kcalPor100g: 30, proteinaPor100g: 0.6 },
  { nombre: "Melón", kcalPor100g: 34, proteinaPor100g: 0.8 },
  { nombre: "Piña", kcalPor100g: 50, proteinaPor100g: 0.5 },
  { nombre: "Kiwi", kcalPor100g: 61, proteinaPor100g: 1.1 },
  { nombre: "Mandarina", kcalPor100g: 53, proteinaPor100g: 0.8 },
  { nombre: "Dátiles", kcalPor100g: 280, proteinaPor100g: 2.5 },

  // Frutos secos y grasas
  { nombre: "Almendras", kcalPor100g: 580, proteinaPor100g: 21 },
  { nombre: "Nueces", kcalPor100g: 650, proteinaPor100g: 15 },
  { nombre: "Avellanas", kcalPor100g: 630, proteinaPor100g: 15 },
  { nombre: "Anacardos", kcalPor100g: 570, proteinaPor100g: 18 },
  { nombre: "Cacahuetes", kcalPor100g: 570, proteinaPor100g: 25 },
  { nombre: "Frutos secos variados", kcalPor100g: 600, proteinaPor100g: 18 },
  { nombre: "Crema de cacahuete", kcalPor100g: 590, proteinaPor100g: 25 },
  { nombre: "Aceite de oliva", kcalPor100g: 900, proteinaPor100g: 0 },

  // Bebidas
  { nombre: "Cerveza", kcalPor100g: 43, proteinaPor100g: 0.5 },
  { nombre: "Cerveza sin alcohol", kcalPor100g: 22, proteinaPor100g: 0.3 },
  { nombre: "Vino tinto", kcalPor100g: 85, proteinaPor100g: 0.1 },
  { nombre: "Vino blanco", kcalPor100g: 82, proteinaPor100g: 0.1 },
  { nombre: "Refresco con azúcar", kcalPor100g: 42, proteinaPor100g: 0 },
  { nombre: "Refresco light / zero", kcalPor100g: 1, proteinaPor100g: 0 },
  { nombre: "Zumo de naranja", kcalPor100g: 45, proteinaPor100g: 0.7 },
  { nombre: "Café solo", kcalPor100g: 1, proteinaPor100g: 0.1 },
  { nombre: "Café con leche", kcalPor100g: 40, proteinaPor100g: 2 },
  { nombre: "Batido de chocolate", kcalPor100g: 85, proteinaPor100g: 3.5 },
  { nombre: "Combinado / copa", kcalPor100g: 230, proteinaPor100g: 0 },
];

function normalizar(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

/** Busca un alimento por nombre, tolerando mayúsculas/acentos y nombres
 * parciales: "pollo" encuentra "Pollo asado", "queso" encuentra el queso más
 * genérico de la lista, etc. La coincidencia siempre respeta límites de
 * palabra, para que "queso" no "encuentre" a "Requesón" por casualidad. */
function contienePalabra(texto: string, buscado: string): boolean {
  if (!buscado) return false;
  const escapado = buscado.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^a-z0-9])${escapado}([^a-z0-9]|$)`).test(texto);
}

export function buscarAlimento(nombre: string): AlimentoRef | undefined {
  const n = normalizar(nombre);
  if (!n) return undefined;

  const exacto = FOOD_DATABASE.find((f) => normalizar(f.nombre) === n);
  if (exacto) return exacto;

  const candidatos = FOOD_DATABASE.filter((f) => {
    const fn = normalizar(f.nombre);
    return contienePalabra(fn, n) || contienePalabra(n, fn);
  });
  if (candidatos.length === 0) return undefined;

  // Entre varias coincidencias parciales, la de nombre más corto suele ser
  // la más genérica y probable (p.ej. "pollo" -> "Pollo asado" antes que
  // "Pechuga de pollo").
  candidatos.sort((a, b) => normalizar(a.nombre).length - normalizar(b.nombre).length);
  return candidatos[0];
}
