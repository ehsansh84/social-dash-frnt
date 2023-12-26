import axios from "axios"
import { API_CONFIG } from "./apiConfig"

export const fetchResource = (resourceName) => {
  const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints[resourceName]}`
  return axios.get(url).then((res) => res.data)
}

export const createResource = (resourceName, data) => {
  const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints[resourceName]}`
  return axios.post(url, data).then((res) => res.data)
}

export const updateResource = (resourceName, id, data) => {
  const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints[resourceName]}/${id}`
  return axios.put(url, data).then((res) => res.data)
}

export const deleteResource = (resourceName, id) => {
  const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints[resourceName]}/${id}`
  return axios.delete(url).then((res) => res.data)
}
