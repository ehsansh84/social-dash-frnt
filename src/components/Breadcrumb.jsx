import { Link } from "react-router-dom"

const BreadcrumbDivider = () => (
  <svg
    className="ms-2 h-5 w-5 text-gray-300"
    fill="currentColor"
    viewBox="0 0 20 20"
    aria-hidden="true"
  >
    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
  </svg>
)


export function Breadcrumb({ pages }) {
  return (
    <nav aria-label="Breadcrumb" className="py-5">
      <ol className="flex justify-start gap-1">
        {pages.map((page, index) => {
          const isLastPage = index === pages.length - 1
          if (isLastPage) {
            return (
              <li key={page.href} className="inline-flex items-center">
                <span
                  className="text-sm font-medium text-gray-500"
                  aria-current="page"
                >
                  {page.name}
                </span>
              </li>
            )
          }

          return (
            <li key={page.href} className="inline-flex items-center">
              <Link
                to={page.href}
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={page.current ? "page" : undefined}
              >
                {page.name}
              </Link>
              {!isLastPage && <BreadcrumbDivider />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
