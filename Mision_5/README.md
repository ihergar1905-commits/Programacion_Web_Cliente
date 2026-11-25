# 🍳 Culinary Odyssey · Landing
Misión M5 · Pixel Perfect — «Utility-first o nada».

## 🎮 Descripción del proyecto
Landing page de la **Culinary Odyssey**, la app de recetas que vengo construyendo desde la Misión 2. La página presenta el producto (portada, ventajas, cómo funciona) y termina con una **demo en vivo**: la aplicación completa de la M4 (buscador de TheMealDB, favoritos, modo despensa y «Mis recetas» con React Hook Form + Zod + TanStack Query) funcionando dentro de la landing.

Todo el aspecto está hecho con **Tailwind CSS v4**. El `index.css` de la M4 (unas 420 líneas de CSS a mano) se ha sustituido por la configuración de Tailwind y clases de utilidad en el JSX. La lógica de la M4 (hooks, servicios, esquemas de Zod y utilidades) no se ha tocado.

Secciones:
1. **Barra superior** fija con el logo, enlaces a las secciones y el botón de modo oscuro.
2. **Portada (hero)**: titular, botones de acción, cifras (la de «Tuyas» es real: el número de recetas guardadas en `json-server`) y un mosaico de ingredientes.
3. **Ventajas**: cuatro tarjetas con lo que hace la app.
4. **Cómo funciona**: tres pasos numerados.
5. **Demo en vivo**: la app de la M4.
6. **Pie** con el crédito a TheMealDB.

### ✨ Dirección visual
Estética de cocina de barrio con aire de carta impresa: fondo de papel crema, tipografía con serifa gruesa (Fraunces) para los titulares, bordes de 2 px color carbón y una **sombra «de sello»** plana y desplazada en los elementos importantes, como si estuvieran estampados. Los colores salen de la propia cocina: tomate, azafrán, aceituna, crema y carbón. Detalles: la frase «ya tienes» subrayada con un trazo de rotulador, la «comanda nº 42» del mosaico y las fichas que se inclinan al pasar el ratón.

## 🎨 Sistema de diseño (`src/index.css`)
Configuración **CSS-first**: no existe `tailwind.config.js`. Todo está en el CSS:
```css
@import "tailwindcss";                                   /* carga Tailwind */
@custom-variant dark (&:where(.dark, .dark *));          /* dark: por clase */
@theme { ... }                                           /* tokens propios */
```
Tokens definidos en `@theme` (cada uno crea sus clases automáticamente):

| Token | Ejemplo de clase | Uso |
|---|---|---|
| `--font-display`, `--font-sans` | `font-display` | Fraunces en titulares, Inter en el texto |
| `--color-crema-*` (50-300) | `bg-crema-50` | Fondos claros («papel») |
| `--color-tomate-*` (300-700) | `bg-tomate-600` | Color principal: botones, acentos, errores |
| `--color-azafran-*` (200-500) | `bg-azafran-300` | Resaltados, etiquetas, selección de texto |
| `--color-oliva-*` (200-700) | `text-oliva-700` | Éxito, datos de las recetas, modo despensa |
| `--color-carbon-*` (400-950) | `bg-carbon-950` | Texto, bordes y fondos del modo oscuro |
| `--radius-tarjeta`, `--radius-boton` | `rounded-tarjeta` | Esquinas de tarjetas y botones |
| `--shadow-tarjeta`, `--shadow-sello` | `shadow-sello` | Las dos sombras de la marca |
| `--animate-entrada` + `@keyframes entrada` | `animate-entrada` | ★ Bonus: animación de entrada |

**Consistencia**: solo se usan colores de la paleta propia (ningún `blue-500` ni similares), el espaciado sigue la escala de Tailwind (`gap-4`, `p-6`, `py-16 md:py-24` en todas las secciones) y las clases que se repiten están en un solo sitio: el componente `Button`, `SectionHeading` y la constante `INPUT` (`components/ui/styles.js`) para todos los campos de formulario.

