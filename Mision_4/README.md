# 📝 Culinary Odyssey · Mis recetas
Misión M4 · Full Contact Forms — «Valida o muere».

## 🎮 Descripción del proyecto
Ampliación de la **Culinary Odyssey** de la Misión 3 (React 19 + Vite). El buscador de TheMealDB, los filtros, el orden, los favoritos y el modo despensa siguen igual. Lo nuevo es una tercera pestaña, **📝 Mis recetas**, para crear recetas propias y verlas en una lista que viene de un servidor local (`json-server`, que guarda los datos en `db.json`).

Qué se puede hacer en «Mis recetas»:

1. **Crear una receta** con un formulario: nombre, categoría, minutos, dificultad, ingredientes y si es vegana.
2. **Ver los errores al momento**, debajo de cada campo y con el borde en rojo, si algo no cumple las reglas. Mientras haya errores no se envía nada al servidor.
3. **Guardarla en el servidor** (POST). El botón cambia a «Guardando…» y no se puede pulsar dos veces. Al terminar, el formulario se vacía y sale «✅ «nombre» guardada».
4. **Ver la lista de recetas guardadas** (GET), que se actualiza sola al guardar una nueva, sin recargar la página. El número de recetas también aparece en la pestaña.
5. **Estados claros**: «Cargando…» la primera vez, «actualizando…» cuando se vuelve a pedir la lista, y un mensaje de error con botón **Reintentar** si el servidor no responde.

### ✨ Originalidad
- **Regla de receta vegana**: si se marca «vegana» y en los ingredientes aparece algo de origen animal (huevo, leche, queso, pollo…), Zod no deja guardarla y explica por qué debajo de los ingredientes. Es un `refine` que compara dos campos a la vez.
- **Las recetas veganas llevan 🌱** en la lista.
- **Integrado en la app de la M3**: es una pestaña más de la Culinary Odyssey, con un contador que comparte la caché con la lista (una sola petición para los dos).

### ★ BONUS: validar también la respuesta del servidor
Lo que llega del servidor se revisa con un segundo esquema de Zod (`apiRecipeSchema`), más estricto que el del formulario: no convierte nada y exige el `id`.
- En la **lista (GET)** cada receta se comprueba con `safeParse`. Las válidas se muestran y las corruptas se apartan con un `filter`. Además sale un aviso «⚠️ X receta(s) corrupta(s) ignorada(s)», y en la consola se ve qué campo falló. Una receta mal guardada no rompe la lista entera.
- En el **guardado (POST)** la receta que devuelve el servidor se comprueba con `parse`. Si no es válida, se muestra el error en el formulario.

**Cómo demostrarlo:** con el servidor parado, añadir a `db.json` una receta con un dato erróneo, por ejemplo `"minutos": "mucho"`, y arrancar de nuevo. La lista muestra las demás recetas y el aviso de 1 receta corrupta.

### 🧠 Decisiones técnicas
- **React Hook Form, formulario no controlado**: cada campo se engancha con `register`, sin un `useState` por campo ni un render en cada tecla. `handleSubmit` valida primero y solo llama a `enviar` si todo está bien. Tras guardar, `reset` vuelve a los `defaultValues`.
- **Zod como única fuente de verdad**: las reglas y los mensajes están solo en `recipeSchema.js` y se conectan al formulario con `zodResolver`. `z.coerce.number()` convierte los minutos, que el input da como texto. Las listas de categorías y dificultades se exportan y se usan también para pintar los desplegables.
- **TanStack Query**:
  - `useQuery` con la clave `['my-recipes']`, guardada en una constante exportada para usar siempre la misma.
  - `useMutation` para el POST. En su `onSuccess`, `invalidateQueries` marca la lista como desactualizada y `useQuery` la vuelve a pedir sola.
  - `isPending` y `isFetching` se usan por separado, para que la lista no parpadee al actualizarse.
- **Errores accesibles**: `label` con `htmlFor`, `aria-invalid`, `aria-describedby` enlazado al mensaje y `role="alert"`. Con `noValidate` solo se muestran los mensajes de Zod.
- **Capas separadas**:
  - el formulario recoge los datos;
  - el esquema valida;
  - los hooks gestionan el estado de las peticiones;
  - `myRecipesApi.js` es el único archivo que hace `fetch` a mi servidor (comprueba `response.ok` y lanza un error para que TanStack lo gestione).
- El buscador de TheMealDB sigue usando el `useFetch` de la M3.

