import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { NarrowWrapper } from "../../NarrowWrapper"
import { Wrapper } from "../../Wrapper"
import { Breadcrumb } from "../../components/Breadcrumb"

import { InlineRadio } from "../../components/InlineRadio"
import { InputField } from "../../components/InputField"
import { InputPhone } from "../../components/InputPhone"
import { MessageTransition } from "../../components/MessageTransition"
import { SelectMenu } from "../../components/SelectMenu"
import {
  useResource,
  useResourceList,
  useUpdateResource,
} from "../../hooks/useResources"
import { LogoInput } from "../../components/LogoInput"

const statuses = [
  { id: "enabled", title: "Enabled" },
  { id: "disabled", title: "Disabled" },
]

export function Edit() {
  const { userId } = useParams()
  const { data: user } = useResource("users", userId)

  const [name, setName] = useState("")
  const [family, setFamily] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [role, setRole] = useState("")
  const [status, setStatus] = useState("enabled")
  const [pic, setPic] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")

  const [error, setError] = useState(null)

  const updateSource = useUpdateResource("users")
  const { data } = useResourceList("roles")
  let roles = useMemo(() => data ?? [], [data])
  roles = roles.map((r) => ({ id: r.id, name: r.name }))
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      setName(user.name)
      setFamily(user.family)
      setEmail(user.email)
      setMobile(user.mobile)
      setRole(user.role_id)
      setStatus(user.status)
      setPic(user.pic)
      setUsername(user.username)
    }
  }, [user])

  useEffect(() => {
    if (updateSource.isError) {
      setError({
        status: "danger",
        message: updateSource.error.message,
      })
    }

    if (updateSource.isSuccess) {
      setError(null)
      navigate("/users", {
        state: { message: "User was edited!", status: "success" },
      })
    }
  }, [
    updateSource.isError,
    updateSource.isSuccess,
    navigate,
    updateSource.error,
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

    if (password !== confirm) {
      setError({
        status: "danger",
        message: "Passwords do not match!",
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
      role_id: role,
    }

    updateSource.mutate({
      id: userId,
      data: bodyObject,
    })
  }

  const handlePicChange = (newPic) => {
    setPic(newPic)
  }

  return (
    <div className="border-t border-border pb-16">
      <Wrapper as="header" className="border-b border-border">
        <Breadcrumb
          pages={[
            { name: "User", href: "/users" },
            { name: user?.username, href: "#" },
          ]}
        />
      </Wrapper>
      <NarrowWrapper>
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-border pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full flex items-center gap-x-8">
                  <LogoInput image={pic} setImage={setPic} label="Profile Image" />
                </div>

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
                    id="username"
                    label="Username"
                    value={username}
                    setValue={setUsername}
                    placeholder="Username"
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

                <div className="sm:col-span-4">
                  <SelectMenu
                    label="Role"
                    options={roles}
                    setSelected={setRole}
                    selected={role}
                  />
                </div>

                <div className="sm:col-span-4">
                  <InlineRadio
                    label="Status"
                    name="status"
                    selectedOption={status}
                    options={statuses}
                    setSelectedOption={setStatus}
                  />
                </div>

                <div className="sm:col-span-4">
                  <InputField
                    id="password"
                    label="Password"
                    value={password}
                    setValue={setPassword}
                    type="password"
                    required
                  />
                </div>

                <div className="sm:col-span-4">
                  <InputField
                    id="confirm"
                    label="Confirm Password"
                    value={confirm}
                    setValue={setConfirm}
                    type="password"
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
              type="submit"
              className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              {updateSource.isPending ? (
                <div
                  className="mx-2 inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              ) : (
                <p>Edit</p>
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
