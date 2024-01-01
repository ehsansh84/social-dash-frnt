import axios from "axios"
import { API_CONFIG } from "./apiConfig"

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

export const updateResource = (resourceName, id, data) => {
  const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints[resourceName]}/${id}`
  return axios.put(url, data).then((res) => res.data)
}

export const deleteResource = (resourceName, id) => {
  const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints[resourceName]}/${id}`
  return axios.delete(url).then((res) => res.data)
}
