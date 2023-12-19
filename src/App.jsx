import { createRoot } from "react-dom/client"
import { Shell } from "./Shell"
import useTheme from "./hooks/useTheme"

export default function App() {
  useTheme()
  return <Shell />
}

const container = document.getElementById("root")
const root = createRoot(container)
root.render(<App />)
