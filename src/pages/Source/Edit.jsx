import { SocialMediaRadio } from "../../components/SocialMediaRadio"
import { NarrowWrapper } from "../../NarrowWrapper"
import { useEffect, useMemo, useState } from "react"
import { Alert } from "../../components/Alert"
import { Breadcrumb } from "../../components/Breadcrumb"
import { Transition } from "@headlessui/react"
import { Wrapper } from "../../Wrapper"
import { useNavigate, useParams } from "react-router-dom"

import { SearchMenu } from "../../components/SearchMenu"
import {
  useResource,
  useResourceList,
  useUpdateResource,
} from "../../hooks/useResources"
import { TextAreaField } from "../../components/TextAreaField"
import { InputField } from "../../components/InputField"
import { LogoInput } from "../../components/LogoInput"

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
  const [socialMediaError, setSocialMediaError] = useState(null)
  const [accountError, setAccountError] = useState(null)
  const [requestError, setRequestError] = useState(null)
  const [logoError, setLogoError] = useState(null)
  const updateSource = useUpdateResource("sources")

  const navigate = useNavigate()
  const acceptableAccounts = useMemo(
    () =>
      accounts.filter((a) =>
        socialMedia ? a.social_media === socialMedia : true,
      ),
    [socialMedia, accounts],
  )

  const crawlSchedules = [
    { id: "hourly", name: "Hourly" },
    { id: "daily", name: "Daily" },
    { id: "weekly", name: "Weekly" },
    { id: "monthly", name: "Monthly" },
  ]

  useEffect(() => {
    if (source) {
      setName(source.name)
      setDescription(source.description)
      setChannel(source.channel)
      setSocialMedia(source.social_media)
      setAccountId(source.account_id)
      setCrawlId(source.crawl_schedule)
      setLogo(source.logo)
    }
  }, [source])

  useEffect(() => {
    if (acceptableAccounts.length > 0) {
      setAccountId(acceptableAccounts[0]._id)
    } else {
      setAccountId("")
    }
  }, [acceptableAccounts])

  useEffect(() => {
    if (socialMedia) {
      setSocialMediaError(null)
    }
  }, [socialMedia])

  useEffect(() => {
    if (updateSource.isError) {
      setRequestError({
        errorMessage: updateSource.error.message,
      })
    }

    if (updateSource.isSuccess) {
      setRequestError(null)
      navigate("/sources", {
        state: { message: "Your source was edited!", status: "success" },
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
      setSocialMediaError({
        errorMessage: "You need to select a social media platform!",
      })
      return
    }

    if (!accountId) {
      setAccountError({
        errorMessage: "You need to select an account!",
      })
      return
    }

    if (!logo) {
      setLogoError({
        errorMessage: "You need to select a logo!",
      })
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
      user_id: "62d7a781d8f8d7627ce212d5",
    }

    updateSource.mutate({
      _id: sourceId,
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
            { name: source?._id, href: "#" },
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
                      id: a._id,
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
            <Transition
              show={Boolean(
                socialMediaError || accountError || logoError || requestError,
              )}
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
                  socialMediaError?.errorMessage ||
                  accountError?.errorMessage ||
                  requestError?.errorMessage ||
                  logoError?.errorMessage
                }
                show={Boolean(
                  socialMediaError || accountError || logoError || requestError,
                )}
                setShow={(v) => {
                  setSocialMediaError(v)
                  setRequestError(v)
                  setLogoError(v)
                  setAccountError(v)
                }}
              />
            </Transition>
          </div>
        </form>
      </NarrowWrapper>
    </div>
  )
}
