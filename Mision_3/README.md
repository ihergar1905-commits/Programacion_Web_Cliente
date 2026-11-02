# 🍳 Culinary Odyssey · React
Misión M3 · Reactor Core — «Todo es un componente».

## 🎮 Descripción del proyecto
Reconstrucción en **React 19** del buscador de recetas de la Misión 2 (que estaba hecho con JavaScript vanilla). Usa la API pública **TheMealDB** y ahora la interfaz se describe a partir del estado: no se toca el DOM a mano en ningún momento.

Qué se puede hacer:

1. **Buscar recetas** por nombre o ingrediente (en inglés, por ejemplo `chicken` o `pasta`). Al abrir la página se carga `chicken`.
2. **Filtrar por categoría** con los chips, que además hacen de resumen (`Chicken (2) · Beef (1)`).
3. **Ordenar** por nombre (A-Z / Z-A) o por número de ingredientes.
4. **Guardar favoritos** con el corazón 🤍. Se guardan en `localStorage`, así que siguen ahí al recargar, y tienen su propia pestaña.
5. **Ver el detalle** de una receta en una ventana (se cierra con ✕, con Escape o pulsando fuera): ingredientes con sus medidas, preparación completa y vídeo de YouTube.

### ✨ Originalidad: modo despensa
Dentro del detalle, cada ingrediente tiene una casilla para marcar lo que **ya tienes en casa**. La app te dice cuántos te faltan («te faltan 3 de 8») y, cuando lo tienes todo, «¡Lo tienes todo, a cocinar!». Se aprovechan así los ingredientes con medidas y el enlace de YouTube que en la M2 se extraían pero no se usaban.

### ★ BONUS: custom hooks
- **`useFetch(fetcher, param)`**: pide los datos cada vez que cambia `param` y devuelve `{ data, error, loading }`. Cancela con `AbortController` la petición anterior en el *cleanup* del efecto, así que una respuesta antigua nunca pisa a una más reciente (si buscas `chicken` y enseguida `pasta`, siempre se queda `pasta`, aunque la primera respuesta llegue más tarde). Es reutilizable con cualquier función que devuelva una promesa.
- **`useLocalStorage(key, initialValue)`**: funciona como `useState`, pero guarda el valor en `localStorage`. Si lo guardado está corrupto o no es del tipo esperado (por ejemplo, no es un array), usa el valor inicial.

### 🧠 Decisiones de React
- **Estado mínimo** en `App`: `query`, `category`, `sortBy`, `view`, `selectedId` y `favorites`. El texto del buscador vive en `SearchForm`, porque solo le importa a él.
- **Valores derivados, no duplicados**: la lista visible, los totales por categoría, los ids de favoritos, la receta seleccionada e incluso el «cargando» se calculan en cada render a partir del estado.
- **Lifting state**: los favoritos se usan en la parrilla y en el modal, así que viven en `App` y bajan por props.
- **Efectos solo donde hace falta**: el fetch (con *cleanup* que cancela la petición), guardar en `localStorage` y el listener de la tecla Escape del modal (con *cleanup* que lo quita). Filtrar, ordenar o contar no usan efectos.
- **Inmutabilidad**: `toSorted` en vez de `sort`, `filter` y el operador *spread* para añadir o quitar, y un `reduce` que no muta el acumulador.
- **Keys estables**: `recipe.id` en las tarjetas, el nombre de la categoría en los chips y la posición del ingrediente en la API (1-20) en la despensa. Nunca el índice del `map`.
- **Seguridad**: JSX escapa el texto automáticamente y no se usa `dangerouslySetInnerHTML`, así que desaparece el riesgo de XSS que tenía el `innerHTML` de la M2.
- **Robustez**: la petición tiene un *timeout* de 8 s, se comprueba `response.ok`, la caché se valida con `Array.isArray` y los «...» solo se añaden si el texto supera los 100 caracteres.

