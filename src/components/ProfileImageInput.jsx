import { useEffect } from "react"
import { useImageInput } from "../hooks/useImageInput"
import { UserCircleIcon } from "@heroicons/react/20/solid"

export function ProfileImageInput({ imageUrl = "", onImageChange }) {
  const { selectedImage, inputKey, handleImageUpload, removeImage } =
    useImageInput(imageUrl)

  useEffect(() => {
    onImageChange(selectedImage)
  }, [selectedImage, onImageChange])

  return (
    <>
      {selectedImage ? (
        <img
          src={selectedImage}
          alt="Profile"
          className="h-24 w-24 flex-none rounded-lg bg-gray-200 object-cover dark:bg-gray-800"
        />
      ) : (
        <UserCircleIcon
          className="h-24 w-24 flex-none rounded-lg bg-gray-100 object-cover ring-1 ring-inset ring-ring dark:bg-gray-800"
          aria-hidden="true"
        />
      )}
      <div className="space-y-4">
        <input
          key={inputKey}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="imageUpload"
        />
        <div className="flex items-baseline gap-4">
          <label
            htmlFor="imageUpload"
            className="cursor-pointer rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 ring-1 ring-ring"
          >
            Change avatar
          </label>
          <p className="text-xs leading-5 text-gray-400">
            JPG, GIF or PNG. 1MB max.
          </p>
        </div>
        <button
          type="button"
          onClick={removeImage}
          className="border-0 bg-bg ps-1 text-xs font-medium text-gray-600 underline shadow-sm hover:no-underline"
        >
          Remove
        </button>
      </div>
    </>
  )
}
