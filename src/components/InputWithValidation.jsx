import { ExclamationCircleIcon } from "@heroicons/react/20/solid"

export function InputWithValidation({
  id,
  label,
  value,
  setValue,
  messageOnInvalid = "Invalid input",
  isValid,
  helpText="",
  ...delegated
}) {
  const baseClassNames =
    "block w-full bg-transparent rounded-md border-0 py-1.5 ring-1 ring-inset sm:text-sm sm:leading-6 focus:ring-2 focus:ring-inset ps-3"
  const invalidClassNames =
    "text-red-900 ring-red-300 placepe-10 placeholder:text-red-300 pr-10 "
  const validClassNames =
    "text-text ring-primary placeholder:text-placeholder focus:ring-primary"

  return (
    <>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-text"
      >
        {label}
      </label>
      <div className="relative mt-2">
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          type="text"
          name={id}
          id={id}
          className={`${baseClassNames} ${
            isValid ? validClassNames : invalidClassNames
          }`}
          {...delegated}
          aria-invalid={!isValid}
        />
        {!isValid && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {!isValid && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {messageOnInvalid}
        </p>
      )}
      <p className="mt-2 text-sm text-gray-500" id="email-description">
        {helpText}
      </p>
    </>
  )
}
