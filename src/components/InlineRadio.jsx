export function InlineRadio({
  label,
  options,
  name,
  selectedOption,
  setSelectedOption,
  info = "",
  ...delegated
}) {
  return (
    <div>
      <label className="text-sm font-medium leading-6 text-text">{label}</label>
      {info && <p className="text-sm text-gray-500">{info}</p>}
      <fieldset className="mt-4">
        <legend className="sr-only">Notification method</legend>
        <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
          {options.map((option, index) => (
            <div key={option.id} className="flex items-center">
              <input
                id={`${name}-${option.title}-${index}`}
                name={name}
                type="radio"
                checked={option.id === selectedOption}
                className="text-primry h-4 w-4 cursor-pointer border-gray-300 focus:ring-primary"
                onChange={(e) => setSelectedOption(e.target.value)}
                {...delegated}
                value={option.id}
              />
              <label
                htmlFor={`${name}-${option.title}-${index}`}
                className="ml-3 block cursor-pointer text-sm font-medium leading-6 text-text"
              >
                {option.title}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  )
}
