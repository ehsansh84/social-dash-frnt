import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { NarrowWrapper } from "../../NarrowWrapper"
import { Wrapper } from "../../Wrapper"
import { Breadcrumb } from "../../components/Breadcrumb"

import { InputField } from "../../components/InputField"
import { MessageTransition } from "../../components/MessageTransition"
import {
  useResource,
  useUpdateResource,
} from "../../hooks/useResources"
import { TextAreaField } from "../../components/TextAreaField"
import { SearchMenu } from "../../components/SearchMenu"
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

export function Edit() {
  const { permissionId } = useParams()
  const { data: permission } = useResource("permissions", permissionId)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [routeId, setRouteId] = useState(routes[0].id)
  const [get, setGet] = useState("no")
  const [post, setPost] = useState("no")
  const [put, setPut] = useState("no")
  const [destroy, setDestroy] = useState("no")

  const [roleId, setRoleId] = useState("")

  const [error, setError] = useState(null)

  const updateResource = useUpdateResource("permissions")
  const navigate = useNavigate()

  useEffect(() => {
    if (permission) {
      setName(permission.name)
      setDescription(permission.description)
      setRouteId(permission.route)
      setGet(permission.get)
      setPost(permission.post)
      setPut(permission.put)
      setDestroy(permission["delete"])
      setRoleId(permission.role_id)
    }
  }, [permission])

  useEffect(() => {
    if (updateResource.isError) {
      setError({
        status: "danger",
        message: updateResource.error.message,
      })
    }

    if (updateResource.isSuccess) {
      setError(null)
      navigate(`/permissions/${roleId}`, {
        state: { message: "Permission has been edited!", status: "success" },
      })
    }
  }, [
    updateResource.isError,
    updateResource.isSuccess,
    navigate,
    updateResource.error,
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

    updateResource.mutate({ id: permissionId, data: bodyObject })
  }

  return (
    <div className="border-t border-border pb-16">
      <Wrapper as="header" className="border-b border-border">
        <Breadcrumb
          pages={[
            { name: "Permissions", href: "/permissions" },
            { name: "Role: " + permission?.role_id, href: "/roles/" + roleId },
            { name: permission?.id, href: "#" },
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
                  <SearchMenu
                    label="Route"
                    options={routes}
                    setSelected={setRouteId}
                    selected={routeId}
                    disabled
                  />
                </div>
                <div className="sm:col-span-4">
                  <InlineRadio
                    label="GET Permission"
                    name="get"
                    selectedOption={get}
                    options={commonPermissions}
                    setSelectedOption={setGet}
                  />
                </div>

                <div className="sm:col-span-4">
                  <InlineRadio
                    label="POST Permission"
                    name="post"
                    selectedOption={post}
                    options={postPermissions}
                    setSelectedOption={setPost}
                  />
                </div>

                <div className="sm:col-span-4">
                  <InlineRadio
                    label="PUT Permission"
                    name="put"
                    selectedOption={put}
                    options={commonPermissions}
                    setSelectedOption={setPut}
                  />
                </div>

                <div className="sm:col-span-4">
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
              {updateResource.isPending ? (
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
