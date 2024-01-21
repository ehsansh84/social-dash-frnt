import { Route, Routes } from "react-router-dom"

import { Create as CreateAccount } from "./pages/Account/Create"
import { Edit as EditAccount } from "./pages/Account/Edit"
import { Index as AccountIndex } from "./pages/Account/Index"
import Dashboard from "./pages/Dashboard/Dashboard"
import { Create as CreatePost } from "./pages/Post/Create"
import { Edit as EditPost } from "./pages/Post/Edit"
import { Index as PostIndex } from "./pages/Post/Index"
import { Create as CreateSchedule } from "./pages/Schedule/Create"
import { Edit as EditSchedule } from "./pages/Schedule/Edit"
import { Index as ScheduleIndex } from "./pages/Schedule/Index"
import { Create as CreateSource } from "./pages/Source/Create"
import { Edit as EditSource } from "./pages/Source/Edit"
import { Index as SourceIndex } from "./pages/Source/Index"
import { Create as CreateDestination } from "./pages/Destination/Create"
import { Edit as EditDestination } from "./pages/Destination/Edit"
import { Index as DestinationIndex } from "./pages/Destination/Index"
import { Create as CreateRole } from "./pages/Role/Create"
import { Edit as EditRole } from "./pages/Role/Edit"
import { Index as RoleIndex } from "./pages/Role/Index"
import { Create as CreatePermission } from "./pages/Permission/Create"
import { Edit as EditPermission } from "./pages/Permission/Edit"
import { Index as PermissionIndex } from "./pages/Permission/Index"
import { Index as UserIndex } from "./pages/User/Index"
import { Create as CreateUser } from "./pages/User/Create"
import { Edit as EditUser } from "./pages/User/Edit"

export function Main() {
  return (
    <main>
      <Routes>
        <Route path="users/create" element={<CreateUser />} />
        <Route path="users/:userId/edit" element={<EditUser />} />
        <Route path="users" element={<UserIndex />} />

        <Route path="accounts/:accountId/edit" element={<EditAccount />} />
        <Route path="accounts/create" element={<CreateAccount />} />
        <Route path="accounts" element={<AccountIndex />} />

        <Route path="sources/:sourceId/edit" element={<EditSource />} />
        <Route path="sources/create" element={<CreateSource />} />
        <Route path="sources" element={<SourceIndex />} />

        <Route
          path="destinations/:destinationId/edit"
          element={<EditDestination />}
        />
        <Route path="destinations/create" element={<CreateDestination />} />
        <Route path="destinations" element={<DestinationIndex />} />

        <Route path="roles/:roleId/edit" element={<EditRole />} />
        <Route path="roles/create" element={<CreateRole />} />
        <Route path="roles" element={<RoleIndex />} />

        <Route path="permissions/:permissionId/edit" element={<EditPermission />} />
        <Route path="permissions/:roleId/create" element={<CreatePermission />} />
        <Route path="permissions/:roleId" element={<PermissionIndex />} />
        <Route path="permissions/" element={<PermissionIndex />} />

        <Route path="schedules/:scheduleId/edit" element={<EditSchedule />} />
        <Route path="schedules/:postId/create" element={<CreateSchedule />} />
        <Route path="schedules/:postId" element={<ScheduleIndex />} />
        <Route path="schedules/" element={<ScheduleIndex />} />

        <Route path="posts/create" element={<CreatePost />} />
        <Route path="posts" element={<PostIndex />} />
        <Route path="posts/:postId/edit" element={<EditPost />} />

        <Route path="settings" element={<div>settings</div>} />
        <Route path="/" element={<Dashboard />} />

        <Route path="*" element={<div>not found</div>} />
      </Routes>
    </main>
  )
}
