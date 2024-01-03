import { Transition } from "@headlessui/react"
import { Alert } from "./Alert"

export function MessageTransition({ message, setMessage }) {
  return (
    <Transition
      show={Boolean(message)}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Alert
        status={message?.status}
        message={message?.message}
        show={Boolean(message)}
        setShow={setMessage}
      />
    </Transition>
  )
}
