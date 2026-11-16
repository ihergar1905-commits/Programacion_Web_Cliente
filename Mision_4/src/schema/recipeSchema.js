import { z } from 'zod'; // traemos "z", la caja de herramientas de Zod

// Listas de opciones permitidas (las exportamos para usarlas también en el <select> del formulario)
export const CATEGORIAS = ['Entrante', 'Principal', 'Postre'];
export const DIFICULTADES = ['fácil', 'media', 'difícil'];

// Palabras que delatan un ingrediente de origen animal (para la regla de "vegana")
const NO_VEGANOS = ['huevo', 'leche', 'queso', 'mantequilla', 'nata', 'miel', 'carne', 'pollo', 'jamón', 'pescado', 'atún'];

export const recipeSchema = z
  .object({ // la receta es un objeto con estos campos:
    nombre: z.string().trim().min(3, 'El nombre debe tener al menos 3 letras'), // texto, sin espacios sobrantes, mínimo 3
    categoria: z.enum(CATEGORIAS, { message: 'Elige una categoría' }), // solo una de la lista CATEGORIAS
    minutos: z.coerce // los inputs siempre dan texto ("40"), coerce lo convierte a número (40)
      .number({ message: 'Escribe un número' }) // si no se puede convertir, este mensaje
      .int('Sin decimales, por favor') // número entero
      .min(1, 'Mínimo 1 minuto') // ni 0 ni negativos
      .max(600, 'Máximo 600 minutos (10 horas)'), // ni recetas de 3 días
    dificultad: z.enum(DIFICULTADES, { message: 'Elige una dificultad' }), // solo fácil, media o difícil
    vegana: z.boolean(), // la casilla: true (marcada) o false (sin marcar)
    ingredientes: z.string().trim().min(3, 'Escribe al menos un ingrediente'), // texto, mínimo 3 letras
  })
  .refine( // regla extra que mira VARIOS campos a la vez
    (receta) => // recibe la receta entera...
      !receta.vegana || // ...si NO es vegana → vale, no hay nada que mirar
      !NO_VEGANOS.some((palabra) => receta.ingredientes.toLowerCase().includes(palabra)), // si lo es -> ningún ingrediente animal
    {
      message: 'Una receta vegana no puede llevar ingredientes de origen animal', // el mensaje de error
      path: ['ingredientes'], // debajo de qué campo sale el error
    }
  );

// Reglamento para lo que LLEGA del servidor (bonus): aquí no hay coerce,
// si el servidor manda "40" en vez de 40, es un registro corrupto.
export const apiRecipeSchema = z.object({
  id: z.string(), // json-server pone los id como texto ("1", "2"...)
  nombre: z.string(), // tiene que ser texto
  categoria: z.enum(CATEGORIAS), // una categoría de la lista
  minutos: z.number(), // número DE VERDAD (no texto)
  dificultad: z.enum(DIFICULTADES), // una dificultad de la lista
  vegana: z.boolean(), // true o false
  ingredientes: z.string(), // texto
});