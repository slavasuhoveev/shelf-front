import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateAlbumWork } from "../api/updateAlbumWork"

export function useUpdateAlbumWork() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string
            data: {
                title?: string
                artist?: string
                year?: number
            }
        }) => updateAlbumWork(id, data),

        onMutate: async (variables) => {
            await queryClient.cancelQueries({ queryKey: ["albumWorks"] })

            const previous = queryClient.getQueryData(["albumWorks"])

            queryClient.setQueryData(["albumWorks"], (old: any) =>
                old?.map((album: any) =>
                    album.id === variables.id
                        ? { ...album, ...variables.data }
                        : album
                )
            )

            return { previous }
        },

        onError: (_err, _variables, context) => {
            if (context?.previous) {
                queryClient.setQueryData(["albumWorks"], context.previous)
            }
        },

        onSettled: (_data, _error, variables) => {
        queryClient.invalidateQueries({ queryKey: ["albumWorks"] })

        queryClient.invalidateQueries({
            queryKey: ["albumWork", variables.id],
        })
        }
    })
}
