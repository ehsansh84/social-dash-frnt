import { CheckIcon, ChevronRightIcon } from "@heroicons/react/20/solid"
import { Wrapper } from "../../../Wrapper"
import { Link } from "react-router-dom"
import { SocialIcon } from "../../../components/SocialMedia"
import { useResourceList } from "../../../hooks/useResources"

export function PostList() {
  const { data } = useResourceList("posts")
  const posts = data ?? []
  return (
    <ul className="-my-6 divide-y divide-gray-200 sm:-my-10">
      {posts.map((p) => (
        <div key={p._id} className="flex py-6 sm:py-10">
          <div className="min-w-0 flex-1 lg:flex lg:flex-col">
            <div className="lg:flex-1">
              <div className="sm:flex">
                <div>
                  <h4 className="font-medium text-gray-900">{p.post_type}</h4>
                  <p className="mt-2 hidden text-sm text-gray-500 sm:block">
                    {p.caption}
                  </p>
                </div>
                <p className="mt-1 font-medium text-gray-900 sm:ml-6 sm:mt-0">
                  {p.status}
                </p>
              </div>
              <div className="mt-2 flex text-sm font-medium sm:mt-4">
                <a
                  href={p.cover_url}
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  cover url
                </a>
                <div className="ml-4 border-l border-gray-200 pl-4 sm:ml-6 sm:pl-6">
                  <Link
                    to={"/posts/" + p._id + "/edit"}
                    className="text-indigo-600 hover:text-indigo-500"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-6 font-medium">
              {p.status === "new" ? (
                <div className="flex space-x-2">
                  <CheckIcon
                    className="h-6 w-6 flex-none text-green-500"
                    aria-hidden="true"
                  />
                  <p>
                    New
                    <span className="hidden sm:inline">
                      {" "}
                      on <time dateTime={p.date_utc}>{p.post_date}</time>
                    </span>
                  </p>
                </div>
              ) : p.status === "thumb_created" ? (
                <p>Thumb Created</p>
              ) : p.status === "uploaded_to_channel" ? (
                <p className="text-gray-500">Uploaded to channel</p>
              ) : null}
            </div>
          </div>
          <div className="ml-4 flex-shrink-0 sm:order-first sm:m-0 sm:mr-6">
            <img
              src={p.cover_url}
              alt={p.caption}
              className="col-start-2 col-end-3 h-20 w-20 rounded-lg object-cover object-center sm:col-start-1 sm:row-span-2 sm:row-start-1 sm:h-40 sm:w-40 lg:h-52 lg:w-52"
            />
          </div>
        </div>
      ))}
    </ul>
  )
}
