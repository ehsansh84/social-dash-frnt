export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_BASE_URL || "http://social.devserver.ir",
  endpoints: {
    accounts: "/account",
    dashboard: "/dashboard",
    sources: "/source",
    schedules: "/schedule",
    posts: "/post",
    users: "/user",
    destinations: "/destination",
    roles: "/role",
    permissions: "/permission",
    register: "/user/register",
    upload: "/upload",
  },
}
