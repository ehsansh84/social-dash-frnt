import { XMarkIcon } from "@heroicons/react/20/solid"
import { useEffect } from "react"
import FocusLock from "react-focus-lock"
import { RemoveScroll } from "react-remove-scroll"

export function Modal({ title="Modal", handleDismiss, children }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === "Escape") {
        handleDismiss()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleDismiss])

  return (
    <FocusLock returnFocus>
      <RemoveScroll>
        <div className="fixed inset-0 grid place-content-center p-4">
        {/* eslint-disable-next-line */}
          <div
            className="absolute inset-0 bg-gray-500/75"
            onClick={handleDismiss}
          />
          <div className="relative inset-0 rounded-lg bg-white p-8"
          role="dialog" aria-modal="true" aria-label={title}
          >
            <button
              type="button"
              onClick={handleDismiss}
              className="absolute end-0 top-0 h-20 w-20 -translate-y-full cursor-pointer border-none bg-transparent p-4"
            >
              <XMarkIcon />
              <span className="sr-only">Dismiss Modal</span>
            </button>
            {children}
          </div>
        </div>
      </RemoveScroll>
    </FocusLock>
  )
}
