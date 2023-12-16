import { createRoot } from "react-dom/client"
export default function App() {
  return <div>Social Dashboard</div>
}

const container = document.getElementById("root")
const root = createRoot(container)
root.render(<App />)
