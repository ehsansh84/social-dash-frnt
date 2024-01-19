import { Menu, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import { Fragment, useEffect, useMemo } from "react"
import { Link, useParams } from "react-router-dom"
import { Wrapper } from "../../../Wrapper"
import { socialMediaDictionary } from "../../../components/SocialMedia"
import {
  useDeleteResource,
  useResource,
  useResourceList,
} from "../../../hooks/useResources"
import { classNames } from "../../../utils"
import { Loading } from "../../../components/Loading"

const statuses = {
  new: "text-green-700 bg-green-50 ring-green-600/20",
  sending: "text-gray-600 bg-gray-50 ring-gray-500/10",
  resending: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
  failed: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
  sent: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
}

export function ScheduleList({ setMessage }) {
  const { postId } = useParams()
  const { data: schedules } = useResourceList("schedules")

  const { data: post } = useResource("posts", postId)

  const deleteScheduleMutation = useDeleteResource("schedules")

  useEffect(() => {
    if (deleteScheduleMutation.isError) {
      setMessage({
        message: deleteScheduleMutation.error.message,
        status: "danger",
      })
    }

    if (deleteScheduleMutation.isSuccess) {
      setMessage({
        message: "Schedule deleted",
        status: "success",
      })
    }
  }, [
    deleteScheduleMutation.isError,
    deleteScheduleMutation.isSuccess,
    deleteScheduleMutation.error,
    setMessage,
  ])

  const postSchedules = useMemo(() => {
    if (post && schedules) {
      return schedules.filter((s) => (s.post_id === post.id))
    } else if (schedules) {
      return schedules
    } else {
      return []
    }
  }, [post, schedules])

  return (
    <>
      <ul className="relative isolate divide-y divide-gray-100 dark:divide-gray-700 dark:border-t dark:border-white/5">
        {deleteScheduleMutation.isPending && <Loading />}
        {postSchedules.map((schedule) => {
          const SocialIcon = socialMediaDictionary[schedule.social_media].icon
          return (
            <Wrapper
              as="li"
              key={schedule.id}
              className="flex items-center justify-between gap-x-6 py-5"
            >
              <div className="flex min-w-0 items-center gap-6">
                <div>
                  <SocialIcon
                    className={`h-10 w-10 fill-${schedule.social_media}`}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-start gap-x-3">
                    <p className="text-sm font-semibold leading-6 text-text">
                      {schedule.id}
                    </p>
                    <p
                      className={classNames(
                        statuses[schedule.status],
                        "mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset",
                      )}
                    >
                      {schedule.status}
                    </p>
                  </div>

                  <div className="flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                    <p className="whitespace-nowrap text-gray-400">
                      Scheduled on{" "}
                      <time dateTime={schedule.scheduled_at}>
                        {schedule.scheduled_at}
                      </time>
                    </p>
                    <svg viewBox="0 0 2 2" className="hidden md:inline h-0.5 w-0.5 fill-current">
                      <circle cx={1} cy={1} r={1} />
                    </svg>
                    <p className="hidden md:inline truncate"><Link className= "text-gray-400 text-primary hover:underline" to={schedule.destination_id}>See destination</Link></p>
                  </div>
                </div>
              </div>
              <div className="flex flex-none items-center gap-x-4">
                <Link
                  to={`/posts/${schedule.post_id}/edit`}
                  className="rounded-md bg-bg px-2.5 py-1.5 text-sm font-semibold text-text shadow-sm ring-1 ring-inset ring-ring hover:bg-bg-hover sm:block"
                >
                  View post
                  <span className="sr-only">, {schedule.scheduled_at}</span>
                </Link>
                <Menu as="div" className="relative flex-none">
                  <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-text">
                    <span className="sr-only">Open options</span>
                    <EllipsisVerticalIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-bg py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={`/schedules/${schedule.id}/edit`}
                            className={classNames(
                              active ? "bg-primary" : "",
                              "block px-3 py-1 text-sm leading-6 text-text",
                            )}
                          >
                            Edit
                            <span className="sr-only">, {schedule.id}</span>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            className={classNames(
                              active ? "bg-primary" : "",
                              "block px-3 py-1 text-sm leading-6 text-text",
                            )}
                            onClick={(e) => {
                              e.preventDefault()
                              deleteScheduleMutation.mutate(schedule.id)
                            }}
                          >
                            Delete
                            <span className="sr-only">, {schedule.id}</span>
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </Wrapper>
          )
        })}
      </ul>
    </>
  )
}
