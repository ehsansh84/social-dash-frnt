import {
  AcademicCapIcon,
  BanknotesIcon,
  CheckBadgeIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
} from "@heroicons/react/24/outline"
import TinyLineChart from "../../components/charts/TinyLineChart"

const actions = [
  {
    title: "Request time off",
    href: "#",
    icon: ClockIcon,
    iconForeground: "text-teal-700",
    iconBackground: "bg-teal-50",
  },
  {
    title: "Benefits",
    href: "#",
    icon: CheckBadgeIcon,
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
  },
  {
    title: "Schedule a one-on-one",
    href: "#",
    icon: UsersIcon,
    iconForeground: "text-sky-700",
    iconBackground: "bg-sky-50",
  },
  {
    title: "Payroll",
    href: "#",
    icon: BanknotesIcon,
    iconForeground: "text-yellow-700",
    iconBackground: "bg-yellow-50",
  },
  {
    title: "Submit an expense",
    href: "#",
    icon: ReceiptRefundIcon,
    iconForeground: "text-rose-700",
    iconBackground: "bg-rose-50",
  },
  {
    title: "Training",
    href: "#",
    icon: AcademicCapIcon,
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-50",
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function Dashboard() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-800 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0 lg:grid-cols-3">
      {actions.map((action, actionIdx) => (
        <div
          key={action.title}
          className={classNames(
            actionIdx === 0
              ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
              : "",
            actionIdx === 1 ? "sm:rounded-tr-lg" : "",
            actionIdx === actions.length - 2 ? "sm:rounded-bl-lg" : "",
            actionIdx === actions.length - 1
              ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
              : "",
            "group relative bg-bg p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500",
          )}
        >
          <div className="h-36 w-10/12 mx-auto">
            <TinyLineChart />
          </div>
          <div className="mt-8">
            <h3 className="text-base font-semibold leading-6 text-text">
              <a href={action.href} className="focus:outline-none">
                {/* Extend touch target to entire panel */}
                {/* <span className="absolute inset-0" aria-hidden="true" /> */}
                {action.title}
              </a>
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Doloribus dolores nostrum quia qui natus officia quod et dolorem.
              Sit repellendus qui ut at blanditiis et quo et molestiae.
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
