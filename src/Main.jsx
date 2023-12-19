import { Routes, Route } from "react-router-dom"
import { Index as UserIndex } from "./pages/User/Index"
import { Create as CreateUser } from "./pages/User/Create"
import { Index as PostIndex } from "./pages/Post/Index"
import { Create as CreatePost } from "./pages/Post/Create"

export function Main() {
  return (
    <main>
      <Routes>
        <Route path="users/create" element={<CreateUser />} /> 
        <Route path="users/:userId/edit" element={<div>edit</div>} /> 
        <Route path="users" element={<UserIndex />} />
        <Route path="posts/create" element={<CreatePost />} /> 
        <Route path="posts" element={<PostIndex />} />
        <Route path="settings" element={<div>settings</div>} />
      </Routes>
    </main>
  )
}
