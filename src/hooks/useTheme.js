import { useEffect, useState } from "react"

function useTheme() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const theme = localStorage.getItem("theme")
    if (theme) {
      if (theme === 'dark') {
        document.documentElement.classList.add(theme)
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleTheme = () => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
    localStorage.setItem("theme", theme)
  }

  return [theme, toggleTheme]
}

export default useTheme
