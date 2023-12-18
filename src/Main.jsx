import { Routes, Route } from "react-router-dom"
import { Index } from "./pages/Index"
import Create from "./pages/Create"

export function Main() {
  return (
    <main>
      <Routes>
        <Route path="users/create" element={<Create />} /> 
        <Route path="users/:userId/edit" element={<div>edit</div>} /> 
        <Route path="users" element={<Index />} />
        <Route path="posts" element={<div>posts</div>} />
        <Route path="settings" element={<div>settings</div>} />
      </Routes>
    </main>
  )
}
