import { useLocation, useNavigate } from "react-router-dom"
import { IndexPage } from "../IndexPage"
import { SourceList } from "./Components/SourceList"
import { useEffect, useState } from "react"
import { Transition } from "@headlessui/react"
import { Alert } from "../../components/Alert"
import { NarrowWrapper } from "../../NarrowWrapper"

export function Index() {
  const navigate = useNavigate()
  const location = useLocation()
  const [message, setMessage] = useState(() =>
    location.state?.message ? location.state : null,
  )

  useEffect(() => {
    if (location.state?.message) {
      navigate(".", { state: {} })
    }
  }, [location.state?.message, navigate])

  return (
    <IndexPage resourceName="source">
      <SourceList />
      <NarrowWrapper className="mt-12">
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
      </NarrowWrapper>
    </IndexPage>
  )
}
