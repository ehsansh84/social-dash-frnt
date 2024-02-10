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

export const updateResource = (resourceName, id, data, headers = {}) => {
  const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints[resourceName]}/${id}`
  return axios.put(url, data, { headers }).then((res) => res.data)
}

export const deleteResource = (resourceName, id) => {
  const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints[resourceName]}/${id}`
  return axios.delete(url).then((res) => res.data)
}

export const registerUser = (data, headers = {}) => {
  const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.register}`
  return axios.post(url, data, { headers }).then((res) => res.data)
}

export const upload = (file) => {
  const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.upload}`
  const formData = new FormData();
  formData.append('file', file);

  return axios
    .post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data)
}
