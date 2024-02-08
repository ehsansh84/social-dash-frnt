import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { NarrowWrapper } from "../../NarrowWrapper"
import { Wrapper } from "../../Wrapper"
import { Breadcrumb } from "../../components/Breadcrumb"
import { InputField } from "../../components/InputField"
import { MessageTransition } from "../../components/MessageTransition"
import { SocialMediaRadio } from "../../components/SocialMediaRadio"
import { TextAreaField } from "../../components/TextAreaField"
import { useResource, useUpdateResource } from "../../hooks/useResources"

export function Edit() {
  const { accountId } = useParams()
  const { data: account } = useResource("accounts", accountId)
  const updateAccount = useUpdateResource("accounts")

  const [socialMedia, setSocialMedia] = useState("")
  const [name, setName] = useState("")
  const [token, setToken] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState(null)

  const navigate = useNavigate()


  useEffect(() => {
    if (account) {
      setName(account.name)
      setDescription(account.description)
      setToken(account.token)
      setSocialMedia(account.social_media)
    }
  }, [account])

  useEffect(() => {
    if (updateAccount.isError) {
      setError({
        status: "danger",
        message: updateAccount.error.message,
      })
    }

    if (updateAccount.isSuccess) {
      setError(null)
      navigate("/accounts", {
        state: { message: "Account was edited!", status: "success" },
      })
    }
  }, [
    navigate,
    updateAccount.isError,
    updateAccount.isSuccess,
    updateAccount.error,
  ])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!socialMedia) {
      setError({
        status: "danger",
        message: "You need to select a social media platform!",
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
    updateAccount.mutate({ id: accountId, data: bodyObject })
  }

  return (
    <div className="border-t border-border">
      <Wrapper as="header" className="border-b border-border">
        <Breadcrumb
          pages={[
            { name: "Accounts", href: "/accounts" },
            { name: accountId, href: "#" },
          ]}
        />
      </Wrapper>
      <NarrowWrapper>
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-border pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <InputField
                    id="name"
                    label="Name"
                    placeholder={`My ${socialMedia} account`}
                    value={name}
                    setValue={setName}
                    required
                  />
                </div>

                <div className="col-span-full">
                  <SocialMediaRadio
                    socialMedia={socialMedia}
                    setSocialMedia={setSocialMedia}
                  />
                </div>

                <div className="sm:col-span-3">
                  <InputField
                    id="token"
                    label="Token"
                    placeholder="My account token"
                    value={token}
                    setValue={setToken}
                    required
                  />
                </div>

                <div className="col-span-4">
                  <TextAreaField
                    id="description"
                    label="Description"
                    value={description}
                    setValue={setDescription}
                    helperText="Write a few sentences about the source."
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
              {updateAccount.isPending ? (
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
