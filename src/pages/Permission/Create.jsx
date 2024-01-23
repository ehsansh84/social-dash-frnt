import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { NarrowWrapper } from "../../NarrowWrapper"
import { Wrapper } from "../../Wrapper"
import { Breadcrumb } from "../../components/Breadcrumb"

import { InputField } from "../../components/InputField"
import { MessageTransition } from "../../components/MessageTransition"
import {
  useCreateResource,
  useResource,
  useResourceList,
} from "../../hooks/useResources"
import { TextAreaField } from "../../components/TextAreaField"
import { SelectMenu } from "../../components/SelectMenu"
import { InlineRadio } from "../../components/InlineRadio"

const routes = [
  { id: "/source", name: "/source" },
  { id: "/account", name: "/account" },
  { id: "/user", name: "/user" },
]
const commonPermissions = [
  { id: "yes", title: "Yes" },
  { id: "no", title: "No" },
  { id: "yes_limited", title: "Limited" },
]
const postPermissions = [
  { id: "yes", title: "Yes" },
  { id: "no", title: "No" },
]

export function Create() {
  const { roleId } = useParams()
  const { data: role } = useResource("roles", roleId)

  // getting all permissions then filtering for the current role
  // this should be done on the backend
  const { data: permissions } = useResourceList("permissions")
  const rolePermissions = permissions?.filter((p) => p.role_id === roleId) ?? []
  const routesDefined = rolePermissions.map((r) => r.route)
  const allowedRoutes = routes.filter((r) => !routesDefined.includes(r.id))

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [routeId, setRouteId] = useState(routes[0].id)
  const [get, setGet] = useState("no")
  const [post, setPost] = useState("no")
  const [put, setPut] = useState("no")
  const [destroy, setDestroy] = useState("no")

  const [error, setError] = useState(null)

  const createResourceMutation = useCreateResource("permissions")
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
      navigate(`/permissions/${roleId}`, {
        state: { message: "Permission was created!", status: "success" },
      })
    }
  }, [
    createResourceMutation.isError,
    createResourceMutation.isSuccess,
    navigate,
    createResourceMutation.error,
    roleId,
  ])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const bodyObject = {
      name,
      description,
      role_id: roleId,
      route: routeId,
      get,
      post,
      put,
      delete: destroy,
    }

    createResourceMutation.mutate(bodyObject)
  }

  const resetForm = () => {
    setName("")
    setDescription("")
    setRouteId(routes[0].id)
    setGet("no")
    setPost("no")
    setPut("no")
    setDestroy("no")
    setError(null)
  }

  return (
    <div className="border-t border-border pb-16">
      <Wrapper as="header" className="border-b border-border">
        <Breadcrumb
          pages={[
            { name: "Permissions", href: "/permissions" },
            { name: "Role: " + role?.name, href: "/roles/" + roleId + "/edit" },
            { name: "Create permission", href: "#" },
          ]}
        />
      </Wrapper>
      <NarrowWrapper>
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-border pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4 md:max-w-md">
                  <InputField
                    id="name"
                    label="Name"
                    value={name}
                    setValue={setName}
                    placeholder="Name"
                    required
                  />
                </div>

                <div className="col-span-full lg:max-w-xl">
                  <TextAreaField
                    value={description}
                    setValue={setDescription}
                    helperText="Write a few sentences about the permission"
                  />
                </div>

                <div className="sm:col-span-4">
                  <SelectMenu
                    label="Route"
                    options={allowedRoutes}
                    setSelected={setRouteId}
                    selected={routeId}
                  />

                  <div className="mt-8 sm:col-span-4">
                    <InlineRadio
                      label="GET Permission"
                      name="get"
                      selectedOption={get}
                      options={commonPermissions}
                      setSelectedOption={setGet}
                    />
                  </div>

                  <div className="mt-8 sm:col-span-4">
                    <InlineRadio
                      label="POST Permission"
                      name="post"
                      selectedOption={post}
                      options={postPermissions}
                      setSelectedOption={setPost}
                    />
                  </div>

                  <div className="mt-8 sm:col-span-4">
                    <InlineRadio
                      label="PUT Permission"
                      name="put"
                      selectedOption={put}
                      options={commonPermissions}
                      setSelectedOption={setPut}
                    />
                  </div>

                  <div className="mt-8 sm:col-span-4">
                    <InlineRadio
                      label="Delete Permission"
                      name="destroy"
                      selectedOption={destroy}
                      options={commonPermissions}
                      setSelectedOption={setDestroy}
                    />
                  </div>
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
