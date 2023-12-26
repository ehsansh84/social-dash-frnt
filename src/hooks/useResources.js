import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  fetchResource,
  createResource,
  updateResource,
  deleteResource,
} from "../api"

export const useResource = (resourceName) => {
  return useQuery({
    queryKey: [resourceName],
    queryFn: () => fetchResource(resourceName),
  })
}

export const useCreateResource = (resourceName) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [resourceName],
    mutationFn: (data) => createResource(resourceName, data),
    onSuccess: () => {
      queryClient.invalidateQueries(resourceName)
    },
  })
}

export const useUpdateResource = (resourceName) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [resourceName],
    mutationFn: ({ _id, data }) => updateResource(resourceName, _id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(resourceName)
    },
  })
}

export const useDeleteResource = (resourceName) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [resourceName],
    mutationFn: (id) => deleteResource(resourceName, id),
    onSuccess: () => {
      queryClient.invalidateQueries(resourceName)
    },
  })
}
