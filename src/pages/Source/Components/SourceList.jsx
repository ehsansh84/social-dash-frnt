import { ChevronRightIcon } from "@heroicons/react/20/solid"
import { Wrapper } from "../../../Wrapper"
import { Link } from "react-router-dom"
import { SocialIcon } from "../../../components/SocialMedia" 
import { useResourceList } from "../../../hooks/useResources"

export function SourceList() {
  const { data } = useResourceList("sources")
  const sources = data ?? []
  return (
    <ul className="divide-y divide-gray-100 dark:divide-gray-700 dark:border-t dark:border-white/5">
      {sources.map((source) => (
        <Wrapper
          as="li"
          key={source._id}
          className="relative flex justify-between gap-x-6 py-4 pb-3 hover:bg-bg-hover"
        >
          <div className="flex items-center gap-x-4">
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              src={source.logo}
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                <Link to={"/sources/" + source._id + "/edit"}>
                  <span className="absolute inset-x-0 -top-px bottom-0" />
                  {source.name} - {source.channel}
                </Link>
              </p>
              <div className="mt-1 flex text-xs leading-5 text-gray-500 dark:text-gray-400">
                <p className="truncate">{source.description}</p>
              </div>
              <Link
                className="relative text-xs leading-5 text-gray-500  underline hover:no-underline"
                to={`/accounts/${source.account_id}/edit`}
              >
                account id {source.account_id}
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <div className="hidden gap-2 sm:flex sm:flex-col sm:items-center">
              <div className="text-sm leading-6 text-gray-900 dark:text-gray-100">
                <SocialIcon socialMedia={source.social_media} />
              </div>
              <p className="text-xs leading-5 text-gray-500">
                Crawled {source.crawl_schedule}
              </p>
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
