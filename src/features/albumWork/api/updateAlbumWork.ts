import { api } from "@/lib/api/client"
import { endpoints } from "@/lib/api/endpoints"
import { AlbumWorkSchema } from "../schemas/albumWork.schema"

export function updateAlbumWork(
  id: string,
  data: Partial<{
    title: string
    artist: string
    year: number
  }>
) {
  return api(
    endpoints.shelf.albumWorks.detail(id),
    AlbumWorkSchema,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    }
  )
}
