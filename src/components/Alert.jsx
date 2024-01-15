import {
  CheckCircleIcon,
  XMarkIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid"
import { useEffect, useRef } from "react"

export function Alert({
  status = "success",
  message,
  show,
  setShow,
  messageRef,
}) {
  const statusObject = {
    success: {
      Icon: CheckCircleIcon,
      bg: "bg-green-50",
      icon: "text-green-400",
      message: "text-green-800",
      x: "bg-green-50 text-green-500 hover:bg-green-100 focus:ring-green-600 focus:ring-offset-green-50",
    },
    danger: {
      Icon: ExclamationCircleIcon,
      bg: "bg-red-200",
      icon: "text-red-400",
      message: "text-red-800",
      x: "bg-red-200 text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50",
    },
  }

  const dismissRef = useRef(null)

  // useEffect(() => {
  //   dismissRef.current.focus()
  // }, [])

  const IconComponent = statusObject[status].Icon
  return (
    show && (
      <div className={`rounded-md ${statusObject[status].bg} p-4`}>
        <div className="flex">
          <div className="flex-shrink-0">
            <IconComponent
              className={`h-5 w-5 ${statusObject[status].icon}`}
              aria-hidden="true"
            />
          </div>
          <div className="ms-3">
            <p
              ref={messageRef}
              className={`text-sm font-medium ${statusObject[status].message}`}
              aria-live="assertive"
            >
              {message}
            </p>
          </div>
          <div className="ms-auto ps-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                ref={dismissRef}
                onClick={() => {
                  setShow(null)
                }}
                type="button"
                className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${statusObject[status].x}`}
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  )
}