### 📁 Estructura del proyecto
```
Mision_3/
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                  # Arranca React (StrictMode)
    ├── App.jsx                   # Estado principal y valores derivados
    ├── index.css                 # Estilos
    ├── components/
    │   ├── SearchForm.jsx        # Buscador (input controlado)
    │   ├── StatusMessage.jsx     # Cargando / error / sin resultados
    │   ├── CategoryFilter.jsx    # Chips de categoría (resumen + filtro)
    │   ├── SortSelect.jsx        # Selector de orden
    │   ├── RecipeGrid.jsx        # Lista de tarjetas (key = id)
    │   ├── RecipeCard.jsx        # Una tarjeta
    │   ├── RecipeModal.jsx       # Detalle de la receta
    │   └── PantryChecklist.jsx   # Modo despensa
    ├── hooks/
    │   ├── useFetch.js           # ★ Hook de peticiones con AbortController
    │   └── useLocalStorage.js    # ★ Hook de estado persistente
    ├── services/
    │   └── api.js                # fetch a TheMealDB + caché
    └── utils/
        └── logic.js              # Transformaciones puras (map, filter, reduce, toSorted)
```

### ▶️ Cómo ejecutarlo
Desde la carpeta `Mision_3`:
```bash
npm install
npm run dev
```

---

## 🤖 Uso de IA

Se ha utilizado **Claude (Anthropic)** como asistente durante toda la misión.

* **Modo de trabajo:** primero hice con IA la actividad de clase A1 (code review de un componente generado por IA) para tener claros los errores típicos de React. Después, Claude analizó el código y la corrección de mi Misión 2 y propuso cómo dividirla en componentes. A partir de ahí generó el código, que yo revisé y probé archivo por archivo hasta entender cada línea.
* **Prompts principales (resumidos):**
  1. *«Te paso la corrección de la Misión 2: dime qué puntos son importantes para la Misión 3.»*
  2. *«Te paso el código de la Misión 2: propón cómo pasarlo a componentes de React con estado mínimo y valores derivados.»*
  3. *«Haz la Misión 3 con un custom hook para el bonus, sin cosas complicadas, y explícame por qué cada useEffect es necesario.»*
* **Verificación realizada:**
  * Claude probó la app en un navegador automatizado (Playwright) con respuestas simuladas de la API: búsqueda, filtro, orden, favoritos que se mantienen tras recargar, modal con Escape, modo despensa, mensaje de sin resultados, error 500 y la condición de carrera (una búsqueda lenta seguida de otra rápida muestra la rápida).
  * En mi navegador, con `npm run dev` y la API real, comprobé la búsqueda, los filtros, el orden, los favoritos (y que siguen tras recargar) y el modal con el vídeo.
  * En las herramientas de desarrollo: en **Red** comprobé que una búsqueda repetida no hace una petición nueva (caché), y en **Almacenamiento** vi las claves `recipes:<término>` y `culinary:favorites`.
  * Ejecuté `npm run lint` sin errores.

---

## 🩺 Autopsia del código

1. **El «cargando» de `useFetch` se deriva en vez de guardarse en un estado**
   * **Decisión tomada:** el hook guarda el resultado junto con el parámetro al que pertenece (`{ param, data, error }`). Si ese parámetro no coincide con el actual, es que todavía está cargando: `loading = result.param !== param`.
   * **Alternativa descartada:** un `useState(isLoading)` con `setLoading(true)` al principio del efecto. Se descartó porque provoca un render extra, es estado duplicado y el linter de React avisa de hacer `setState` directamente dentro de un efecto. La contrapartida es que la idea es un poco menos evidente a primera vista.

2. **Los favoritos se guardan como recetas completas, no solo como ids**
   * **Decisión tomada:** en `localStorage` se guarda el objeto entero de cada receta favorita. Así la pestaña de favoritos funciona sin conexión y sin pedir nada a la API.
   * **Alternativa descartada:** guardar solo los ids y pedir cada receta con `lookup.php?i=<id>`. Ocuparía menos espacio, pero haría falta una petición por favorito y otro estado de carga. A cambio, si TheMealDB cambia una receta, el favorito guardado no se actualiza.