## 📱 Responsive mobile-first
Las clases sin prefijo son para el móvil; los prefijos añaden cambios **desde** ese ancho hacia arriba. Uso dos puntos de corte, que coinciden con los tamaños que pide la misión:
- **Base (360 px)**: todo en una columna, enlaces de la barra ocultos (el botón del hero hace de llamada a la acción).
- **`md:` (768 px)**: hero en dos columnas, enlaces visibles en la barra, ventajas y recetas en 2 columnas, formulario en 2 columnas.
- **`xl:` (1280 px)**: ventajas en 4 columnas, recetas en 3, formulario y lista de «Mis recetas» lado a lado, buscador y pestañas en la misma fila.
- `sm:` (640 px) solo se usa para mostrar el botón «Probar» de la barra cuando ya cabe.

Comprobado a 360, 768 y 1280 px sin scroll horizontal.

## 📐 Flexbox y Grid
- **Grid** (dos dimensiones, rejillas): hero (`md:grid-cols-2`), mosaico de ingredientes (`grid-cols-3` con la comanda en `col-span-3`), cifras del hero, ventajas, pasos, rejilla de recetas, formulario (con `md:col-span-2` en los campos anchos), lista de «Mis recetas», despensa y cabecera del modal.
- **Flex** (una dirección, alinear): barra superior (`justify-between`), botones del hero (`flex-wrap`), chips de categorías, pestañas, buscador (input `flex-1` + botón), interior de cada tarjeta (`flex-col` con el botón abajo gracias a `mt-auto`) y pie.
- **Sin hacks de posicionamiento**: el botón de favorito va encima de la foto apilando las dos cosas en la misma celda de un grid (`col-start-1 row-start-1`), sin `position: absolute`. Solo se usa `fixed` en el fondo del modal y `sticky` en la barra, que es para lo que existen.

## 🌗 Modo oscuro
- Variante por **clase** (`@custom-variant dark`): `dark:` se aplica cuando `<html>` tiene `class="dark"`.
- La primera vez se sigue la preferencia del sistema; luego manda el botón ☀️/🌙, y la elección se guarda con el `useLocalStorage` de la M3 (hook nuevo `useTheme`).
- Un pequeño script en `index.html` aplica el tema antes de pintar, para que no haya un parpadeo blanco al recargar.
- **Contraste**: en claro, texto carbón sobre crema; en oscuro, crema sobre carbón casi negro. Los textos secundarios usan opacidades altas (`text-crema-200/80`) y los colores de acento se aclaran en oscuro (`text-tomate-600 dark:text-tomate-300`). Los botones principales mantienen blanco sobre `tomate-600`.

## ★ BONUS: animación de entrada
`@keyframes entrada` (sube 1,5 rem y aparece) está **dentro de `@theme`** y registrada como `--animate-entrada`, así que Tailwind crea la clase `animate-entrada`. Se usa en el hero, las tarjetas de ventajas (escalonadas con `animation-delay`), las recetas, el modal y las recetas guardadas. Siempre con `motion-safe:`, así que no se anima si el usuario tiene activado «reducir movimiento».

## 📁 Estructura del proyecto
```
Mision_5/
├── db.json                     # "Base de datos" de json-server (M4)
├── index.html                  # 🆕 fuentes, meta description y script del tema
├── package.json                # 🆕 tailwindcss + @tailwindcss/vite
├── vite.config.js              # 🆕 plugin de Tailwind
└── src/
    ├── main.jsx                # QueryClient (M4)
    ├── App.jsx                 # 🆕 la landing: coloca las secciones
    ├── index.css               # 🆕 @import + @custom-variant + @theme (sistema de diseño)
    ├── components/
    │   ├── landing/            # 🆕 Navbar, Hero, Features, HowItWorks, AppDemo, Footer
    │   ├── ui/                 # 🆕 Button, SectionHeading, ThemeToggle, styles.js
    │   ├── RecipeApp.jsx       # el antiguo App.jsx de la M4 (misma lógica, JSX con Tailwind)
    │   └── ...                 # componentes de la M3/M4, ahora con clases de Tailwind
    ├── hooks/                  # useFetch, useLocalStorage, useMyRecipes, useCreateRecipe + 🆕 useTheme
    ├── schema/                 # Zod (M4, sin cambios)
    ├── services/               # fetch a TheMealDB y a json-server (sin cambios)
    └── utils/                  # lógica pura (sin cambios)
```

