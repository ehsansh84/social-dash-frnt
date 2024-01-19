import { ChevronRightIcon } from "@heroicons/react/20/solid"
import { Wrapper } from "../../../Wrapper"
import { Link } from "react-router-dom"
import { SocialIcon } from "../../../components/SocialMedia"
import { useResourceList } from "../../../hooks/useResources"

export function DestinationList() {
  const { data } = useResourceList("destinations")
  const destinations = data ?? []
  return (
    <ul className="divide-y divide-gray-100 dark:divide-gray-700 dark:border-t dark:border-white/5">
      {destinations.map((d) => (
        <Wrapper
          as="li"
          key={d.id}
          className="relative flex justify-between gap-x-6 py-4 pb-3 hover:bg-bg-hover"
        >
          <div className="flex items-center gap-x-4">
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              src={d.logo}
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                <Link to={"/destinations/" + d.id + "/edit"}>
                  <span className="absolute inset-x-0 -top-px bottom-0" />
                  <span>{d.name} </span>
                  <span className="text-gray-500 before:content-['@']">{d.channel}</span>
                </Link>
              </p>
              {/* <div className="mt-1 flex text-xs leading-5 text-gray-500 dark:text-gray-400">
                <p className="truncate">{d.description}</p>
              </div> */}
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <div className="hidden gap-2 sm:flex sm:flex-col sm:items-center">
              <div className="text-sm leading-6 text-gray-900 dark:text-gray-100">
                <SocialIcon socialMedia={d.social_media} />
              </div>
              {/* <Link
                className="relative text-xs leading-5 text-gray-500  underline hover:no-underline"
                to={`/accounts/${d.account_id}/edit`}
              >
                account id {d.account_id}
              </Link> */}
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
