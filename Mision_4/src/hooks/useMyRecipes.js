import { useQuery } from '@tanstack/react-query'; // el hook de TanStack para LEER datos
import { getMyRecipes } from '../services/myRecipesApi.js'; // nuestra función GET

// La "etiqueta" con la que se guarda la lista en la pizarra (caché).
// Exportada para que useCreateRecipe use EXACTAMENTE la misma al invalidar.
export const MY_RECIPES_KEY = ['my-recipes'];

// Hook: pide mis recetas al servidor y devuelve todo lo que TanStack sabe de ellas
export function useMyRecipes() {
  return useQuery({
    queryKey: MY_RECIPES_KEY, // con qué etiqueta se guarda en la pizarra
    queryFn: getMyRecipes, // qué función llamar para conseguir los datos
  });
}