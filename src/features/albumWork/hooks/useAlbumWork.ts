import { useQuery } from "@tanstack/react-query"
import { getAlbumWork } from "../api/getAlbumWork"

export function useAlbumWork(id: string) {
  return useQuery({
    queryKey: ["albumWork", id],
    queryFn: () => getAlbumWork(id),
    enabled: !!id,
  })
}
