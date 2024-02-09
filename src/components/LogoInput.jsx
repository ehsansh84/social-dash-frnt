import { UserCircleIcon } from "@heroicons/react/20/solid"

export function LogoInput({ label="Logo", image, setImage }) {

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
        className="block text-sm font-medium leading-6 text-text"
      >
        {label}
      </label>
      <div className="mt-2 flex items-center gap-x-3">
        <div className="h-12 w-12 overflow-hidden rounded-full">
          {image ? (
            <img
              src={image}
              alt="Selected"
              className="h-full w-full object-fill"
            />
          ) : (
            <UserCircleIcon className="w-full text-gray-400" aria-hidden="true" />
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="imageUpload"
        />
        <label
          htmlFor="imageUpload"
          className="rounded-md bg-bg px-2.5 py-1.5 text-sm font-semibold text-text shadow-sm ring-1 ring-inset ring-ring hover:bg-bg-hover"
        >
          Change
        </label>
        <button
          type="button"
          onClick={removeImage}
          className="mt-1 border-0 bg-bg px-2 text-xs font-medium text-red-500 underline shadow-sm hover:no-underline"
        >
          Remove
        </button>
      </div>
    </>
  )
}
