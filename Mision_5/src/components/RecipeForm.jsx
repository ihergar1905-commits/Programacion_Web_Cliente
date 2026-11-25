import { useForm } from 'react-hook-form'; // el hook principal de React Hook Form
import { zodResolver } from '@hookform/resolvers/zod'; // el adaptador que conecta RHF con Zod
import { recipeSchema, CATEGORIAS, DIFICULTADES } from '../schema/recipeSchema.js'; // reglas + listas de opciones
import { useCreateRecipe } from '../hooks/useCreateRecipe.js'; // nuestro hook para guardar
import { INPUT } from './ui/styles.js'; // 🆕 M5: clases compartidas de los campos

// 🆕 M5: clases de Tailwind reutilizadas en todas las etiquetas y campos
const LABEL = 'mb-1.5 block text-sm font-semibold';
const CAMPO = 'flex flex-col'; // cada campo: etiqueta, input y error en columna

// Con qué empieza cada campo (formulario vacío, casilla sin marcar)
const VALORES_INICIALES = {
  nombre: '',
  categoria: '',
  minutos: '',
  dificultad: '',
  vegana: false,
  ingredientes: '',
};

// Componente pequeño: pinta el mensaje de error de un campo (o nada si no hay error)
function FieldError({ id, error }) {
  if (!error) return null; // sin error → no pinta nada
  return <p id={id} className="mt-1.5 text-sm font-medium text-tomate-600 dark:text-tomate-300" role="alert">{error.message}</p>; // role="alert" -> el lector de pantalla lo lee en voz alta
}

