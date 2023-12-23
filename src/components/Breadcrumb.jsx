import { Link } from "react-router-dom"
import { BreadcrumbDivider } from "./BreadcrumbDivider"

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
