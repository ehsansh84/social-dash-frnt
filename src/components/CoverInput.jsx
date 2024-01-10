import { PhotoIcon } from "@heroicons/react/20/solid"
import { useEffect } from "react"
import { useImageInput } from "../hooks/useImageInput"

export function CoverInput({imageUrl = "", onImageChange}) {
  const { selectedImage, inputKey, handleImageUpload, removeImage } =
    useImageInput(imageUrl)

  useEffect(() => {
    onImageChange(selectedImage)
  }, [selectedImage, onImageChange])

  return (
    <>
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium leading-6 text-text"
      >
        Cover photo
      </label>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-border px-6 py-10">
        {selectedImage ? (
          <div className="flex flex-col gap-4">
            <img
              src={selectedImage}
              alt="Selected"
              className="object-fill"
            />
            <button
              type="button"
              onClick={removeImage}
              className="mt-1 border-0 bg-bg px-2 text-xs font-medium text-red-500 underline shadow-sm hover:no-underline"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="text-center">
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-500"
              aria-hidden="true"
            />
            <div className="mt-4 flex text-sm leading-6 text-gray-600 dark:text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-bg font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary"
              >
                <span>Upload a file</span>
                <input
                  key={inputKey}
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleImageUpload}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        )}
      </div>
    </>
  )
}
