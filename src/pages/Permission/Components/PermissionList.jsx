import { Link } from "react-router-dom"
import { useResourceList } from "../../../hooks/useResources"
import { UserIcon } from "@heroicons/react/24/outline"
import { NarrowWrapper } from "../../../NarrowWrapper"

export function PermissionList() {
  const { data } = useResourceList("permissions")
  const permissions = data ?? []
  return (
    <NarrowWrapper>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {permissions.map((permission) => (
          <div
            key={permission.id}
            className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
          >
            <div className="flex-shrink-0">
              <UserIcon className="h-10 w-10 rounded-full" />
            </div>
            <div className="min-w-0 flex-1">
              <Link
                to={`/permissions/${permission.id}/edit`}
                className="focus:outline-none"
              >
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">{permission.name}</p>
                <p className="truncate text-sm text-gray-500">
                  {permission.route}
                </p>
                <p className="truncate text-sm text-gray-500">
                 role: {permission.role_id}
                </p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </NarrowWrapper>
  )
}
