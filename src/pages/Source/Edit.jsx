import { SocialMediaRadio } from "../../components/SocialMediaRadio"
import { NarrowWrapper } from "../../NarrowWrapper"
import { useEffect, useState } from "react"
import { Alert } from "../../components/Alert"
import { Breadcrumb } from "../../components/Breadcrumb"
import { Transition } from "@headlessui/react"
import { Wrapper } from "../../Wrapper"
import { useNavigate, useParams } from "react-router-dom"

import { accounts } from "../../hardcoded"
import { SearchMenu } from "../../components/SearchMenu"
import { sources } from "../../hardcoded"

export function Edit() {
  const { sourceId } = useParams()
  const source = sources.find((s) => s.id === sourceId)

  const [socialMedia, setSocialMedia] = useState(source.social_media)
  const [name, setName] = useState(source.name)
  const [channel, setChannel] = useState(source.channel)
  const [accountId, setAccountId] = useState(source.account_id)
  const [crawlId, setCrawlId] = useState(source.crawl_schedule)
  const [description, setDescription] = useState(source.description)
  const [logo, setLogo] = useState(source.logo)
  const [socialMediaError, setSocialMediaError] = useState(null)

  const [status, setStatus] = useState("unloaded")
  const navigate = useNavigate()
  const acceptableAccounts = accounts.filter((a) =>
    socialMedia ? a.social_media === socialMedia : true,
  )
  const crawlSchedules = [
    { id: "hourly", name: "Hourly" },
    { id: "daily", name: "Daily" },
    { id: "weekly", name: "Weekly" },
    { id: "monthly", name: "Monthly" },
  ]

  useEffect(() => {
    if (socialMedia) {
      setSocialMediaError(null)
    }
  }, [socialMedia])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!socialMedia) {
      setSocialMediaError({
        errorMessage: "You need to select a social media platform",
      })
      return
    }

    setStatus("loading")
    const bodyObject = {
      name,
      channel,
      description,
      social_media: socialMedia,
      user_id: "62d7a781d8f8d7627ce212d5",
    }
    const response = await fetch("http://social.devserver.ir/source/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObject),
    })

    const data = await response.json()
    console.log(data)
    setStatus("unloaded")
  }

  return (
    <div className="border-t border-border">
      <Wrapper as="header" className="border-b border-border">
        <Breadcrumb
          pages={[
            { name: "Source", href: "/sources" },
            { name: source.id, href: "#" },
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
                        placeholder={`My ${socialMedia} source`}
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
                    htmlFor="channel"
                    className="block text-sm font-medium leading-6 text-text"
                  >
                    Channel
                  </label>
                  <div className="mt-2">
                    <div className="relative flex rounded-md shadow-sm ring-1 ring-inset ring-ring focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary sm:max-w-md">
                      <input
                        value={channel}
                        onChange={(e) => {
                          setChannel(e.target.value)
                        }}
                        type="text"
                        name="channel"
                        id="channel"
                        className="block flex-1 border-0 bg-transparent py-1.5 ps-3 text-text placeholder:text-placeholder focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder={`my_${socialMedia}_channel`}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <SearchMenu
                    label="Account"
                    options={acceptableAccounts}
                    setSelected={setAccountId}
                    selected={accountId}
                  />
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="logo"
                    className="block text-sm font-medium leading-6 text-text"
                  >
                    Logo
                  </label>
                  <div className="mt-2">
                    <div className="relative flex rounded-md shadow-sm ring-1 ring-inset ring-ring focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary sm:max-w-md">
                      <input
                        value={logo}
                        onChange={(e) => {
                          setLogo(e.target.value)
                        }}
                        type="text"
                        name="logo"
                        id="logo"
                        className="block flex-1 border-0 bg-transparent py-1.5 ps-3 text-text placeholder:text-placeholder focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder={`My ${socialMedia} logo`}
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
              {status === "loading" ? (
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
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
          <div className="mt-12">
            <Transition
              show={Boolean(socialMediaError)}
              enter="transition-opacity duration-75"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Alert
                status="danger"
                message={socialMediaError?.errorMessage}
                show={Boolean(socialMediaError)}
                setShow={setSocialMediaError}
              />
            </Transition>
          </div>
        </form>
      </NarrowWrapper>
    </div>
  )
}
