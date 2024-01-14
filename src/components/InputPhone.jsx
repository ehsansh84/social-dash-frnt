import { PhoneInput } from "react-international-phone"
import "react-international-phone/style.css"
import { isPhoneValid } from "../utils"

export function InputPhone({ id, label, value, setValue, ...delegated }) {
  return (
    <>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-text"
      >
        {label}
      </label>
      <div className="mt-2">
        <PhoneInput
          className="relative flex rounded-md shadow-sm ring-1 ring-inset ring-ring focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary sm:max-w-md"
          defaultCountry="ua"
          value={value}
          onChange={setValue}
          required
          inputClassName="!block !flex-1 !border-0 !bg-transparent !py-1.5 !ps-3 !text-text !placeholder:text-placeholder !focus:ring-0 !sm:text-sm !sm:leading-6"
          {...delegated}
          countrySelectorStyleProps={{
            buttonClassName:
              "!border-0 !bg-transparent !py-1.5 !ps-3 !text-text !placeholder:text-placeholder !focus:ring-0 !sm:text-sm !sm:leading-6",
            dropdownStyleProps: {
              listItemClassName:
                "!bg-bg !text-text !hover:bg-bg-hover hover:text-text-hover",
            },
          }}
        />
      </div>
      {value && !isPhoneValid(value) && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          Not a valid number!
        </p>
      )}
    </>
  )
}
