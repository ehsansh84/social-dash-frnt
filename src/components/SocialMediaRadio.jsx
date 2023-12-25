import { RadioGroup } from "@headlessui/react"
import { socialMediaDictionary } from "./SocialMedia"

const socialMediaOptions = Object.keys(socialMediaDictionary).map((key) => ({
  name: key,
  icon: socialMediaDictionary[key].icon,
}))

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export function SocialMediaRadio({ socialMedia, setSocialMedia }) {
  console.log(socialMedia);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium leading-6 text-text">
          Social Media
        </h2>
      </div>

      <RadioGroup
        value={socialMedia}
        onChange={setSocialMedia}
        className="mt-2"
      >
        <RadioGroup.Label className="sr-only">
          Choose a social media option
        </RadioGroup.Label>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {socialMediaOptions.map((option) => (
            <RadioGroup.Option
              key={option.name}
              value={option.name}
              className={({ active, checked }) =>
                classNames(
                  "cursor-pointer focus:outline-none",
                  active ? `ring-2 ring-${option.name}-ring ring-offset-2` : "",
                  checked
                    ? `bg-${option.name}-bg text-${option.name}-text hover:bg-${option.name}-bg-dark`
                    : `bg-${option.name}-bg-light text-${option.name}-text ring-1 ring-inset hover:bg-${option.name}-bg`,
                  "flex items-center justify-center rounded-md px-3 py-3 text-sm font-semibold uppercase sm:flex-1",
                )
              }
            >
              <div className="group -m-1 p-1">
                <option.icon
                  className={`h-6 w-6 fill-${option.name} transition group-hover:fill-${option.name}`}
                />
              </div>
              <RadioGroup.Label as="span" className="sr-only">
                {option.name}
              </RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}
