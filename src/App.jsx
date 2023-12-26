import { createRoot } from "react-dom/client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Shell } from "./Shell"
import useTheme from "./hooks/useTheme"

const queryClient = new QueryClient();

export default function App() {
  useTheme()
  return (
    <QueryClientProvider client={queryClient}>
      <Shell />
    </QueryClientProvider>
  );
}

const container = document.getElementById("root")
const root = createRoot(container)
root.render(<App />)
