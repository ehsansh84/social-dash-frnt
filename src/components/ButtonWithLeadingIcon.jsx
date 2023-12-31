export function ButtonWithLeadingIcon({
  size = "md",
  Icon,
  children,
  ...delegated
}) {
  return size === "sm" ? (
    <button
      type="button"
      className="inline-flex items-center gap-x-1.5 rounded-md bg-primary-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
      {...delegated}
    >
      <Icon className="-ms-0.5 h-5 w-5" aria-hidden="true" />
      {children}
    </button>
  ) : size === "md" ? (
    <button
      type="button"
      className="inline-flex items-center gap-x-1.5 rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
      {...delegated}
    >
      <Icon className="-ms-0.5 h-5 w-5" aria-hidden="true" />
      {children}
    </button>
  ) : (
    <button
      type="button"
      className="inline-flex items-center gap-x-2 rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
      {...delegated}
    >
      <Icon className="-ms-0.5 h-5 w-5" aria-hidden="true" />
      {children}
    </button>
  )
}
