import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import { Link } from "react-router-dom"
import { useResourceList } from "../../../hooks/useResources"
import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { capitalize, classNames } from "../../../utils"
import { Wrapper } from "../../../Wrapper"

const statuses = {
  new: "New",
  thumb_created: "Thumb created",
  uploaded_to_channel: "Uploaded to the channel",
}

export function PostList() {
  const { data } = useResourceList("posts")
  const posts = data ?? []
  return (
    <Wrapper className="space-y-8 pb-8">
      {/* <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0"> */}
      {posts.map((post) => (
        <div
          key={post.id}
          className="border-b border-t border-gray-200 bg-bg-card text-text shadow-sm dark:border-gray-800 rounded-lg border"
        >
          <h3 className="sr-only">
            Post created at{" "}
            <time dateTime={post.created_at}>{post.created_at}</time>
          </h3>

          <div className="flex items-start sm:items-center border-b border-gray-200 p-6 dark:border-gray-800">
            <dl className="flex flex-1 flex-col items-baseline justify-start gap-4 text-sm sm:flex-row sm:gap-6">
              <div>
                <dt className="font-medium text-text">Post ID</dt>
                <dd className="mt-1 text-gray-500">{post.id}</dd>
              </div>
              <div>
                <dt className="font-medium text-text">Post Type</dt>
                <dd className="mt-1 text-gray-500">
                  {capitalize(post.post_type)}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-text">Post Date</dt>
                <dd className="mt-1 text-gray-500">
                  <time dateTime={post.post_date}>
                    {capitalize(post.post_date)}
                  </time>
                </dd>
              </div>
            </dl>

            <Menu as="div" className="relative flex justify-end md:hidden">
              <div className="flex items-center">
                <Menu.Button className="-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Options for post {post.id}</span>
                  <EllipsisVerticalIcon
                    className="h-6 w-6"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-bottom-right rounded-md bg-bg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:ring-white">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={`/posts/${post.id}/edit`}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-text dark:bg-gray-800"
                              : "text-gray-700 dark:text-gray-300",
                            "block px-4 py-2 text-sm",
                          )}
                        >
                          Post
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={`schedules/${post.id}`}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-text dark:bg-gray-800"
                              : "text-gray-700 dark:text-gray-300",
                            "block px-4 py-2 text-sm",
                          )}
                        >
                          Schedules
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <div className="hidden md:col-span-2 md:flex md:items-center md:justify-end md:space-x-4">
              <Link
                to={`/posts/${post.id}/edit`}
                className="flex items-center justify-center rounded-md border border-border bg-primary-900 px-2.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <span>View Post</span>
                <span className="sr-only">{post.id}</span>
              </Link>
              <Link
                to={`/schedules/${post.id}`}
                className="flex items-center justify-center rounded-md border border-border bg-primary-900 px-2.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <span>View Schedules</span>
                <span className="sr-only">for post {post.id}</span>
              </Link>
            </div>
          </div>

          <div role="list" className="divide-y divide-gray-200">
            <div className="p-4 sm:p-6">
              <div className="flex items-center sm:items-start">
                <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
                  <img
                    src={post.thumb_url}
                    alt="Post Thumbnail"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ms-12 flex-1 text-sm">
                  <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                    <h5>{post.name}</h5>
                    <p className="mt-2 sm:mt-0">{post.price}</p>
                  </div>
                  <p className="text-gray-500 sm:mt-2 sm:block">
                    {post.caption}
                  </p>
                </div>
              </div>

              <div className="mt-6 sm:flex sm:justify-between">
                <div className="flex items-center">
                  <p className="ml-2 text-sm font-medium text-gray-500">
                    Status:{" "}
                    <span className="text-primary-600">
                      {statuses[post.status]}
                    </span>
                  </p>
                </div>

                <div className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0">
                  <div className="flex flex-1 justify-center">
                    {post.caption_hashtags.map((c) => (
                      <span
                        key={c}
                        className="whitespace-nowrap text-primary-600 hover:text-primary-500"
                      >
                        {c}&nbsp;
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Wrapper>
  )
}
