import { createRoot } from "react-dom/client"
import { Shell } from "./Shell"
// import useTheme from "./hooks/useLocalStorage"

export default function App() {
  // const [setTheme] = useTheme()
  return <Shell />
}

const container = document.getElementById("root")
const root = createRoot(container)
root.render(<App />)
