import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { NarrowWrapper } from "../../NarrowWrapper"
import { Wrapper } from "../../Wrapper"
import { Breadcrumb } from "../../components/Breadcrumb"

import { InputField } from "../../components/InputField"
import { MessageTransition } from "../../components/MessageTransition"
import {
  useResource,
  useResourceList,
  useUpdateResource,
} from "../../hooks/useResources"
import { TextAreaField } from "../../components/TextAreaField"
import { useMessageNavigation } from "../../hooks/useMessageNavigation"

export function Edit() {
  const { message, setMessage } = useMessageNavigation()
  const { data: permissions } = useResourceList("permissions")

  const { roleId } = useParams()
  const { data: role } = useResource("roles", roleId)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const rolePermissions = useMemo(() => {
    if (permissions) {
      return permissions.filter((p) => (role ? p.role_id === role.id : false))
    } else {
      return []
    }
  }, [role, permissions])

  const navigate = useNavigate()
  const updateResource = useUpdateResource("roles")

  useEffect(() => {
    if (role) {
      setName(role.name)
      setDescription(role.description)
    }
  }, [role])

  useEffect(() => {
    if (updateResource.isError) {
      setError({
        status: "danger",
        message: updateResource.error.message,
      })
    }

    if (updateResource.isSuccess) {
      setError(null)
      setSuccess(true)
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
    }

    updateResource.mutate({ id: roleId, data: bodyObject })
  }

  return (
    <div className="border-t border-border pb-16">
      <Wrapper as="header" className="border-b border-border">
        <Breadcrumb
          pages={[
            { name: "Role", href: "/roles" },
            { name: role?.id, href: "#" },
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
                    helperText="Write a few sentences about the role"
                  />
                </div>

                <div className="sm:col-span-4">
                  <div className="text-sm font-medium leading-6 text-text">
                    Permissions
                  </div>

                  <div className="mt-1">
                    {rolePermissions.length > 0 ? (
                      <p className="mt-4 text-sm">
                        <Link
                          className="text-primary hover:underline"
                          to={`/permissions/${roleId}`}
                        >
                          See permissions for this role.
                        </Link>
                      </p>
                    ) : (
                      <p className="mt-4 text-sm">
                        No permissions set for this role yet!{" "}
                        <Link
                          className="text-primary hover:underline"
                          to={`/permissions/${roleId}/create`}
                        >
                          Create one.
                        </Link>
                      </p>
                    )}
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
            <MessageTransition message={message} setMessage={setMessage} />
            {success && (
              <MessageTransition
                message={{status: 'success', message: "Role was edited!"}}
                setMessage={setSuccess}
              />
            )}
          </div>
        </form>
      </NarrowWrapper>
    </div>
  )
}
