import { createRoot } from "react-dom/client"
import { Shell } from "./Shell"
export default function App() {
  return <Shell />
}

const container = document.getElementById("root")
const root = createRoot(container)
root.render(<App />)
