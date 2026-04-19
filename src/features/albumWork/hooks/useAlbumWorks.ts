import { useQuery } from "@tanstack/react-query"
import { getAlbumWorks } from "../api/getAlbumWorks"

export function useAlbumWorks() {
  return useQuery({
    queryKey: ["albumWorks"],
    queryFn: getAlbumWorks,
  })
}
