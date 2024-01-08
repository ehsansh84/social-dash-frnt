import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  fetchResource,
  createResource,
  updateResource,
  deleteResource,
  fetchResourceList,
} from "../../api-local"

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
        const item = listData.find((item) => item._id === id)
        if (item) {
          return Promise.resolve(item)
        }
      }

      // If the item is not in the cache, fetch it
      return fetchResource(resourceName, id)
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
          [...currentData, { _id: data.data.id, ...sentData }],
        )
      }

      // Also update the individual resource in the cache
      queryClient.setQueryData([resourceName, data._id], {
        _id: data.data.id,
        ...sentData,
      })
    },
  })
}

export const useUpdateResource = (resourceName) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [resourceName],
    mutationFn: ({ _id, data, headers }) =>
      updateResource(resourceName, _id, data, headers),
    onSuccess: (data, sentData) => {
      // Update the list in the cache
      const currentData = queryClient.getQueryData([resourceName])
      // console.log(sentData)
      if (currentData) {
        const updatedData = currentData.map((item) =>
          item._id === sentData._id
            ? { _id: sentData._id, ...sentData.data }
            : item,
        )
        queryClient.setQueryData([resourceName], updatedData)
      }

      console.log(sentData)
      // Also update the individual resource in the cache
      queryClient.setQueryData([resourceName, sentData._id], {
        _id: sentData._id,
        ...sentData.data
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
