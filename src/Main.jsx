import { Routes, Route } from "react-router-dom"
import { Index as UserIndex } from "./pages/User/Index"
import { Create as CreateUser } from "./pages/User/Create"
import { Index as PostIndex } from "./pages/Post/Index"
import { Create as CreatePost } from "./pages/Post/Create"
import { Index as SourceIndex } from "./pages/Source/Index"
import { Create as CreateSource } from "./pages/Source/Create"

export function Main() {
  return (
    <main>
      <Routes>
        <Route path="users/create" element={<CreateUser />} /> 
        <Route path="users/:userId/edit" element={<div>edit</div>} /> 
        <Route path="users" element={<UserIndex />} />
        <Route path="sources/create" element={<CreateSource />} /> 
        <Route path="sources" element={<SourceIndex />} />
        <Route path="posts/create" element={<CreatePost />} /> 
        <Route path="posts" element={<PostIndex />} />
        <Route path="settings" element={<div>settings</div>} />
      </Routes>
    </main>
  )
}
