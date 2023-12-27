import { Transition } from "@headlessui/react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Wrapper } from "../../Wrapper"
import { Alert } from "../../components/Alert"
import { IndexPage } from "../IndexPage"
import { AccountList } from "./Components/AccountList"

export function Index() {
  const navigate = useNavigate()
  const location = useLocation()
  const [message, setMessage] = useState(() =>
    location.state?.message ? location.state : null,
  )

  console.log(message)

  useEffect(() => {
    if (location.state?.message) {
      navigate(".", { state: {} })
    }
  }, [location.state?.message, navigate])

  return (
    <IndexPage resourceName="account">
      <Wrapper>
        <AccountList setMessage={setMessage} />
        <div className="mt-12">
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
        </div>
      </Wrapper>
    </IndexPage>
  )
}