function RecipeForm() {
  const {
    register, // conecta cada campo con RHF
    handleSubmit, // envuelve nuestra función de enviar: primero valida con Zod
    reset, // vacía el formulario (vuelve a VALORES_INICIALES)
    formState: { errors }, // los errores de cada campo (errors.nombre, errors.minutos...)
  } = useForm({
    resolver: zodResolver(recipeSchema), // "valida con este reglamento de Zod"
    defaultValues: VALORES_INICIALES, // con qué empieza el formulario
  });

  const crear = useCreateRecipe(); // { mutate, isPending, isSuccess, isError, data, error }

  // Solo se ejecuta si Zod dijo que TODO está bien. "receta" ya viene limpia (minutos como número, sin espacios)
  function enviar(receta) {
    crear.mutate(receta, { // lanza el guardado (POST)...
      onSuccess: () => reset(), // ...y si sale bien, vacía el formulario
    });
  }

  return (
    // 🆕 M5: grid de 1 columna en móvil y 2 desde tablet; nombre, ingredientes y botón ocupan las 2 (md:col-span-2)
    <form
      className="grid gap-4 rounded-tarjeta border-2 border-carbon-900 bg-white p-5 md:grid-cols-2 md:p-6 dark:border-crema-200/20 dark:bg-carbon-900"
      onSubmit={handleSubmit(enviar)}
      noValidate
    >
      {/* handleSubmit(enviar): al enviar, primero Zod; si todo va bien, llama a enviar */}
      {/* noValidate: desactiva los avisos propios del navegador, así solo salen los de Zod */}

      <h2 className="font-display text-2xl font-bold md:col-span-2">📝 Nueva receta</h2>

      {/* ── Nombre ── */}
      <div className={`${CAMPO} md:col-span-2`}>
        <label htmlFor="nombre" className={LABEL}>Nombre</label>
        <input
          id="nombre"
          type="text"
          {...register('nombre')} // engancha este input al campo "nombre" de RHF
          className={INPUT} // 🆕 M5: aspecto común de todos los campos
          aria-invalid={errors.nombre ? 'true' : 'false'} // avisa al lector de pantalla si está mal
          aria-describedby="nombre-error" // "mi explicación está en el elemento con id nombre-error"
        />
        <FieldError id="nombre-error" error={errors.nombre} />
      </div>

      {/* ── Categoría (desplegable) ── */}
      <div className={CAMPO}>
        <label htmlFor="categoria" className={LABEL}>Categoría</label>
        <select
          id="categoria"
          {...register('categoria')}
          className={INPUT}
          aria-invalid={errors.categoria ? 'true' : 'false'}
          aria-describedby="categoria-error"
        >
          <option value="">— Elige —</option>
          {CATEGORIAS.map((cat) => (
            <option key={cat} value={cat}>{cat}</option> // una opción por cada categoría de la lista
          ))}
        </select>
        <FieldError id="categoria-error" error={errors.categoria} />
      </div>

      {/* ── Minutos ── */}
      <div className={CAMPO}>
        <label htmlFor="minutos" className={LABEL}>Minutos</label>
        <input
          id="minutos"
          type="number" // teclado numérico en el móvil (pero sigue dando TEXTO → por eso el coerce)
          {...register('minutos')}
          className={INPUT}
          aria-invalid={errors.minutos ? 'true' : 'false'}
          aria-describedby="minutos-error"
        />
        <FieldError id="minutos-error" error={errors.minutos} />
      </div>

      {/* ── Dificultad (desplegable) ── */}
      <div className={CAMPO}>
        <label htmlFor="dificultad" className={LABEL}>Dificultad</label>
        <select
          id="dificultad"
          {...register('dificultad')}
          className={INPUT}
          aria-invalid={errors.dificultad ? 'true' : 'false'}
          aria-describedby="dificultad-error"
        >
          <option value="">— Elige —</option>
          {DIFICULTADES.map((dif) => (
            <option key={dif} value={dif}>{dif}</option>
          ))}
        </select>
        <FieldError id="dificultad-error" error={errors.dificultad} />
      </div>

      {/* ── Ingredientes ── */}
      <div className={`${CAMPO} md:col-span-2`}>
        <label htmlFor="ingredientes" className={LABEL}>Ingredientes (separados por comas)</label>
        <textarea
          id="ingredientes"
          rows={3} // alto: 3 líneas
          {...register('ingredientes')}
          className={INPUT}
          aria-invalid={errors.ingredientes ? 'true' : 'false'}
          aria-describedby="ingredientes-error"
        />
        <FieldError id="ingredientes-error" error={errors.ingredientes} />
      </div>

      {/* ── Vegana (casilla): marcada = true, sin marcar = false ── */}
      <label className="flex cursor-pointer items-center gap-3 font-medium md:col-span-2">
        <input type="checkbox" {...register('vegana')} className="size-5 accent-oliva-500" />
        🌱 Receta vegana
      </label>

      {/* ── Botón: desactivado mientras se guarda (evita guardar dos veces) ── */}
      <button
        type="submit"
        disabled={crear.isPending}
        className="rounded-boton border-2 border-carbon-900 bg-tomate-600 px-5 py-3 font-semibold text-white shadow-sello transition hover:bg-tomate-700 disabled:cursor-wait disabled:opacity-60 md:col-span-2 dark:border-crema-100 dark:shadow-none"
      >
        {crear.isPending ? 'Guardando…' : 'Guardar receta'}
      </button>

      {/* ── Aviso de éxito: crear.data es la receta que devolvió el servidor ── */}
      {crear.isSuccess && (
        <p className="rounded-xl bg-oliva-200 px-4 py-2 font-medium text-oliva-700 md:col-span-2" role="status">✅ «{crear.data.nombre}» guardada</p>
      )}

      {/* ── Aviso de error: crear.error es el Error que lanzó createRecipe ── */}
      {crear.isError && (
        <p className="rounded-xl bg-tomate-300/25 px-4 py-2 font-medium text-tomate-700 md:col-span-2 dark:text-tomate-300" role="alert">❌ {crear.error.message}</p>
      )}
    </form>
  );
}

export default RecipeForm; // para poder importarlo en App.jsx