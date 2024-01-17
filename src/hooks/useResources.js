import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  fetchResource,
  createResource,
  updateResource,
  deleteResource,
  fetchResourceList,
  registerUser,
} from "../api"

export const useResourceList = (resourceName) => {
  return useQuery({
    queryKey: [resourceName],
    queryFn: () => fetchResourceList(resourceName),
    staleTime: Infinity,
  })
}

export const useResource = (resourceName, id) => {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: [resourceName, id],
    queryFn: () => {
      // Try to get the data from the cache first
      const listData = queryClient.getQueryData([resourceName])

      if (listData) {
        // If the data is in the cache, find the specific item
        const item = listData.find((item) => item.id === id)
        if (item) {
          return Promise.resolve(item)
        }
      }

      // If the item is not in the cache, fetch it
      if (id) {
        return fetchResource(resourceName, id)
      } else {
        return null
      }
    },
    staleTime: Infinity,
  })
}

export const useCreateResource = (resourceName) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [resourceName],
    mutationFn: (data, headers) => createResource(resourceName, data, headers),
    onSuccess: (data, sentData) => {
      // Update the list in the cache
      const currentData = queryClient.getQueryData([resourceName])
      if (currentData) {
        queryClient.setQueryData(
          [resourceName],
          [...currentData, { id: data.data.id, ...sentData }],
        )
      }

      // Also update the individual resource in the cache
      queryClient.setQueryData([resourceName, data.id], {
        id: data.data.id,
        ...sentData,
      })
    },
  })
}

export const useUpdateResource = (resourceName) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [resourceName],
    mutationFn: ({ id, data, headers }) =>
      updateResource(resourceName, id, data, headers),
    onSuccess: (data, sentData) => {
      // Update the list in the cache
      const currentData = queryClient.getQueryData([resourceName])
      if (currentData) {
        const updatedData = currentData.map((item) =>
          item.id === sentData.id
            ? { id: sentData.id, ...sentData.data }
            : item,
        )
        queryClient.setQueryData([resourceName], updatedData)
      }

      // Also update the individual resource in the cache
      queryClient.setQueryData([resourceName, sentData.id], {
        id: sentData.id,
        ...sentData.data,
      })
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

export const useRegisterUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: 'register',
    mutationFn: (data, headers) => registerUser(data, headers),
    onSuccess: (data, sentData) => {
      // Update the user in the cache
      queryClient.setQueryData('user', {
        id: data.data.id,
        ...sentData,
      })
    },
  })
}
