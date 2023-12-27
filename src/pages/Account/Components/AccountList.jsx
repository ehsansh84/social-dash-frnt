import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid"

import { socialMediaDictionary } from "../../../components/SocialMedia"
import { SocialBadge } from "../../../components/SocialBadge"
import { Link, useNavigate } from "react-router-dom"
import { useDeleteResource, useResource } from "../../../hooks/useResources"
import { useEffect, useState } from "react"

export function AccountList({ setMessage }) {
  const [idToDelete, setIdToDelete] = useState("")

  const { data } = useResource("accounts")
  const accounts = data ?? []
  const deleteAccountMutation = useDeleteResource("accounts")
  const navigate = useNavigate()

  useEffect(() => {
    if (deleteAccountMutation.isError) {
      setMessage({
        message: deleteAccountMutation.error.message,
        status: "danger",
      })
    }

    if (deleteAccountMutation.isSuccess) {
      setMessage({
        message: "Account deleted",
        status: "success",
      })
    }
    setIdToDelete("")
  }, [
    navigate,
    deleteAccountMutation.isError,
    deleteAccountMutation.isSuccess,
    deleteAccountMutation.error,
  ])

  return (
    <ul className="grid  grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {accounts.map((account) => {
        const SocialIcon = socialMediaDictionary[account.social_media].icon
        return (
          <li
            key={account._id}
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
                  <Link
                    to={`/accounts/${account._id}/edit`}
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
                    onClick={() => {
                      setIdToDelete(account._id)
                      deleteAccountMutation.mutate(account._id)
                    }}
                  >
                    {idToDelete === account._id &&
                    deleteAccountMutation.isPending ? (
                      <div
                        className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"
                      >
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                          Loading...
                        </span>
                      </div>
                    ) : (
                      <>
                        <TrashIcon
                          className="h-5 w-5 text-gray-400 dark:text-gray-600"
                          aria-hidden="true"
                        />
                        Delete
                      </>
                    )}
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
