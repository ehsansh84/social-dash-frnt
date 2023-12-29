import { Route, Routes } from "react-router-dom"
import { IndexPage } from "./pages/IndexPage"

import { Create as CreateAccount } from "./pages/Account/Create"
import { Edit as EditAccount } from "./pages/Account/Edit"
import { Index as AccountIndex } from "./pages/Account/Index"
import { PostList } from "./pages/Post/Components/PostList"
import { Create as CreatePost } from "./pages/Post/Create"
import { Create as CreateSource } from "./pages/Source/Create"
import { Index as SourceIndex } from "./pages/Source/Index"
import { Edit as EditSource } from "./pages/Source/Edit"
import { UserList } from "./pages/User/Components/UserList"
import { Create as CreateUser } from "./pages/User/Create"
import Dashboard from "./pages/Dashboard/Dashboard"

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

        <Route path="accounts/:accountId/edit" element={<EditAccount />} />
        <Route path="accounts/create" element={<CreateAccount />} />
        <Route path="accounts" element={<AccountIndex />} />

        <Route path="sources/:sourceId/edit" element={<EditSource />} />
        <Route path="sources/create" element={<CreateSource />} />
        <Route path="sources" element={<SourceIndex />} />

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
        <Route path="/" element={<Dashboard />} />

        <Route path="*" element={<div>not found</div>} />


      </Routes>
    </main>
  )
}
