import axios from "axios"

export const API_CONFIG = {
  baseUrl: "http://localhost:3000",
  endpoints: {
    accounts: "/account",
    dashboard: "/dashboard",
    sources: "/source",
    schedules: "/schedule",
    posts: "/post",
    users: "/users",
  },
}

export const fetchResourceList = (resourceName) => {
  let url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints[resourceName]}`
  return axios.get(url).then((res) => res.data)
}

export const fetchResource = (resourceName, id) => {
  let url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints[resourceName]}`
  url += `/${id}`
  return axios.get(url).then((res) => res.data)
}

export const createResource = (resourceName, data, headers = {}) => {
  const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints[resourceName]}`
  return axios.post(url, data, { headers }).then((res) => res.data)
}

export const updateResource = (resourceName, id, data, headers = {}) => {
  const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints[resourceName]}/${id}`
  return axios.put(url, data, { headers }).then((res) => res.data)
}

export const deleteResource = (resourceName, id) => {
  const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints[resourceName]}/${id}`
  return axios.delete(url).then((res) => res.data)
}