## ▶️ Cómo ejecutarlo
Desde la carpeta `Mision_5`, con **dos terminales**:
```bash
npm install
npm run api   # terminal 1: json-server en http://localhost:3001 (para «Mis recetas»)
npm run dev   # terminal 2: la landing en http://localhost:5173
```
Sin el servidor de datos la landing funciona igual; solo «Mis recetas» muestra el error con el botón Reintentar.

---

## 🤖 Uso de IA

Se ha utilizado **Claude (Anthropic)** como asistente en esta misión.

* **Modo de trabajo:** le pedí a Claude que me explicara primero de qué iba la misión, los conceptos nuevos (configuración CSS-first, `@theme`, mobile-first, flex frente a grid, `dark:`) y cómo se iba a estructurar el código. Después le pedí que hiciera la misión entera **encima del código de la M4**. Claude generó la configuración de Tailwind, el sistema de diseño, las secciones nuevas y pasó los componentes de la M4 a clases de Tailwind sin tocar la lógica.
* **Prompts principales (resumidos):**
  1. *«Quiero que primero me introduzcas de qué va, cómo lo vamos a hacer, los conceptos que vamos a ver, cómo se va a estructurar el código y lo nuevo que vamos a hacer.»*
  2. *«Haz la misión 5 encima de la misión 4.»*
* **Verificación realizada:**
  * Claude ejecutó `npm run lint` (sin errores) y `npm run build`, y revisó capturas de la página a 360, 768 y 1280 px en modo claro y oscuro, comprobando que no hubiera scroll horizontal. Así encontró y corrigió que a 360 px la barra superior se salía de la pantalla (el botón «Probar» ahora solo aparece desde 640 px).
  * También comprobó el formulario con errores y el modal en móvil.
  * *(Pendiente de completar por mí: mis comprobaciones en el navegador.)*

---

## 🩺 Autopsia del código

1. **El modo oscuro va por clase (`@custom-variant dark`) y no por la preferencia del sistema**
   * **Decisión tomada:** `dark:` depende de la clase `dark` en `<html>`, que pone un botón y se guarda en `localStorage`. Si el usuario no ha elegido nunca, se usa la preferencia del sistema como valor inicial.
   * **Alternativa descartada:** dejar el `dark:` por defecto de Tailwind, que solo sigue a `prefers-color-scheme`. Es cero código, pero el usuario no podría cambiar de tema dentro de la página. La contrapartida de mi opción es un poco más de código (hook `useTheme` y el script de `index.html` para evitar el parpadeo al recargar).

2. **El favorito encima de la foto se coloca con grid, no con `position: absolute`**
   * **Decisión tomada:** la cabecera de cada tarjeta es un grid de una sola celda donde la imagen y el botón ocupan la misma posición (`col-start-1 row-start-1`), y el botón se alinea arriba a la derecha con `place-self-start justify-self-end`.
   * **Alternativa descartada:** `relative` en la tarjeta y `absolute top-3 right-3` en el botón, que es lo habitual. Funciona, pero saca el botón del flujo y es justo el tipo de «hack de posicionamiento» que la rúbrica pide evitar. Con grid los dos elementos siguen en el flujo y el tamaño de la cabecera lo marca la imagen.
