import { Routes, Route } from "react-router-dom"
import { Create as CreateUser } from "./pages/User/Create"
import { Create as CreatePost } from "./pages/Post/Create"
import { Create as CreateSource } from "./pages/Source/Create"
import { IndexPage } from "./IndexPage"
import { PostList } from "./pages/Post/Components/PostList"
import { UserList } from "./pages/User/Components/UserList"
import { SourceList } from "./pages/Source/Components/SourceList"

export function Main() {
  return (
    <main>
      <Routes>
        <Route path="users/create" element={<CreateUser />} />
        <Route path="users/:userId/edit" element={<div>edit user</div>} />
        <Route
          path="users"
          element={
            <IndexPage resourceName="user">
              <UserList />
            </IndexPage>
          }
        />

        <Route path="sources/create" element={<CreateSource />} />
        <Route
          path="sources"
          element={
            <IndexPage resourceName="source">
              <SourceList />
            </IndexPage>
          }
        />
        <Route path="sources/:sourceId/edit" element={<div>edit source</div>} />

        <Route path="posts/create" element={<CreatePost />} />
        <Route
          path="posts"
          element={
            <IndexPage resourceName="post">
              <PostList />
            </IndexPage>
          }
        />
        <Route path="posts/:postId/edit" element={<div>edit post</div>} />


        <Route path="settings" element={<div>settings</div>} />
      </Routes>
    </main>
  )
}
