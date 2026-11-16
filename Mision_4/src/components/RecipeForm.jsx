import { useForm } from 'react-hook-form'; // el hook principal de React Hook Form
import { zodResolver } from '@hookform/resolvers/zod'; // el adaptador que conecta RHF con Zod
import { recipeSchema, CATEGORIAS, DIFICULTADES } from '../schema/recipeSchema.js'; // reglas + listas de opciones
import { useCreateRecipe } from '../hooks/useCreateRecipe.js'; // nuestro hook para guardar

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
  return <p id={id} className="field-error" role="alert">{error.message}</p>; // role="alert" -> el lector de pantalla lo lee en voz alta
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
    <form className="recipe-form" onSubmit={handleSubmit(enviar)} noValidate>
      {/* handleSubmit(enviar): al enviar, primero Zod; si todo va bien, llama a enviar */}
      {/* noValidate: desactiva los avisos propios del navegador, así solo salen los de Zod */}

      <h2>📝 Nueva receta</h2>

      {/* ── Nombre ── */}
      <label htmlFor="nombre">Nombre</label>
      <input
        id="nombre"
        type="text"
        {...register('nombre')} // engancha este input al campo "nombre" de RHF
        aria-invalid={errors.nombre ? 'true' : 'false'} // avisa al lector de pantalla si está mal
        aria-describedby="nombre-error" // "mi explicación está en el elemento con id nombre-error"
      />
      <FieldError id="nombre-error" error={errors.nombre} />

      {/* ── Categoría (desplegable) ── */}
      <label htmlFor="categoria">Categoría</label>
      <select
        id="categoria"
        {...register('categoria')}
        aria-invalid={errors.categoria ? 'true' : 'false'}
        aria-describedby="categoria-error"
      >
        <option value="">— Elige —</option>
        {CATEGORIAS.map((cat) => (
          <option key={cat} value={cat}>{cat}</option> // una opción por cada categoría de la lista
        ))}
      </select>
      <FieldError id="categoria-error" error={errors.categoria} />

      {/* ── Minutos ── */}
      <label htmlFor="minutos">Minutos</label>
      <input
        id="minutos"
        type="number" // teclado numérico en el móvil (pero sigue dando TEXTO → por eso el coerce)
        {...register('minutos')}
        aria-invalid={errors.minutos ? 'true' : 'false'}
        aria-describedby="minutos-error"
      />
      <FieldError id="minutos-error" error={errors.minutos} />

      {/* ── Dificultad (desplegable) ── */}
      <label htmlFor="dificultad">Dificultad</label>
      <select
        id="dificultad"
        {...register('dificultad')}
        aria-invalid={errors.dificultad ? 'true' : 'false'}
        aria-describedby="dificultad-error"
      >
        <option value="">— Elige —</option>
        {DIFICULTADES.map((dif) => (
          <option key={dif} value={dif}>{dif}</option>
        ))}
      </select>
      <FieldError id="dificultad-error" error={errors.dificultad} />

      {/* ── Ingredientes ── */}
      <label htmlFor="ingredientes">Ingredientes (separados por comas)</label>
      <textarea
        id="ingredientes"
        rows={3} // alto: 3 líneas
        {...register('ingredientes')}
        aria-invalid={errors.ingredientes ? 'true' : 'false'}
        aria-describedby="ingredientes-error"
      />
      <FieldError id="ingredientes-error" error={errors.ingredientes} />

      {/* ── Vegana (casilla): marcada = true, sin marcar = false ── */}
      <label className="checkbox">
        <input type="checkbox" {...register('vegana')} />
        🌱 Receta vegana
      </label>

      {/* ── Botón: desactivado mientras se guarda (evita guardar dos veces) ── */}
      <button type="submit" disabled={crear.isPending}>
        {crear.isPending ? 'Guardando…' : 'Guardar receta'}
      </button>

      {/* ── Aviso de éxito: crear.data es la receta que devolvió el servidor ── */}
      {crear.isSuccess && (
        <p className="form-ok" role="status">✅ «{crear.data.nombre}» guardada</p>
      )}

      {/* ── Aviso de error: crear.error es el Error que lanzó createRecipe ── */}
      {crear.isError && (
        <p className="form-fail" role="alert">❌ {crear.error.message}</p>
      )}
    </form>
  );
}

export default RecipeForm; // para poder importarlo en App.jsx