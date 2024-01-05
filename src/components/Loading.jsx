export function Loading() {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-blue-700/30 pt-6">
      <div className="w-full text-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        ></div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}
