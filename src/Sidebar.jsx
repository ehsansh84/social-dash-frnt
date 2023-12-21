import {
  Cog6ToothIcon,
  FolderIcon,
  ServerIcon,
} from "@heroicons/react/24/outline"

import { NavLink } from "react-router-dom"
import { ThemeToggle } from "./components/ThemeToggle"

const navigation = [
  { name: "Users", href: "users", icon: FolderIcon, current: false },
  { name: "Posts", href: "posts", icon: ServerIcon, current: true },
  { name: "Settings", href: "settings", icon: Cog6ToothIcon, current: false },
]

export function Sidebar() {
  return (
    <div className="bg-bg flex grow flex-col gap-y-5 overflow-y-auto border-e border-gray-200 px-6 dark:border-none dark:ring-1 dark:ring-white/10">
      <div className="flex h-16 shrink-0 items-center">
        <img className="h-16 w-auto" src="/logo.svg" alt="Your Company" />
      </div>
      <ThemeToggle />
      <nav className="flex flex-1 flex-col">
        <ul className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    className={(navData) =>
                      navData.isActive
                        ? "hover:bg-bg-hover group flex gap-x-3 rounded-md bg-gray-50 p-2 text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-600 dark:bg-gray-800"
                        : "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-bg-hover hover:text-indigo-600 dark:text-gray-400 dark:hover:text-white"
                    }
                  >
                    <item.icon
                      className="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
          <li className="-mx-6 mt-auto">
            <a
              href="google.com"
              className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6  text-gray-900 hover:bg-bg-hover dark:text-white"
            >
              <img
                className="h-8 w-8 rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">Tom Cook</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
