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

A continuación se detallan las decisiones técnicas aplicadas en la implementación:

1. **Asincronía y gestión de errores (`async/await`, `try/catch/finally`):**
   * *Decisión:* `fetchRecipes` es una función `async` que hace `await fetch(...)`, comprueba `response.ok` y lanza un error con `throw` si el servidor responde con un código de fallo. Ese error se relanza hasta `handleSearch` en `main.js`, que lo captura con `catch` y muestra el mensaje de error al usuario. El botón de búsqueda se desactiva al empezar y se reactiva en el bloque `finally`.
   * *Justificación:* `fetch` solo falla por sí solo si no hay conexión, no ante un 404 o un 500, por lo que comprobar `response.ok` es imprescindible. Reactivar el botón en `finally` garantiza que nunca se quede bloqueado, ya sea tras un éxito, un error o una búsqueda sin resultados. Además, `api.js` solo obtiene datos y `main.js` decide qué ve el usuario.

2. **Caché en `localStorage` con tolerancia a fallos (Bonus):**
   * *Decisión:* Las funciones `readCache` y `saveCache` envuelven `localStorage.getItem`/`setItem` y `JSON.parse`/`JSON.stringify` en `try/catch`. Las claves usan el prefijo `recipes:` más el término normalizado.
   * *Justificación:* `localStorage` solo guarda texto, por lo que hay que convertir los datos con `JSON.stringify` al guardar y con `JSON.parse` al leer. Si la caché está corrupta o el almacenamiento falla, la app lo trata como "no hay caché" y consulta la API, por lo que nunca se rompe. Como limitación conocida, la caché no caduca.

3. **Transformación de datos con métodos de array (sin bucles):**
   * *Decisión:* En `logic.js`, los ingredientes de cada receta (que la API entrega como 20 campos sueltos `strIngredient1..20`) se construyen con `Array.from` + `.filter()`. La lista completa se limpia con `.map(formatRecipeData).filter(Boolean)` y el recuento por categoría se calcula con `.reduce()`.
   * *Justificación:* Los tres métodos pedidos por el enunciado (`map`, `filter` y `reduce`) sustituyen a los bucles `for` y hacen el código más declarativo. Los valores por defecto (`||`) y la comprobación `Array.isArray` evitan que la app falle con datos incompletos o inesperados.

4. **Separación de responsabilidades en módulos ES:**
   * *Decisión:* El código se divide en cuatro módulos con una única responsabilidad cada uno: `api.js` (pedir datos), `logic.js` (transformarlos), `render.js` (pintarlos) y `main.js` (coordinar el flujo). Solo `main.js` está enlazado en `index.html` con `type="module"`; el resto se carga mediante `import`/`export`.
   * *Justificación:* `render.js` solo recibe recetas ya limpias y no conoce el formato de la API, de modo que cambiar de API solo exigiría modificar `logic.js` y `api.js`. En el DOM se usa `textContent` cuando solo se escribe texto (resumen de categorías) e `innerHTML` para las tarjetas y mensajes, que se generan a partir de los datos de TheMealDB.

5. **Robustez ante entradas y respuestas inesperadas:**
   * *Decisión:* El campo de búsqueda tiene `required`, el texto se limpia con `trim()` y no se lanza ninguna búsqueda si queda vacío. El término se codifica con `encodeURIComponent` antes de añadirlo a la URL, y cuando la API devuelve `meals: null` (sin resultados) se convierte en un array vacío con `data.meals || []`.
   * *Justificación:* Estas comprobaciones hacen que una búsqueda vacía, con caracteres especiales (como `&` o `%`) o sin resultados no provoque errores, y que la interfaz muestre siempre un mensaje claro ("No se encontraron recetas para tu búsqueda.").