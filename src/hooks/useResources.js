import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  fetchResource,
  createResource,
  updateResource,
  deleteResource,
} from "../api"

export const useResource = (resourceName, id) => {
  return useQuery({
    queryKey: [resourceName, id],
    queryFn: () => fetchResource(resourceName, id),
  })
}

export const useCreateResource = (resourceName) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [resourceName],
    mutationFn: (data) => createResource(resourceName, data),
    onSuccess: () => {
      queryClient.invalidateQueries(resourceName)
      // queryClient.setQueryData([resourceName, data._id], data)
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
      // queryClient.setQueryData([resourceName, data._id], data.data)

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
