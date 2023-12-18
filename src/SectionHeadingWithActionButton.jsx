import ButtonWithLeadingIcon from "./ButtonWithLeadingIcon"

export function SectionHeadingWithActionButton({ children, actionText, Icon }) {
  return (
    <div className="py-5 sm:flex sm:items-center sm:justify-between">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        {children}
      </h3>
      <div>
        <ButtonWithLeadingIcon Icon={Icon}>{actionText}</ButtonWithLeadingIcon>
      </div>
    </div>
  )
}
