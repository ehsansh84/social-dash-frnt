import { classNames } from "../utils"

export const TextAreaField = ({
  value,
  setValue,
  id,
  label,
  rows,
  className,
  placeholder,
  helperText,
  ...delegated
}) => {
  const defaultClasses =
    "block w-full rounded-md border-0 bg-bg py-1.5 text-text shadow-sm ring-1 ring-inset ring-ring placeholder:text-placeholder focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"

  return (
    <>
      <label
        htmlFor={id || "description"}
        className="block text-sm font-medium leading-6 text-text"
      >
        {label || 'Description'}
      </label>
      <div className="mt-2">
        <textarea
          value={value}
          onChange={e => setValue(e.target.value)}
          id={id || "description"}
          name={id || "description"}
          rows={rows || 3}
          className={classNames(defaultClasses, className)}
          placeholder={placeholder ?? ''}
          {...delegated}
        />
      </div>
      <p className="mt-3 text-sm leading-6 text-gray-600">
        {helperText || "Write a few sentences."}
      </p>
    </>
  )
}
