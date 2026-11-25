// Botón/enlace de la marca. Se extrae a un componente para no repetir la lista de clases
// (la teoría lo recomienda antes que @apply). variant: 'primary' | 'ghost'
const BASE =
  'inline-flex items-center justify-center gap-2 rounded-boton border-2 border-carbon-900 px-5 py-3 font-semibold transition hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-tomate-500 dark:border-crema-100';

const VARIANTS = {
  primary: 'bg-tomate-600 text-white shadow-sello hover:bg-tomate-700 dark:shadow-none',
  ghost: 'bg-transparent text-carbon-900 hover:bg-crema-200 dark:text-crema-100 dark:hover:bg-carbon-800',
};

function Button({ as: Tag = 'a', variant = 'primary', className = '', children, ...props }) {
  return (
    <Tag className={`${BASE} ${VARIANTS[variant]} ${className}`} {...props}>
      {children}
    </Tag>
  );
}

export default Button;
