import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { NarrowWrapper } from "../../NarrowWrapper"
import { Wrapper } from "../../Wrapper"
import { Breadcrumb } from "../../components/Breadcrumb"
import { SocialMediaRadio } from "../../components/SocialMediaRadio"

import { InputField } from "../../components/InputField"
import { MessageTransition } from "../../components/MessageTransition"
import { SearchMenu } from "../../components/SearchMenu"
import { useCreateResource, useResourceList } from "../../hooks/useResources"

const statuses = [
  { id: "new", name: "New" },
  { id: "sending", name: "Sending" },
  { id: "resending", name: "Resending" },
  { id: "failed", name: "Failed" },
  { id: "sent", name: "Sent" },
]

export function Create() {
  const { postId } = useParams()
  const { data } = useResourceList("accounts")
  const accounts = useMemo(() => data ?? [], [data])

  // form state
  const [socialMedia, setSocialMedia] = useState("")
  const [channel, setChannel] = useState("")
  const [accountId, setAccountId] = useState("")
  const [statusId, setStatusId] = useState("new")
  const [scheduledAt, setScheduledAt] = useState("")
  const [error, setError] = useState(null)

  const createResourceMutation = useCreateResource("schedules")

  const navigate = useNavigate()
  const acceptableAccounts = useMemo(
    () =>
      accounts.filter((a) =>
        socialMedia ? a.social_media === socialMedia : true,
      ),
    [socialMedia, accounts],
  )

  useEffect(() => {
    if (acceptableAccounts.length > 0) {
      setAccountId(acceptableAccounts[0]._id)
    } else {
      setAccountId("")
    }
  }, [acceptableAccounts])

  // useEffect(() => {
  //   if (socialMedia) {
  //     setSocialMediaError(null)
  //   }
  // }, [socialMedia])

  useEffect(() => {
    if (createResourceMutation.isError) {
      setError({
        status: "danger",
        message: createResourceMutation.error.message,
      })
    }

    if (createResourceMutation.isSuccess) {
      setError(null)
      navigate("/schedules", {
        state: { message: "Your schedule was created!", status: "success" },
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
      setError({
        status: "danger",
        message: "You need to select a social media platform!",
      })
      return
    }

    if (!accountId) {
      setError({ status: "danger", message: "You need to select an account!" })
      return
    }

    const bodyObject = {
      social_media: socialMedia,
      account_id: accountId,
      channel,
      scheduled_at: scheduledAt,
      status: statusId,
      post_id: postId,
    }

    createResourceMutation.mutate(bodyObject)
  }

  const resetForm = () => {
    setSocialMedia("")
    setChannel("")
    setAccountId("")
    setStatusId("new")
    setScheduledAt("")
    setError(null)
  }

  return (
    <div className="border-t border-border pb-16">
      <Wrapper as="header" className="border-b border-border">
        <Breadcrumb
          pages={[
            { name: "Schedules", href: "/schedules" },
            { name: "Post: " + postId, href: "/posts/" + postId },
            { name: "Create schedule", href: "#" },
          ]}
        />
      </Wrapper>
      <NarrowWrapper>
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-border pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <SocialMediaRadio
                    socialMedia={socialMedia}
                    setSocialMedia={setSocialMedia}
                  />
                </div>

                <div className="sm:col-span-4">
                  <InputField
                    id="scheduledAt"
                    label="Schedule"
                    value={scheduledAt}
                    setValue={setScheduledAt}
                    type="datetime-local"
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
                  <SearchMenu
                    label="Status"
                    options={statuses}
                    selected={statusId}
                    setSelected={setStatusId}
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
