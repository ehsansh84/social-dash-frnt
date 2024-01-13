import { createRoot } from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Shell } from "./Shell"
import useTheme from "./hooks/useTheme"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Register } from "./pages/Auth/Register"

const queryClient = new QueryClient()

export default function App() {
  useTheme()
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Shell />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

const container = document.getElementById("root")
const root = createRoot(container)
root.render(<App />)
