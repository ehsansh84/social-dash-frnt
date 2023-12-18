
export function Breadcrcumb({ pages }) {
  return (
    <nav aria-label="Breadcrumb" className="py-5">
      <ol className="flex justify-start gap-4">
        {pages.map((page, index) => (
          <li key={page.name} className="inline-flex items-center">
            <a
              href={page.href}
              className="text-sm font-medium text-gray-500 hover:text-gray-700"
              aria-current={page.current ? "page" : undefined}
            >
              {page.name}
            </a>
            {index < pages.length - 1 && (
              <svg
                className="h-5 w-5  text-gray-300 ms-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
