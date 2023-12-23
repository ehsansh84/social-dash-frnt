import { Route, Routes } from "react-router-dom"
import { IndexPage } from "./pages/IndexPage"

import { Create as CreateAccount } from "./pages/Account/Create"
import { PostList } from "./pages/Post/Components/PostList"
import { Create as CreatePost } from "./pages/Post/Create"
import { SourceList } from "./pages/Source/Components/SourceList"
import { Create as CreateSource } from "./pages/Source/Create"
import { UserList } from "./pages/User/Components/UserList"
import { Create as CreateUser } from "./pages/User/Create"
import Index from "./pages/Account/Index"

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

        <Route
          path="accounts/:accountId/edit"
          element={<div>edit account</div>}
        />
        <Route path="accounts/create" element={<CreateAccount />} />
        <Route path="accounts" element={<Index />} />

        <Route path="sources/:sourceId/edit" element={<div>edit source</div>} />
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
