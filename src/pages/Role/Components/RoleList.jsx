import { Link } from "react-router-dom"
import { useResourceList } from "../../../hooks/useResources"
import { UserIcon } from "@heroicons/react/24/outline"
import { NarrowWrapper } from "../../../NarrowWrapper"

export function RoleList() {
  const { data } = useResourceList("roles")
  const roles = data ?? []
  return (
    <NarrowWrapper>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {roles.map((role) => (
          <div
            key={role.id}
            className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
          >
            <div className="flex-shrink-0">
              <UserIcon className="h-10 w-10 rounded-full" />
            </div>
            <div className="min-w-0 flex-1">
              <Link
                to={`/roles/${role.id}/edit`}
                className="focus:outline-none"
              >
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">{role.name}</p>
                <p className="truncate text-sm text-gray-500">
                  {role.description}
                </p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </NarrowWrapper>
  )
}
