export function InputField({ id, label, value, setValue, helpText="", ...delegated }) {
  return (
    <>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-text"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          type="text"
          name={id}
          id={id}
          className="ring-inset ring-primary block w-full rounded-md border-0 bg-transparent py-1.5 ps-3 text-text shadow-sm ring-1 placeholder:text-placeholder focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          {...delegated}
        />
      </div>
      <p className="mt-2 text-sm text-gray-500" id="email-description">
        {helpText}
      </p>
    </>
  )
}
