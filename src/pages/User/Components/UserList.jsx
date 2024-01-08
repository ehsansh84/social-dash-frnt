import { ChevronRightIcon } from "@heroicons/react/20/solid"
import { Wrapper } from "../../../Wrapper"
import { Link } from "react-router-dom"
import { capitalize } from "../../../utils"
import { Badge } from "../../../components/Badge"
import { useResourceList } from "../../../hooks/useLocalResources"

export function UserList() {
  const { data } = useResourceList("users")
  const people = data ?? []
  return (
    <ul className="divide-y divide-gray-100 dark:divide-gray-700 dark:border-t dark:border-white/5">
      {people.map((person) => (
        <Wrapper
          as="li"
          key={person._id}
          className="relative flex justify-between gap-x-6 py-5 hover:bg-bg-hover"
        >
          <div className="flex gap-x-4">
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              src={person.pic}
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <p>
                <Link to={"/users/" + person._id + "/edit"} className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100 me-2">
                  <span className="absolute inset-x-0 -top-px bottom-0" />
                  {person.name + (person.family ? ' ' + person.family : '')}
                </Link>
                {person.status === 'enabled' ? (
                  <Badge color="green" variant="small-flat-pill" className="hidden sm:inline">enabled</Badge>
                ) : (
                  <Badge color="gray" variant="small-flat-pill" className="hidden sm:inline">disabled</Badge>
                )}
              </p>
              <p className="mt-1 flex items-baseline gap-2">
                <a
                  href={`mailto:${person.email}`}
                  className="relative truncate text-xs text-gray-500 hover:underline dark:text-gray-400"
                >
                  {person.email}
                </a>
                {person.email_verified ? (
                  <Badge color="green" variant="small-flat-pill" className="hidden sm:block">verified</Badge>
                ) : (
                  <Badge color="red" variant="small-flat-pill" className="hidden sm:block">not verified</Badge>
                )}
              </p>
              <p className="sm:hidden text-sm leading-6 text-gray-900 dark:text-gray-100">
                {capitalize(person.role)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900 dark:text-gray-100">
                {capitalize(person.role)}
              </p>
              <p className="mt-1 text-xs leading-5 text-gray-500 text">
                Last seen{" "}
                <time dateTime={person.last_login}>
                  {person.last_login ? person.last_login : "unknown"}
                </time>
              </p>
            </div>
            <ChevronRightIcon
              className="h-5 w-5 flex-none text-gray-400"
              aria-hidden="true"
            />
          </div>
        </Wrapper>
      ))}
    </ul>
  )
}
