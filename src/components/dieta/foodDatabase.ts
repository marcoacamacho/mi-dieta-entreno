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
  { nombre: "Arroz blanco cocido", kcalPor100g: 130, proteinaPor100g: 2.7 },
  { nombre: "Guacamole", kcalPor100g: 150, proteinaPor100g: 2 },
  { nombre: "Nachos con queso", kcalPor100g: 340, proteinaPor100g: 7 },

  // Panadería y desayuno
  { nombre: "Pan blanco", kcalPor100g: 265, proteinaPor100g: 9 },
  { nombre: "Tostada con tomate", kcalPor100g: 220, proteinaPor100g: 6 },
  { nombre: "Croissant", kcalPor100g: 400, proteinaPor100g: 8 },
  { nombre: "Churros", kcalPor100g: 400, proteinaPor100g: 6 },
  { nombre: "Magdalena", kcalPor100g: 390, proteinaPor100g: 6 },
  { nombre: "Donut", kcalPor100g: 420, proteinaPor100g: 5 },
  { nombre: "Gofio", kcalPor100g: 380, proteinaPor100g: 10 },
  { nombre: "Tortitas", kcalPor100g: 230, proteinaPor100g: 6 },

  // Snacks y dulces
  { nombre: "Patatas fritas (bolsa)", kcalPor100g: 540, proteinaPor100g: 6 },
  { nombre: "Palomitas", kcalPor100g: 380, proteinaPor100g: 9 },
  { nombre: "Chocolate con leche", kcalPor100g: 535, proteinaPor100g: 7 },
  { nombre: "Chocolate negro 70%", kcalPor100g: 600, proteinaPor100g: 8 },
  { nombre: "Helado", kcalPor100g: 210, proteinaPor100g: 4 },
  { nombre: "Galletas", kcalPor100g: 470, proteinaPor100g: 6 },
  { nombre: "Nutella", kcalPor100g: 540, proteinaPor100g: 6 },
  { nombre: "Mermelada", kcalPor100g: 250, proteinaPor100g: 0.5 },

  // Proteínas / platos principales
  { nombre: "Pollo asado", kcalPor100g: 190, proteinaPor100g: 27 },
  { nombre: "Filete de ternera", kcalPor100g: 250, proteinaPor100g: 26 },
  { nombre: "Lomo de cerdo", kcalPor100g: 200, proteinaPor100g: 27 },
  { nombre: "Jamón ibérico", kcalPor100g: 340, proteinaPor100g: 30 },
  { nombre: "Jamón york", kcalPor100g: 110, proteinaPor100g: 18 },
  { nombre: "Atún en aceite (lata)", kcalPor100g: 200, proteinaPor100g: 25 },
  { nombre: "Huevo frito", kcalPor100g: 195, proteinaPor100g: 14 },
  { nombre: "Queso manchego", kcalPor100g: 400, proteinaPor100g: 25 },
  { nombre: "Queso fresco", kcalPor100g: 170, proteinaPor100g: 13 },
  { nombre: "Salchichón / chorizo", kcalPor100g: 450, proteinaPor100g: 22 },

  // Fruta, verdura, lácteos básicos
  { nombre: "Aceitunas", kcalPor100g: 145, proteinaPor100g: 1 },
  { nombre: "Almendras", kcalPor100g: 580, proteinaPor100g: 21 },
  { nombre: "Frutos secos variados", kcalPor100g: 600, proteinaPor100g: 18 },
  { nombre: "Plátano", kcalPor100g: 90, proteinaPor100g: 1.1 },
  { nombre: "Manzana", kcalPor100g: 52, proteinaPor100g: 0.3 },
  { nombre: "Naranja", kcalPor100g: 47, proteinaPor100g: 0.9 },
  { nombre: "Yogur natural", kcalPor100g: 60, proteinaPor100g: 3.5 },
  { nombre: "Leche entera", kcalPor100g: 64, proteinaPor100g: 3.2 },

  // Bebidas
  { nombre: "Cerveza", kcalPor100g: 43, proteinaPor100g: 0.5 },
  { nombre: "Cerveza sin alcohol", kcalPor100g: 22, proteinaPor100g: 0.3 },
  { nombre: "Vino tinto", kcalPor100g: 85, proteinaPor100g: 0.1 },
  { nombre: "Vino blanco", kcalPor100g: 82, proteinaPor100g: 0.1 },
  { nombre: "Refresco con azúcar", kcalPor100g: 42, proteinaPor100g: 0 },
  { nombre: "Refresco light / zero", kcalPor100g: 1, proteinaPor100g: 0 },
  { nombre: "Zumo de naranja", kcalPor100g: 45, proteinaPor100g: 0.7 },
  { nombre: "Café solo", kcalPor100g: 1, proteinaPor100g: 0.1 },
  { nombre: "Combinado / copa", kcalPor100g: 230, proteinaPor100g: 0 },
];
