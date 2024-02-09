import { PhotoIcon } from "@heroicons/react/20/solid"

export function CoverInput({image, setImage}) {
  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file && file.type.match("image.*")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target.result)
      }
      reader.readAsDataURL(file)
    } else {
      console.error("File is not an image.")
    }
  }


  const removeImage = () => {
    setImage("")
  }


  return (
    <>
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium leading-6 text-text"
      >
        Cover photo
      </label>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-border px-6 py-10">
        {image ? (
          <div className="flex flex-col gap-4">
            <img
              src={image}
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
