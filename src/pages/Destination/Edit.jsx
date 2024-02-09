import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { NarrowWrapper } from "../../NarrowWrapper"
import { Wrapper } from "../../Wrapper"
import { Breadcrumb } from "../../components/Breadcrumb"
import { SocialMediaRadio } from "../../components/SocialMediaRadio"

import { InputField } from "../../components/InputField"
import { LogoInput } from "../../components/LogoInput"
import { MessageTransition } from "../../components/MessageTransition"
import { SelectMenu } from "../../components/SelectMenu"
import { TextAreaField } from "../../components/TextAreaField"
import {
  useResource,
  useResourceList,
  useUpdateResource,
} from "../../hooks/useResources"

export function Edit() {
  const { data } = useResourceList("accounts")
  const accounts = useMemo(() => data ?? [], [data])
  const { destinationId } = useParams()
  const { data: destination } = useResource("destinations", destinationId)
  const [socialMedia, setSocialMedia] = useState("")
  const [name, setName] = useState("")
  const [channel, setChannel] = useState("")
  const [accountId, setAccountId] = useState("")
  const [description, setDescription] = useState("")
  const [logo, setLogo] = useState("")

  const [error, setError] = useState(null)

  const updateResource = useUpdateResource("destinations")

  const navigate = useNavigate()
  const acceptableAccounts = useMemo(
    () =>
      accounts.filter((a) =>
        socialMedia ? a.social_media === socialMedia : true,
      ),
    [socialMedia, accounts],
  )

  useEffect(() => {
    if (destination) {
      setName(destination.name)
      setDescription(destination.description)
      setChannel(destination.channel)
      setSocialMedia(destination.social_media)
      setAccountId(destination.account_id)
      setLogo(destination.logo)
    }
  }, [destination])

  useEffect(() => {
    if (acceptableAccounts.length > 0) {
      setAccountId(acceptableAccounts[0].id)
    } else {
      setAccountId("")
    }
  }, [acceptableAccounts])

  useEffect(() => {
    if (updateResource.isError) {
      setError({
        status: "danger",
        message: updateResource.error.message,
      })
    }

    if (updateResource.isSuccess) {
      setError(null)
      navigate("/destinations", {
        state: { message: "The Destination was edited!", status: "success" },
      })
    }
  }, [
    navigate,
    updateResource.isError,
    updateResource.isSuccess,
    updateResource.error,
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

    if (!logo) {
      setError({ status: "danger", message: "You need to select a logo!" })
      return
    }

    const bodyObject = {
      name,
      channel,
      description,
      social_media: socialMedia,
      account_id: accountId,
      logo,
      user_id: "62d7a781d8f8d7627ce212d5",
    }

    updateResource.mutate({
      id: destinationId,
      data: bodyObject,
    })
  }

  return (
    <div className="border-t border-border pb-16">
      <Wrapper as="header" className="border-b border-border">
        <Breadcrumb
          pages={[
            { name: "Destinations", href: "/destinations" },
            { name: destination?.id, href: "#" },
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
                    placeholder={`My ${socialMedia} destination`}
                    required
                  />
                </div>

                <div className="col-span-full">
                  <SocialMediaRadio
                    socialMedia={socialMedia}
                    setSocialMedia={setSocialMedia}
                  />
                </div>

                <div className="sm:col-span-4">
                  <InputField
                    id="channel"
                    label="Channel"
                    value={channel}
                    setValue={setChannel}
                    placeholder={`my_${socialMedia}_channel`}
                    required
                  />
                </div>

                <div className="sm:col-span-4">
                  <SelectMenu
                    label="Account"
                    options={acceptableAccounts.map((a) => ({
                      id: a.id,
                      name: a.name,
                    }))}
                    setSelected={setAccountId}
                    selected={accountId}
                  />
                </div>

                <div className="sm:col-span-4">
                  <LogoInput image={logo} setImage={logo} />
                </div>

                <div className="col-span-full">
                  <TextAreaField
                    helperText="Write a few sentences about the destination."
                    value={description}
                    setValue={setDescription}
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
