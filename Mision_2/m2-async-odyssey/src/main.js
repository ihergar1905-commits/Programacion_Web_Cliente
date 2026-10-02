import { fetchRecipes } from './api.js';
import { processRecipesList } from './logic.js';

console.log('⏳ Probando flujo de API + Lógica...');

fetchRecipes('chicken')
  .then(rawRecipes => {
    console.log('📦 1. Datos crudos de la API:', rawRecipes);
    
    // Transformamos los datos crudos con logic.js
    const cleanRecipes = processRecipesList(rawRecipes);
    console.log('🧹 2. Datos limpios y estructurados por logic.js:', cleanRecipes);
  })
  .catch(error => {
    console.error('❌ Error en el proceso:', error);
  });