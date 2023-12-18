import { useEffect } from "react"

function useTheme() {
  useEffect(() => {
    const theme = localStorage.getItem("theme")
    if (theme) {
      document.documentElement.classList.add(theme)
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark")
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      document.documentElement.classList.add("light")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const setTheme = (theme) => {
    localStorage.setItem("theme", theme)
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(theme)
  }

  return [setTheme]
}

export default useTheme
