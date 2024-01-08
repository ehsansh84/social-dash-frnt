export function Badge({ color = "gray", variant="simple", children, className="", ...delegated }) {
  const baseClasses = variant === "pill" ?
  "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset" :
  variant === 'small-flat-pill' ? 
  "inline-flex items-center rounded-full px-1.5 py-0.5 text-xs font-medium" :
  variant === 'small-pill-border' ?
  "inline-flex items-center rounded-full px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset" :
  "inline-flex items-center rounded-md px-2 py-1 text-xs font-mediumring-1 ring-inset"
  const colorClasses = {
    gray: `${baseClasses} bg-gray-50 text-gray-600 ring-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:ring-gray-400/20`,
    red: `${baseClasses} bg-red-50 text-red-400 ring-red-400/20 dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/20`,
    green: `${baseClasses} bg-green-50 text-green-700 ring-green-600/20 bg-green-500/10  text-green-400 ring-green-500/20`,
  }
  return (
    <span className={`${colorClasses[color]} ${className}`} {...delegated}>
      {children}
    </span>
  )
}
