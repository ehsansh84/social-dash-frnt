import { ChevronRightIcon } from "@heroicons/react/20/solid"
import { Wrapper } from "../../../Wrapper"
import { Link } from "react-router-dom"
import { capitalize } from "../../../utils"
import { Badge } from "../../../components/Badge"

const people = [
  {
    _id: "659b4474278d411b9cec0a77",
    email_verified: false,
    role: "admin",
    name: "Ehsan",
    family: "Rezaee",
    status: "enabled",
    pic: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    email: "admin@gmail.com",
    last_login: "",
    username: "admin",
    mobile_verified: false,
    created_at: "2024-01-08 00:40:20.025000",
    updated_at: "2024-01-08 00:40:20.025000",
    mobile: "+989151112233",
    password: "$2b$12$aLwZYjO1I7v6AK2rhqJAqui7Ubq5oTdA2kDVQ2WzjwWYHm0ojPZj.",
    _User__password_is_hashed: false,
  },
  {
    _id: "1",
    email_verified: true,
    mobile_verified: false,
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    role: "Co-Founder / CEO",
    pic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    last_login: "2024-01-08 00:44:21.219000",
  },
  {
    _id: "2",
    email_verified: false,
    mobile_verified: true,
    name: "Michael Foster",
    email: "michael.foster@example.com",
    role: "Co-Founder / CTO",
    pic: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
    last_login: "2024-01-08 00:44:21.219000",
  },
  {
    _id: "3",
    name: "Dries Vincent",
    email: "dries.vincent@example.com",
    role: "Business Relations",
    pic: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
    last_login: "",
  },
  {
    _id: "4",
    name: "Lindsay Walton",
    email: "lindsay.walton@example.com",
    role: "Front-end Developer",
    pic: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    last_login: "2024-01-08 00:44:21.219000",
  },
  {
    _id: "5",
    name: "Courtney Henry",
    email: "courtney.henry@example.com",
    role: "Designer",
    pic: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",

    last_login: "2024-01-08 00:44:21.219000",
  },
  {
    _id: "6",
    name: "Tom Cook",
    email: "tom.cook@example.com",
    role: "Director of Product",
    pic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    last_login: "",
  },
]

export function UserList() {
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
                  <Badge color="green" variant="pill" className="hidden sm:inline">enabled</Badge>
                ) : (
                  <Badge color="gray" variant="pill" className="hidden sm:inline">disabled</Badge>
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
                  <Badge color="green" variant="pill" className="hidden sm:block">verified</Badge>
                ) : (
                  <Badge color="red" variant="pill" className="hidden sm:block">not verified</Badge>
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
