import { NarrowWrapper } from "../../NarrowWrapper"
import { useEffect, useState } from "react"
import { Breadcrumb } from "../../components/Breadcrumb"
import { Wrapper } from "../../Wrapper"
import { useNavigate } from "react-router-dom"

import { useCreateResource } from "../../hooks/useLocalResources"
import { InputField } from "../../components/InputField"
import { MessageTransition } from "../../components/MessageTransition"
import { InputPhone } from "../../components/InputPhone"

const roles = [
  { id: "admin", name: "Admin" },
  { id: "normal", name: "Normal User" },
]

const statuses = [
  { id: "enabled", name: "Enabled" },
  { id: "disabled", name: "Disabled" },
]

export function Create() {
  const [name, setName] = useState("")
  const [family, setFamily] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [role, setRole] = useState("admin")
  const [status, setStatus] = useState("enabled")
  const [pic, setPic] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")

  const [error, setError] = useState(null)

  const createResourceMutation = useCreateResource("users")

  const navigate = useNavigate()

  useEffect(() => {
    if (createResourceMutation.isError) {
      setError({
        status: "danger",
        message: createResourceMutation.error.message,
      })
    }

    if (createResourceMutation.isSuccess) {
      setError(null)
      navigate("/sources", {
        state: { message: "User was created!", status: "success" },
      })
    }
  }, [
    createResourceMutation.isError,
    createResourceMutation.isSuccess,
    navigate,
    createResourceMutation.error,
  ])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!pic) {
      setError({
        status: "danger",
        message: "You need to select a profile picture!",
      })
      return
    }

    const bodyObject = {
      name,
      family,
      email,
      mobile,
      password,
      username,
      pic,
      status,
      role,
    }

    createResourceMutation.mutate(bodyObject, {
      "Content-Type": "multipart/form-data",
    })
  }

  const handleLogoChange = (newPic) => {
    setPic(newPic)
  }

  const resetForm = () => {
    setName("")
    setFamily("")
    setEmail("")
    setMobile("")
    setRole("admin")
    setPic("")
    setStatus("enabled")
    setUsername("")
    setPassword("")
    setConfirm("")
    setError(null)
  }

  return (
    <div className="border-t border-border pb-16">
      <Wrapper as="header" className="border-b border-border">
        <Breadcrumb
          pages={[
            { name: "Source", href: "/sources" },
            { name: "Create", href: "/sources/create" },
          ]}
        />
      </Wrapper>
      <NarrowWrapper>
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-border pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <InputField
                    id="name"
                    label="Name"
                    value={name}
                    setValue={setName}
                    placeholder="Name"
                    required
                  />
                </div>

                <div className="sm:col-span-4">
                  <InputField
                    id="family"
                    label="Last Name"
                    value={family}
                    setValue={setFamily}
                    placeholder="Last Name"
                    required
                  />
                </div>

                <div className="sm:col-span-4">
                  <InputField
                    id="email"
                    label="Email"
                    value={email}
                    setValue={setEmail}
                    placeholder="you@example.com"
                    type="email"
                    required
                  />
                </div>

                <div className="sm:col-span-4">
                  <InputPhone
                    id="mobile"
                    label="Mobile"
                    value={mobile}
                    setValue={setMobile}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-text"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

            <button
              type="button"
              className="text-sm font-semibold leading-6 text-text"
              onClick={resetForm}
            >
              Reset
            </button>
            <button
              type="submit"
              className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              {createResourceMutation.isPending ? (
                <div
                  className="mx-2 inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              ) : (
                <p>Save</p>
              )}
            </button>
          </div>
          <div className="my-12">
            <MessageTransition message={error} setMessage={setError} />
          </div>
        </form>
      </NarrowWrapper>
    </div>
  )
}
