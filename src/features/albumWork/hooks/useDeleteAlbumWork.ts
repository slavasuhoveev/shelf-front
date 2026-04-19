import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteAlbumWork } from "../api/deleteAlbumWork"

export function useDeleteAlbumWork() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteAlbumWork,

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["albumWorks"] })

      const previous = queryClient.getQueryData(["albumWorks"])

      queryClient.setQueryData(["albumWorks"], (old: any) =>
        old?.filter((album: any) => album.id !== id)
      )

      return { previous }
    },

    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["albumWorks"], context.previous)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["albumWorks"] })
    },
  })
}
