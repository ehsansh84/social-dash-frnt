import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid"

import { classNames } from "../../../utils"

import { socialMediaDictionary } from "../../../components/SocialIcons"
import { SocialBadge } from "../../../components/SocialBadge"

const accounts = [
  {
    name: "Jane Cooper",
    social_media: "instagram",
    token: "Admin",
    description:
      "janecooper@example.com janecooper@example.com janecooper@example.com",
    id: "+ss1-202-5170",
    created_at:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    updated_at:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    user_id: "62d7a781d8f8d7627ce212d5",
  },
  {
    name: "Jane Cooper",
    social_media: "reddit",
    token: "Admin",
    description: "janecooper@example.com",
    id: "+1-",
    created_at:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    updated_at:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    user_id: "62d7a781d8f8d7627ce212d5",
  },
  {
    name: "Jane Cooper",
    social_media: "telegram",
    token: "Admin",
    description: "janecooper@example.com",
    id: "+1-0170",
    created_at:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    updated_at:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    user_id: "62d7a781d8f8d7627ce212d5",
  },
]

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
                  <a
                    href={`mailto:${account.token}`}
                    className="relative -me-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-es-lg border border-transparent py-4 text-sm font-semibold text-text"
                  >
                    <PencilIcon
                      className="h-5 w-5 text-gray-400 dark:text-gray-600"
                      aria-hidden="true"
                    />
                    Edit Account
                  </a>
                </div>
                <div className="-ms-px flex w-0 flex-1 hover:bg-bg-hover">
                  <a
                    href={`tel:${account.token}`}
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-ee-lg border border-transparent py-4 text-sm font-semibold text-text"
                  >
                    <TrashIcon
                      className="h-5 w-5 text-gray-400 dark:text-gray-600"
                      aria-hidden="true"
                    />
                    Delete
                  </a>
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
