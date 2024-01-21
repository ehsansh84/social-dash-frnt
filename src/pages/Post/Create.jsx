import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { NarrowWrapper } from "../../NarrowWrapper"
import { Wrapper } from "../../Wrapper"
import { Breadcrumb } from "../../components/Breadcrumb"

import { InlineRadio } from "../../components/InlineRadio"
import { InputField } from "../../components/InputField"
import { MessageTransition } from "../../components/MessageTransition"
import { useCreateResource } from "../../hooks/useResources"
import { TextAreaField } from "../../components/TextAreaField"
import { CoverInput } from "../../components/CoverInput"
import { LogoInput } from "../../components/LogoInput"
import { ListInput } from "../../components/ListInput"
import { validateHashtag } from "../../utils"

const statuses = [
  { id: "new", title: "Enabled" },
  { id: "thumb_created", title: "Thumb created" },
  { id: "uploaded_to_channel", title: "Uploaded to the channel" },
]

const postTypes = [
  { id: "image", title: "Image" },
  { id: "video", title: "Video" },
  { id: "gallery", title: "Gallery" },
  { id: "text", title: "Text" },
]

export function Create() {
  const [caption, setCaption] = useState("")
  const [likes, setLikes] = useState(0)
  const [comments, setComments] = useState(0)
  const [postType, setPostType] = useState("image")
  const [status, setStatus] = useState("new")
  const [videoUrl, setVideoUrl] = useState("")
  const [coverUrl, setCoverUrl] = useState("")
  const [thumbUrl, setThumbUrl] = useState("")
  const [dateUtc, setDateUtc] = useState("")
  const [postDate, setPostDate] = useState("")
  const [postUrl, setPostUrl] = useState("")
  const [profile, setProfile] = useState("")
  const [captionHashtags, setCaptionHashtags] = useState([])

  const memoizedValidateHashtag = useCallback(validateHashtag, [])

  const [error, setError] = useState(null)

  const createResourceMutation = useCreateResource("posts")

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
      navigate(`/posts/${createResourceMutation?.data?.data?.id}/edit`, {
        state: { message: "Post was created!", status: "success" },
      })
    }
  }, [
    createResourceMutation.isError,
    createResourceMutation.isSuccess,
    navigate,
    createResourceMutation.error,
    createResourceMutation.data?.data?.id
  ])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const bodyObject = {
      caption,
      likes,
      comments,
      postType,
      status,
      video_url: videoUrl,
      cover_url: coverUrl,
      thumb_url: thumbUrl,
      user_id: "62d7a781d8f8d7627ce212d5",
      date_utc: dateUtc,
      post_date: postDate,
      post_url: postUrl,
      profile,
      caption_hashtags: captionHashtags,
    }

    createResourceMutation.mutate(bodyObject, {
      "Content-Type": "multipart/form-data",
    })
  }

  const resetForm = () => {
    setCaption("")
    setLikes(0)
    setComments(0)
    setPostType("image")
    setStatus("new")
    setVideoUrl("")
    setCoverUrl("")
    setThumbUrl("")
    setDateUtc("")
    setPostDate("")
    setPostUrl("")
    setProfile("")
    setCaptionHashtags([])
  }

  return (
    <div className="border-t border-border pb-16">
      <Wrapper as="header" className="border-b border-border">
        <Breadcrumb
          pages={[
            { name: "Post", href: "/posts" },
            { name: "Create", href: "/posts/create" },
          ]}
        />
      </Wrapper>
      <NarrowWrapper>
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-border pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <InlineRadio
                    label="Post type"
                    name="postType"
                    selectedOption={postType}
                    options={postTypes}
                    setSelectedOption={setPostType}
                  />
                </div>

                <div className="col-span-full">
                  <CoverInput imageUrl={coverUrl} onImageChange={setCoverUrl} />
                </div>

                <div className="sm:col-span-4">
                  <TextAreaField
                    id="caption"
                    label="Caption"
                    value={caption}
                    setValue={setCaption}
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

                <div className="sm:col-span-4">
                  <ListInput
                    id="captionHashtags"
                    label="Caption hashtags"
                    items={captionHashtags}
                    setItems={setCaptionHashtags}
                    validateCallback={memoizedValidateHashtag}
                  />
                </div>

                <div className="sm:col-span-4">
                  <InputField
                    label="Likes"
                    id="likes"
                    setValue={setLikes}
                    value={likes}
                    type="number"
                    min="0"
                  />
                </div>

                <div className="sm:col-span-4">
                  <InputField
                    label="Comments"
                    id="comments"
                    setValue={setComments}
                    value={comments}
                    type="number"
                    min="0"
                  />
                </div>
                <div className="sm:col-span-4">
                  <InputField
                    label="Video Url"
                    id="videoUrl"
                    setValue={setVideoUrl}
                    value={videoUrl}
                    type="url"
                  />
                </div>

                <div className="sm:col-span-4">
                  <LogoInput
                    imageUrl={thumbUrl}
                    onImageChange={setThumbUrl}
                    label="Thumbnail"
                  />
                </div>

                <div className="sm:col-span-4">
                  <InputField
                    id="postDate"
                    label="Post date"
                    value={postDate}
                    setValue={setPostDate}
                    type="datetime-local"
                    required
                  />
                </div>

                <div className="sm:col-span-4">
                  <InputField
                    id="dateUtc"
                    label="Date UTC"
                    value={dateUtc}
                    setValue={setDateUtc}
                    type="datetime-local"
                    required
                  />
                </div>

                <div className="sm:col-span-4">
                  <InputField
                    id="postUrl"
                    label="Post url"
                    value={postUrl}
                    setValue={setPostUrl}
                    type="url"
                  />
                </div>

                <div className="sm:col-span-4">
                  <InputField
                    id="profile"
                    label="Profile"
                    value={profile}
                    setValue={setProfile}
                    type="url"
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
