import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { NarrowWrapper } from "../../NarrowWrapper"
import { Wrapper } from "../../Wrapper"
import { Breadcrumb } from "../../components/Breadcrumb"
import { SocialMediaRadio } from "../../components/SocialMediaRadio"

import { InputField } from "../../components/InputField"
import { LogoInput } from "../../components/LogoInput"
import { MessageTransition } from "../../components/MessageTransition"
import { SearchMenu } from "../../components/SearchMenu"
import { TextAreaField } from "../../components/TextAreaField"
import {
  useResource,
  useResourceList,
  useUpdateResource,
} from "../../hooks/useResources"
import { InlineRadio } from "../../components/InlineRadio"

const crawlSchedules = [
  { id: "hourly", name: "Hourly" },
  { id: "daily", name: "Daily" },
  { id: "weekly", name: "Weekly" },
  { id: "monthly", name: "Monthly" },
]

const statuses = [
  { id: "enabled", title: "Enabled" },
  { id: "disabled", title: "Disabled" },
]

export function Edit() {
  const { data } = useResourceList("accounts")
  const accounts = useMemo(() => data ?? [], [data])
  const { sourceId } = useParams()
  const { data: source } = useResource("sources", sourceId)

  const [socialMedia, setSocialMedia] = useState("")
  const [name, setName] = useState("")
  const [channel, setChannel] = useState("")
  const [accountId, setAccountId] = useState("")
  const [crawlId, setCrawlId] = useState("hourly")
  const [description, setDescription] = useState("")
  const [logo, setLogo] = useState("")
  const [status, setStatus] = useState("disabled")

  const [error, setError] = useState(null)

  const updateSource = useUpdateResource("sources")

  const navigate = useNavigate()
  const acceptableAccounts = useMemo(
    () =>
      accounts.filter((a) =>
        socialMedia ? a.social_media === socialMedia : true,
      ),
    [socialMedia, accounts],
  )

  useEffect(() => {
    if (source) {
      setName(source.name)
      setDescription(source.description)
      setChannel(source.channel)
      setSocialMedia(source.social_media)
      setAccountId(source.account_id)
      setCrawlId(source.crawl_schedule)
      setLogo(source.logo)
      setLogo(source.status)
    }
  }, [source])

  useEffect(() => {
    if (acceptableAccounts.length > 0) {
      setAccountId(acceptableAccounts[0].id)
    } else {
      setAccountId("")
    }
  }, [acceptableAccounts])

  useEffect(() => {
    if (updateSource.isError) {
      setError({
        status: "danger",
        message: updateSource.error.message,
      })
    }

    if (updateSource.isSuccess) {
      setError(null)
      navigate("/sources", {
        state: { message: "The source was edited!", status: "success" },
      })
    }
  }, [
    navigate,
    updateSource.isError,
    updateSource.isSuccess,
    updateSource.error,
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
      crawl_schedule: crawlId,
      status,
      user_id: "62d7a781d8f8d7627ce212d5",
    }

    updateSource.mutate({
      id: sourceId,
      data: bodyObject,
    })
  }

  const handleLogoChange = (newLogo) => {
    setLogo(newLogo)
  }

  return (
    <div className="border-t border-border pb-16">
      <Wrapper as="header" className="border-b border-border">
        <Breadcrumb
          pages={[
            { name: "Source", href: "/sources" },
            { name: source?.id, href: "#" },
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
                    placeholder={`My ${socialMedia} source`}
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
                  <SearchMenu
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
                  <LogoInput imageUrl={logo} onImageChange={handleLogoChange} />
                </div>

                <div className="col-span-full">
                  <TextAreaField
                    helperText="Write a few sentences about the source."
                    value={description}
                    setValue={setDescription}
                  />
                </div>

                <div className="sm:col-span-4">
                  <SearchMenu
                    label="Crawl schedule"
                    options={crawlSchedules}
                    setSelected={setCrawlId}
                    selected={crawlId}
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
