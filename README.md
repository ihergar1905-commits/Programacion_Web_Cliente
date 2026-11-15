# 🚀 Entrega de Prácticas - Desarrollo Web I

Bienvenido/a al repositorio oficial de entregas para la asignatura de Desarrollo Web I. A continuación se detallan los enlaces directos a cada una de las misiones y ejercicios desarrollados durante el curso.

---

## 📂 Índice de Misiones

### ⚔️ [Misión 1: Caza al Bug](./Mision_1)
* **Descripción:** Proyecto interactivo desarrollado en HTML, CSS y JS puro, con el README incluido.
* **Ubicación en el repo:** [`/Mision_1`](./Mision_1)

### 🍳 [Misión 2: Async Odyssey (Culinary Odyssey)](./Mision_2)
* **Descripción:** Aplicación web modular con Vite, consumo de la API de TheMealDB (`async/await`, `fetch`), transformación de datos con métodos de array, caché en `localStorage` y manipulación dinámica del DOM, con el README incluido.
* **Ubicación en el repo:** [`/Mision_2`](./Mision_2)

### ⚛️ [Misión 3: Reactor Core (Culinary Odyssey en React)](./Mision_3)
* **Descripción:** Reconstrucción de la Misión 2 en React 19 con Vite: componentes reutilizables con props, estado mínimo con `useState` y valores derivados, `useEffect` con cleanup (`AbortController` para evitar condiciones de carrera), listas con `key` estable y renderizado condicional. Añade filtro por categoría, ordenación, favoritos persistentes, ventana de detalle con ingredientes y vídeo, "modo despensa" y dos custom hooks (`useFetch` y `useLocalStorage`), con el README incluido.
* **Ubicación en el repo:** [`/Mision_3`](./Mision_3)

### 📝 [Misión 4: Full Contact Forms (Culinary Odyssey · Mis recetas)](./Mision_4)
* **Descripción:** Amplía la Culinary Odyssey de la Misión 3 con una pestaña "Mis recetas" para registrar recetas propias y listarlas desde un servidor local (`json-server`). Formulario no controlado con React Hook Form, validación con un esquema de Zod como única fuente de verdad (`zodResolver`, `coerce`, mensajes propios y un `refine` que impide marcar como vegana una receta con ingredientes de origen animal) y errores accesibles. Datos remotos con TanStack Query: `useQuery` para la lista, `useMutation` para guardar (POST) e `invalidateQueries` para que la lista se actualice sola, con estados de carga, error con reintento y éxito. Bonus: la respuesta del servidor también se valida con Zod (`safeParse`) y se apartan los registros corruptos, con el README incluido.
* **Ubicación en el repo:** [`/Mision_4`](./Mision_4)

---

## 🛠️ Estructura del Repositorio

```text
Programacion_Web_Cliente/
├── Mision_1/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   └── README.md
├── Mision_2/
│   ├── public/
│   ├── src/
│   │   ├── api.js
│   │   ├── logic.js
│   │   ├── main.js
│   │   ├── render.js
│   │   └── style.css
│   ├── .gitignore
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
├── Mision_3/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── CategoryFilter.jsx
│   │   │   ├── PantryChecklist.jsx
│   │   │   ├── RecipeCard.jsx
│   │   │   ├── RecipeGrid.jsx
│   │   │   ├── RecipeModal.jsx
│   │   │   ├── SearchForm.jsx
│   │   │   ├── SortSelect.jsx
│   │   │   └── StatusMessage.jsx
│   │   ├── hooks/
│   │   │   ├── useFetch.js
│   │   │   └── useLocalStorage.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── logic.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── Mision_4/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── CategoryFilter.jsx
│   │   │   ├── MyRecipesList.jsx
│   │   │   ├── PantryChecklist.jsx
│   │   │   ├── RecipeCard.jsx
│   │   │   ├── RecipeForm.jsx
│   │   │   ├── RecipeGrid.jsx
│   │   │   ├── RecipeModal.jsx
│   │   │   ├── SearchForm.jsx
│   │   │   ├── SortSelect.jsx
│   │   │   └── StatusMessage.jsx
│   │   ├── hooks/
│   │   │   ├── useCreateRecipe.js
│   │   │   ├── useFetch.js
│   │   │   ├── useLocalStorage.js
│   │   │   └── useMyRecipes.js
│   │   ├── schema/
│   │   │   └── recipeSchema.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── myRecipesApi.js
│   │   ├── utils/
│   │   │   └── logic.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── db.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── mi-app/
├── app.js
├── index.html
├── prueba.html
└── README.md (Este archivo de índice)
```