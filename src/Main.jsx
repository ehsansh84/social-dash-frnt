import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Users } from "./pages/Users"

export function Main() {
  return (
    <main>
      <Routes>
        <Route path="users" element={<Users />} />
        <Route path="posts" element={<div>posts</div>} />
        <Route path="settings" element={<div>settings</div>} />
      </Routes>
    </main>
  )
}