### 📁 Estructura del proyecto
```
Mision_4/
├── db.json                     # "Base de datos" de json-server
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                # Arranca React y crea el QueryClient (QueryClientProvider)
    ├── App.jsx                 # Estado principal y pestañas (🆕 "Mis recetas")
    ├── index.css               # Estilos
    ├── schema/
    │   └── recipeSchema.js     # 🆕 Esquemas de Zod: formulario y respuesta del servidor
    ├── services/
    │   ├── api.js              # fetch a TheMealDB (M3)
    │   └── myRecipesApi.js     # 🆕 GET y POST a json-server + validación (bonus)
    ├── hooks/
    │   ├── useFetch.js         # (M3)
    │   ├── useLocalStorage.js  # (M3)
    │   ├── useMyRecipes.js     # 🆕 useQuery: la lista
    │   └── useCreateRecipe.js  # 🆕 useMutation: guardar + invalidar
    ├── components/
    │   ├── RecipeForm.jsx      # 🆕 Formulario con React Hook Form
    │   ├── MyRecipesList.jsx   # 🆕 Lista con estados de carga/error/vacía
    │   └── ...                 # Componentes de la M3
    └── utils/
        └── logic.js            # (M3)
```

### ▶️ Cómo ejecutarlo
Desde la carpeta `Mision_4` hacen falta **dos terminales**:
```bash
npm install
npm run api   # terminal 1: servidor de datos (json-server) en http://localhost:3001
npm run dev   # terminal 2: la página (Vite) en http://localhost:5173
```
Si el servidor de datos no está arrancado, la pestaña «Mis recetas» muestra el error con el botón Reintentar.

---

## 🤖 Uso de IA

Se ha utilizado **Claude (Anthropic)** como asistente durante toda la misión.

* **Modo de trabajo:** primero usé Claude para entender los conceptos antes de tocar código: qué hace React Hook Form, qué es un esquema de Zod, la diferencia entre `useQuery` y `useMutation`, y qué significa invalidar una consulta. Con eso hizo una guía visual con el recorrido de una receta desde el formulario hasta la lista. Después, el código de la M3 que se reutiliza lo copió Claude directamente. **El código nuevo de la M4 lo escribí yo**, archivo por archivo: Claude me pasaba cada parte explicada línea a línea y yo la escribía, preguntaba lo que no entendía y la probaba antes de seguir. Al final repasé cada programa explicando con mis palabras qué hace y con quién se comunica, y Claude me corregía.
* **Prompts principales (resumidos):**
  1. *«Te paso el enunciado de la M4: explícame paso a paso de qué va y qué hace cada herramienta antes de empezar con el código.»*
  2. *«Quiero que sea la misma página que la de la M3 con los añadidos de la M4. Lo reutilizado ponlo tú; lo nuevo dime paso a paso qué escribir y explícamelo de forma sencilla.»*
  3. *«Explícame cada programa: qué hace, con quién se comunica, cómo se comporta y qué cambia en la página, como un diálogo entre los códigos.»*
* **Qué hice a mano:** crear el proyecto con Vite, instalar las dependencias, configurar `json-server` y `db.json`, escribir todos los archivos nuevos (`recipeSchema.js`, `myRecipesApi.js`, `useMyRecipes.js`, `useCreateRecipe.js`, `RecipeForm.jsx`, `MyRecipesList.jsx`, los cambios de `main.jsx` y `App.jsx`) y probarlo todo en el navegador.
* **Verificación realizada:**
  * Claude comprobó el esquema de Zod ejecutándolo con datos de prueba: nombre corto, categoría vacía, minutos vacíos y la receta vegana con «Huevos», y vio que salía el mensaje correcto en cada campo y que los minutos pasaban de `"40"` a `40`.
  * En mi navegador, con `npm run api` y `npm run dev`, comprobé: los errores al pulsar Guardar con el formulario vacío, que desaparecen al corregirlos, el error de vegana, el guardado de una receta (aparece en la lista sin recargar y sube el contador de la pestaña) y el mensaje de error con Reintentar al apagar el servidor.
  * En las herramientas de desarrollo, pestaña **Red**: un GET al abrir, y al guardar un POST seguido de un GET.
  * Ejecuté `npm run lint` sin errores.

---

## 🩺 Autopsia del código

1. **La respuesta del servidor se valida receta a receta con `safeParse`, no la lista entera de golpe**
   * **Decisión tomada:** en `getMyRecipes` cada receta pasa por `apiRecipeSchema.safeParse`. Las válidas se muestran, las corruptas se apartan con un `filter` y se devuelve cuántas había para avisar en pantalla.
   * **Alternativa descartada:** validar todo con `z.array(apiRecipeSchema).parse(datos)`. Es más corto, pero una sola receta mal guardada lanzaría un error y no se vería ninguna. La contrapartida de mi opción es que una receta corrupta «desaparece» de la lista, y por eso añadí el aviso visible y el detalle en la consola.

2. **Después de guardar se invalida la lista y se vuelve a pedir, en vez de añadir la receta nueva a mano en la caché**
   * **Decisión tomada:** en el `onSuccess` de `useMutation` se llama a `invalidateQueries({ queryKey: ['my-recipes'] })` y `useQuery` vuelve a pedir la lista completa al servidor.
   * **Alternativa descartada:** usar `setQueryData` para meter en la caché la receta que devuelve el POST, sin hacer otro GET. Ahorraría una petición, pero tendría que mantener yo la caché a mano y podría quedar distinta de lo que hay de verdad en el servidor. Con la invalidación, la lista siempre coincide con `db.json`, a cambio de un GET más.