/** @type {import('tailwindcss').Config} */

function generateColorObject(baseName) {
  let colorObject = {}
  for (let i = 50; i <= 950; i += 50) {
    if (i === 500) {
      colorObject["DEFAULT"] = `var(--${baseName})`
    }
    colorObject[i.toString()] = `var(--${baseName}-${i})`
  }
  return colorObject
}

let colorNames = [
  "instagram",
  "telegram",
  "twitter",
  "linkedin",
  "youtube",
  "aparat",
  "facebook",
  "pinterest",
  "reddit",
]
let safelist = []
let socialMediaColors = {}

for (let name of colorNames) {
  socialMediaColors[`${name}-text`] = `var(--${name}-text)`
  socialMediaColors[`${name}-bg`] = `var(--${name}-bg)`
  socialMediaColors[`${name}-ring`] = `var(--${name}-ring)`

  safelist.push(`text-${name}-text`)
  safelist.push(`bg-${name}-bg`)
  safelist.push(`ring-${name}-ring`)
  safelist.push(`fill-${name}`)

  safelist.push(`hover:text-${name}-text`)
  safelist.push(`hover:bg-${name}-bg`)
  safelist.push(`hover:ring-${name}-ring`)
  safelist.push(`hover:fill-${name}`)

  safelist.push(`group-hover:${name}-text`)
  safelist.push(`group-hover:bg-${name}-bg`)
  safelist.push(`group-hover:ring-${name}-ring`)
  safelist.push(`group-hover:fill-${name}`)
}

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-background)",
        "bg-hover": "var(--color-background-hover)",
        text: "var(--color-text)",
        border: "var(--color-border)",
        placeholder: "var(--color-placeholder)",
        ring: "var(--color-ring)",
        primary: generateColorObject("color-primary"),
        ...socialMediaColors,
      },
      fill: (theme) => {
        let fillColors = {}

        for (let name of colorNames) {
          fillColors[name] = theme(`colors.${name}-text`)
        }

        return fillColors
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
  safelist,
}
