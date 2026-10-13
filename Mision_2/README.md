# 🍳 Culinary Odyssey
Misión M2 · Async Odyssey.

## 🎮 Descripción del proyecto
"Culinary Odyssey" es un buscador de recetas desarrollado con Vite, HTML5, CSS3 y JavaScript puro (vanilla JS). Consume la API pública real **TheMealDB** mediante `fetch` + `async/await` y pinta los resultados en el DOM con estados de carga y error visibles para el usuario.

El usuario escribe el nombre de un plato o ingrediente (en inglés, por ejemplo `chicken` o `pasta`) y pulsa **Buscar**. La aplicación:

1. Muestra el mensaje **"Cargando..."** mientras espera la respuesta.
2. Comprueba si esa búsqueda ya está guardada en `localStorage`. Si lo está, usa los datos guardados y no hace ninguna petición.
3. Si no lo está, hace un `fetch` a la API, comprueba `response.ok` y guarda el resultado en la caché.
4. Limpia y transforma los datos crudos con `map`, `filter` y `reduce`.
5. Pinta una tarjeta por receta (imagen, nombre, categoría, país, número de ingredientes y un fragmento de las instrucciones) y un resumen con el número de recetas por categoría.
6. Si no hay resultados, muestra un mensaje informativo. Si hay un error de red, muestra un mensaje de error en rojo y la aplicación sigue funcionando.

Al abrir la página se carga automáticamente la búsqueda `chicken`.

Como elemento de **originalidad**, además de las tarjetas, la app calcula y muestra un **resumen de categorías** (por ejemplo, `Categorías: Chicken (2) · Beef (1)`) y el **número de ingredientes** de cada receta.

### ★ BONUS: Caché en localStorage
Para no repetir peticiones ya hechas, cada búsqueda se guarda en `localStorage` con la clave `recipes:<término>`:

* Antes de llamar a la API, `api.js` comprueba si existe esa clave. Si existe, devuelve los datos guardados y muestra en consola el mensaje `"<término>" cargado desde la caché`.
* El término se normaliza (`trim()` y `toLowerCase()`), de modo que `Pasta` y `pasta ` comparten la misma entrada.
* Si la caché está corrupta o el almacenamiento no está disponible, la app lo ignora y pide los datos a la API con normalidad.

### 📁 Estructura del proyecto
```
m2-async-odyssey/
├── index.html        # Estructura de la página
├── package.json
├── public/
└── src/
    ├── api.js        # Capa de datos: fetch y caché
    ├── logic.js      # Capa de lógica: transformación de datos
    ├── render.js     # Capa de vista: pinta en el DOM
    ├── main.js       # Orquesta el flujo de la búsqueda
    └── style.css     # Estilos
```

### ▶️ Cómo ejecutarlo
```bash
npm install
npm run dev
```

---

## 🤖 Uso de IA

Conforme a las directrices de la asignatura, se ha utilizado **Claude (Anthropic)**, a través del chat de claude.ai, como asistente durante el desarrollo de la práctica.

* **Modo de trabajo utilizado:** Trabajo guiado en dos fases. Primero, completar el código de cada módulo a partir del enunciado, pidiendo expresamente soluciones simples y sin funciones complicadas. Después, análisis detallado línea por línea de cada archivo (`api.js`, `logic.js`, `render.js`, `main.js`) para comprender el código antes de entregarlo.
* **Prompts principales utilizados (resumidos):**
  1. *"Completa los archivos de mi app según el enunciado, sin funciones difíciles de entender, de forma que se cumplan los requisitos y el bonus de la caché en localStorage."*
  2. *"Explícame línea por línea qué hace api.js: el fetch, la comprobación de response.ok, JSON.parse y encodeURIComponent."*
  3. *"Explícame logic.js: cómo se usan map, filter y reduce, y qué hacen Array.from, la flecha `=>` y el `_` en `(_, i)`."*
  4. *"Haz un análisis completo de render.js y de main.js, explicando qué hace cada línea y por qué: innerHTML, Object.entries, join, try/catch/finally y preventDefault."*
  5. *"¿Cómo compruebo que la caché, el estado de carga y el estado de error funcionan?"*
* **Verificación manual realizada:**
  * Se comprobó el funcionamiento en el navegador con Vite (`npm run dev`).
  * Se verificó la caché en la pestaña **Almacenamiento** de las herramientas de desarrollo: aparecen las entradas `recipes:chicken`, `recipes:pasta`, etc., y los mensajes `cargado desde la caché` en la consola.
  * En la pestaña **Red** se comprobó que una búsqueda nueva genera una única petición a `themealdb.com` con estado 200 y que repetirla no genera ninguna petición nueva.
  * Se probó el estado de error desconectando la red: una búsqueda nueva muestra el mensaje rojo, las búsquedas ya guardadas siguen funcionando desde la caché y, al recuperar la conexión, la app vuelve a funcionar sin recargar la página.
  * Se detectó y corrigió que una imagen no se cargaba correctamente.
  * Se aseguró el cumplimiento de buenas prácticas: ausencia de variables declaradas con `var`, ausencia de bucles `for` para transformar datos y separación completa entre estructura (HTML), estilos (CSS) y comportamiento (JS en módulos).

---

## 🩺 Autopsia del código

A continuación se detallan las 2 decisiones técnicas más discutibles tomadas durante la implementación y las alternativas que se descartaron:

1. **Gestión de la caché en `localStorage` sin tiempo de expiración (TTL)**
   * **Decisión tomada:** Se implementó una caché donde las respuestas de la API de TheMealDB se guardan indefinidamente bajo la clave `recipes:<término>`.
   * **Alternativa descartada:** Incluir un sello de tiempo (*timestamp*) para invalidar o borrar la caché pasadas unas horas. Se descartó porque los menús e ingredientes de TheMealDB son datos estáticos que raramente cambian, y añadir lógica de expiración introducía complejidad innecesaria sin aportar un beneficio claro a la experiencia del usuario.

2. **Propagación directa de errores desde `api.js` hacia `main.js`**
   * **Decisión tomada:** El módulo `api.js` no captura los errores de red para mostrar un mensaje, sino que hace un `throw error` para delegar el control a `main.js`, que es el orquestador encargado de llamar a `render.js`.
   * **Alternativa descartada:** Capturar el error directamente dentro de `api.js` y devolver un array vacío `[]` o un objeto de error. Se descartó porque rompería la separación de responsabilidades: la capa de datos (`api.js`) no debe asumir la lógica de la interfaz visual, permitiendo que `main.js` distinga claramente entre "búsqueda sin resultados" (respuesta 200 con array vacío) y "fallo de conexión/servidor" (capturado en el `catch`).