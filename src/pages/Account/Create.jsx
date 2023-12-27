import { Transition } from "@headlessui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { NarrowWrapper } from "../../NarrowWrapper"
import { Wrapper } from "../../Wrapper"
import { Alert } from "../../components/Alert"
import { Breadcrumb } from "../../components/Breadcrumb"
import { SocialMediaRadio } from "../../components/SocialMediaRadio"
import { useCreateResource } from "../../hooks/useResources"

export function Create() {
  const [socialMedia, setSocialMedia] = useState("")
  const [name, setName] = useState("")
  const [token, setToken] = useState("")
  const [description, setDescription] = useState("")
  const [socialMediaError, setSocialMediaError] = useState(null)
  const [requestError, setRequestError] = useState(null)

  const navigate = useNavigate()

  const createResourceMutation = useCreateResource("accounts")

  useEffect(() => {
    if (socialMedia) {
      setSocialMediaError(null)
    }
  }, [socialMedia])

  useEffect(() => {
    if (createResourceMutation.isError) {
      setRequestError({
        errorMessage: createResourceMutation.error.message,
      })
    }

    if (createResourceMutation.isSuccess) {
      setRequestError(null)
      navigate("/accounts", {
        state: { message: "Your account was created!", status: "success" },
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

    if (!socialMedia) {
      setSocialMediaError({
        errorMessage: "You need to select a social media platform!",
      })
      return
    }

    const bodyObject = {
      name,
      token,
      description,
      social_media: socialMedia,
      user_id: "62d7a781d8f8d7627ce212d5",
    }

    createResourceMutation.mutate(bodyObject)
  }

  return (
    <div className="border-t border-border">
      <Wrapper as="header" className="border-b border-border">
        <Breadcrumb
          pages={[
            { name: "Accounts", href: "/accounts" },
            { name: "Create", href: "/accounts/create" },
          ]}
        />
      </Wrapper>
      <NarrowWrapper>
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-border pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-text"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <div className="relative flex rounded-md shadow-sm ring-1 ring-inset ring-ring focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary sm:max-w-md">
                      <input
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value)
                        }}
                        type="text"
                        name="name"
                        id="name"
                        className="block flex-1 border-0 bg-transparent py-1.5 ps-3 text-text placeholder:text-placeholder focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder={`My ${socialMedia} account`}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <SocialMediaRadio
                    socialMedia={socialMedia}
                    setSocialMedia={setSocialMedia}
                  />
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="token"
                    className="block text-sm font-medium leading-6 text-text"
                  >
                    Token
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-ring focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary sm:max-w-md">
                      <input
                        value={token}
                        onChange={(e) => {
                          setToken(e.target.value)
                        }}
                        type="text"
                        name="token"
                        id="token"
                        className="block flex-1 border-0 bg-transparent py-1.5 ps-3 text-text placeholder:text-placeholder focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="My account token"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-text"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value)
                      }}
                      id="description"
                      name="description"
                      rows={3}
                      className="block w-full rounded-md border-0 bg-bg py-1.5 text-text shadow-sm ring-1 ring-inset ring-ring placeholder:text-placeholder focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about the source.
                  </p>
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
              onClick={() => {
                setName("")
                setSocialMediaError(null)
                setToken("")
                setDescription("")
              }}
            >
              Reset
            </button>
            <button
              type="submit"
              className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              {createResourceMutation.isPending ? (
                <div
                  className="inline-block h-4 w-4 mx-2 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
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
          <div className="mt-12">
            <Transition
              show={Boolean(socialMediaError || requestError)}
              enter="transition-opacity duration-75"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Alert
                status="danger"
                message={
                  socialMediaError?.errorMessage || requestError?.errorMessage
                }
                show={Boolean(socialMediaError || requestError)}
                setShow={(v) => {
                  setSocialMediaError(v)
                  setRequestError(v)
                }}
              />
            </Transition>
          </div>
        </form>
      </NarrowWrapper>
    </div>
  )
}
