export function HashtagButton({ children, ...delegated }) {
  return (
    <button
      type="button"
      className="flex items-center relative rounded bg-primary-50 px-2 py-1 text-xs font-semibold text-primary shadow-sm hover:bg-primary-100 dark:bg-primary-950 dark:hover:bg-primary-900 gap-2 group"
      {...delegated}
    >
      <span className="text-[0.625rem] text-primary-300 dark:text-primary-700 group-hover:text-primary-800 dark:group-hover:text-primary-100">x</span>
      {children}
    </button>
  )
}
