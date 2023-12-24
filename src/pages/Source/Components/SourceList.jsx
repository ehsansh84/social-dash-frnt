import { ChevronRightIcon } from "@heroicons/react/20/solid"
import { Wrapper } from "../../../Wrapper"
import { Link } from "react-router-dom"
import { SocialIcon } from "../../../components/SocialIcons"

const sources = [
  {
    social_media: "instagram",
    name: "Photography by Ehsan",
    description: "This is a great channel about photography",
    account_id: "62d7a781d8f8d7627ce212d5",
    channel: "my_channel",
    logo: "https://picsum.photos/200",
    crawl_schedule: "daily",
    id: "1",
    created_at: "2023-12-23T20:53:51.237Z",
    updated_at: "2023-12-23T20:53:51.237Z",
    user_id: "string",
  },
  {
    social_media: "telegram",
    name: "Photography by Ehsan",
    description: "This is a great channel about photography",
    account_id: "62d7a781d8f8d7627ce212d5",
    channel: "my_channel",
    logo: "https://picsum.photos/200",
    crawl_schedule: "daily",
    id: "2",
    created_at: "2023-12-23T20:53:51.237Z",
    updated_at: "2023-12-23T20:53:51.237Z",
    user_id: "string",
  },
]

export function SourceList() {
  return (
    <ul className="divide-y divide-gray-100 dark:divide-gray-700 dark:border-t dark:border-white/5">
      {sources.map((source) => (
        <Wrapper
          as="li"
          key={source.id}
          className="relative flex justify-between gap-x-6 py-4 pb-3 hover:bg-bg-hover"
        >
          <div className="flex gap-x-4 items-center">
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              src={source.logo}
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                <Link to={"/sources/" + source.id + "/edit"}>
                  <span className="absolute inset-x-0 -top-px bottom-0" />
                  {source.name} - {source.channel}
                </Link>
              </p>
              <div className="mt-1 flex text-xs leading-5 text-gray-500 dark:text-gray-400">
                <p className="relative truncate">{source.description}</p>
              </div>
                <p className="text-xs leading-5 text-gray-500">
                  Crawled {source.crawl_schedule}
                </p>
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <div className="text-sm leading-6 text-gray-900 dark:text-gray-100">
                <SocialIcon socialMedia={source.social_media} />
              </div>
            </div>
            <ChevronRightIcon
              className="h-5 w-5 flex-none text-gray-400"
              aria-hidden="true"
            />
          </div>
        </Wrapper>
      ))}
    </ul>
  )
}
