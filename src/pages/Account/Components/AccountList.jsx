import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid"

import { socialMediaDictionary } from "../../../components/SocialMedia"
import { SocialBadge } from "../../../components/SocialBadge"
import { Link } from "react-router-dom"
import { accounts } from "../../../hardcoded"

export function AccountList() {
  return (
    <ul className="grid  grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {accounts.map((account) => {
        const SocialIcon = socialMediaDictionary[account.social_media].icon
        return (
          <li
            key={account.id}
            className="col-span-1 divide-y divide-border rounded-lg bg-bg-card shadow"
          >
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-sm font-medium text-text">
                    {account.name}
                  </h3>
                  <SocialBadge socialMedia={account.social_media} />
                </div>
                <p className="mt-1 truncate text-sm text-gray-500">
                  {account.description}
                </p>
              </div>
              <div className="group -m-1 -mt-4 p-1">
                <SocialIcon
                  className={`h-8 w-8 fill-${account.social_media}`}
                />
              </div>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-border">
                <div className="flex w-0 flex-1 hover:bg-bg-hover">
                  <Link to={`/accounts/${account.id}/edit`}
                    className="relative -me-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-es-lg border border-transparent py-4 text-sm font-semibold text-text"
                  >
                    <PencilIcon
                      className="h-5 w-5 text-gray-400 dark:text-gray-600"
                      aria-hidden="true"
                    />
                    Edit Account
                  </Link>
                </div>
                <div className="-ms-px flex w-0 flex-1 hover:bg-bg-hover">
                  <button
                    type="button"
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-ee-lg border border-transparent py-4 text-sm font-semibold text-text"
                  >
                    <TrashIcon
                      className="h-5 w-5 text-gray-400 dark:text-gray-600"
                      aria-hidden="true"
                    />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
