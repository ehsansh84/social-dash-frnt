import { useCallback, useEffect, useMemo, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { NarrowWrapper } from "../../NarrowWrapper"
import { Wrapper } from "../../Wrapper"
import { Breadcrumb } from "../../components/Breadcrumb"

import { InlineRadio } from "../../components/InlineRadio"
import { InputField } from "../../components/InputField"
import { MessageTransition } from "../../components/MessageTransition"
import {
  useResource,
  useResourceList,
  useUpdateResource,
} from "../../hooks/useResources"
import { TextAreaField } from "../../components/TextAreaField"
import { CoverInput } from "../../components/CoverInput"
import { LogoInput } from "../../components/LogoInput"
import { ListInput } from "../../components/ListInput"
import { validateHashtag } from "../../utils"
import { useMessageNavigation } from "../../hooks/useMessageNavigation"

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

export function Edit() {
  const { message, setMessage } = useMessageNavigation()

  const { data: schedules } = useResourceList("schedules")

  const { postId } = useParams()
  const { data: post } = useResource("posts", postId)
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

  const postSchedules = useMemo(() => {
    if (schedules) {
      return schedules.filter((s) => (post ? s.post_id === post.id : false))
    } else {
      return []
    }
  }, [post, schedules])

  const [error, setError] = useState(null)

  const updateResource = useUpdateResource("posts")

  const navigate = useNavigate()

  useEffect(() => {
    if (post) {
      setCaption(post.caption)
      setLikes(post.likes)
      setComments(post.comments)
      setPostType(post.postType)
      setStatus(post.status)
      setVideoUrl(post.video_url)
      setCoverUrl(post.cover_url)
      setThumbUrl(post.thumb_url)
      setDateUtc(post.date_utc)
      setPostDate(post.post_date)
      setPostUrl(post.post_url)
      setProfile(post.profile)
      setCaptionHashtags(post.caption_hashtags)
    }
  }, [post])

  useEffect(() => {
    if (updateResource.isError) {
      setError({
        status: "danger",
        message: updateResource.error.message,
      })
    }

    if (updateResource.isSuccess) {
      setError(null)
      navigate("/posts", {
        state: { message: "Post was created!", status: "success" },
      })
    }
  }, [
    updateResource.isError,
    updateResource.isSuccess,
    navigate,
    updateResource.error,
  ])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const bodyObject = {
      caption,
      likes,
      comments,
      post_type:postType,
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

    updateResource.mutate({
      id: postId,
      data: bodyObject,
    })
  }

  return (
    <div className="border-t border-border pb-16">
      <Wrapper as="header" className="border-b border-border">
        <Breadcrumb
          pages={[
            { name: "Post", href: "/posts" },
            { name: post?.id, href: "#" },
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

                <div className="sm:col-span-4">
                  <div className="text-sm font-medium leading-6 text-text">
                    Schedules
                  </div>

                  <div className="mt-1">
                    {postSchedules.length > 0 ? (
                      <p className="mt-4 text-sm">
                        <Link
                          className="text-primary hover:underline"
                          to={`/schedules/${postId}`}
                        >
                          See schedules for this post.
                        </Link>
                      </p>
                    ) : (
                      <p className="mt-4 text-sm">
                        No schedules set for this post.{" "}
                        <Link
                          className="text-primary hover:underline"
                          to={`/schedules/${postId}/create`}
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
          </div>
        </form>
      </NarrowWrapper>
    </div>
  )
}
