export function InputField({
  id,
  label,
  value,
  setValue,
  ...delegated
}) {
  return (
    <>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-text"
      >
        {label}
      </label>
      <div className="mt-2">
        <div className="relative flex rounded-md shadow-sm ring-1 ring-inset ring-ring focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary sm:max-w-md">
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
            }}
            type="text"
            name={id}
            id={id}
            className="block flex-1 border-0 bg-transparent py-1.5 ps-3 text-text placeholder:text-placeholder focus:ring-0 sm:text-sm sm:leading-6"
            {...delegated}
          />
        </div>
      </div>
    </>
  )
}
