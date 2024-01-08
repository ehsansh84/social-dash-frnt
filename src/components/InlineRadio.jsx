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
      <label className="text-base font-semibold text-text">{label}</label>
      {info && <p className="text-sm text-gray-500">{info}</p>}
      <fieldset className="mt-4">
        <legend className="sr-only">Notification method</legend>
        <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
          {options.map((option) => (
            <div key={option.id} className="flex items-center">
              <input
                id={option.id}
                name={name}
                type="radio"
                defaultChecked={option.id === selectedOption}
                className="h-4 w-4 border-gray-300 text-primry focus:ring-primary"
                onChange={e => setSelectedOption(e.target.value)}
                {...delegated}
              />
              <label
                htmlFor={option.id}
                className="ml-3 block text-sm font-medium leading-6 text-text"
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
