import { fetchRecipes } from './api.js';

console.log('⏳ Probando conexión con TheMealDB...');

// Hacemos una prueba pidiendo recetas de "chicken"
fetchRecipes('chicken')
  .then(recipes => {
    console.log('✅ ¡Conexión exitosa! Recetas recibidas:', recipes);
  })
  .catch(error => {
    console.error('❌ Error en la prueba:', error);
  });