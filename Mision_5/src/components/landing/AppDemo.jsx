import SectionHeading from '../ui/SectionHeading.jsx';
import RecipeApp from '../RecipeApp.jsx'; // la app de la M3 + M4, ahora con Tailwind

// La app de verdad, metida en la landing como "demo en vivo"
function AppDemo() {
  return (
    <section
      id="app"
      aria-labelledby="app-title"
      className="border-t-2 border-carbon-900 bg-crema-100 py-16 md:py-24 dark:border-crema-200/20 dark:bg-carbon-900"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeading id="app-title" eyebrow="Demo en vivo" title="Pruébala aquí mismo">
          No es una captura: es la aplicación funcionando. Busca, guarda favoritos o crea tu receta.
        </SectionHeading>

        <div className="rounded-tarjeta border-2 border-carbon-900 bg-crema-50 p-4 shadow-sello md:p-8 dark:border-crema-200/20 dark:bg-carbon-950 dark:shadow-none">
          <RecipeApp />
        </div>
      </div>
    </section>
  );
}

export default AppDemo;
