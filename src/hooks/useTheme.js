import { useEffect, useState } from "react"

function useTheme() {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    const theme = localStorage.getItem("theme")
    if (theme) {
      if (theme === "dark") {
        document.documentElement.classList.add('dark')
      }
      setTheme(theme)
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark")
      setTheme("dark")
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      document.documentElement.classList.remove("dark")
      setTheme("light")
    } else {
      document.documentElement.classList.add("dark")
      setTheme("dark")
    }
  }, [])

  localStorage.getItem("theme")
  console.log(theme)
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  return [theme, toggleTheme]
}

export default useTheme
