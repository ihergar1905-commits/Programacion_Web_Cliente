import { useMutation, useQueryClient } from '@tanstack/react-query'; // useMutation = ESCRIBIR datos; useQueryClient = acceder a la pizarra
import { createRecipe } from '../services/myRecipesApi.js'; // nuestra función POST
import { MY_RECIPES_KEY } from './useMyRecipes.js'; // la misma etiqueta que usa la lista

// Hook: guarda una receta y, si sale bien, marca la lista como vieja
export function useCreateRecipe() {
  const queryClient = useQueryClient(); // cogemos la pizarra que colgamos en main.jsx

  return useMutation({
    mutationFn: createRecipe, // qué función llamar para guardar (el POST)
    onSuccess: () => { // cuando el servidor responde bien...
      queryClient.invalidateQueries({ queryKey: MY_RECIPES_KEY }); // ...el cajón my-recipes está viejo → useMyRecipes lo vuelve a pedir
    },
  });
}