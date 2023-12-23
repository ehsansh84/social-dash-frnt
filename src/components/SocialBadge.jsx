import { classNames } from "../utils"

export function SocialBadge({ socialMedia }) {
  const badgeClass = classNames(
    "inline-flex",
    "flex-shrink-0",
    "items-center",
    "rounded-full",
    "px-1.5",
    "py-0.5",
    "text-xs",
    "font-medium",
    "ring-1",
    "ring-inset",
    "font-semibold",
    "text-" + socialMedia + "-text",
    "bg-" + socialMedia + "-bg",
    "ring-" + socialMedia + "-ring",
  )
  return <span className={badgeClass}>{socialMedia}</span>
}
