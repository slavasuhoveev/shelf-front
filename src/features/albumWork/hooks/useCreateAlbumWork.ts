import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAlbumWork } from "../api/createAlbumWork"

export function useCreateAlbumWork() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAlbumWork,

    onMutate: async (newAlbum) => {
      await queryClient.cancelQueries({ queryKey: ["albumWorks"] })

      const previous = queryClient.getQueryData(["albumWorks"])

      const optimisticAlbum = {
        id: crypto.randomUUID(),
        ...newAlbum,
      }

      queryClient.setQueryData(["albumWorks"], (old: any) => [
        ...(old || []),
        optimisticAlbum,
      ])

      return { previous }
    },

    onError: (_err, _newAlbum, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["albumWorks"], context.previous)
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albumWorks"] })
    },
  })
}
