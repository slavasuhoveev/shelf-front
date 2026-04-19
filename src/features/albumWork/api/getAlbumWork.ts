import { api } from "@/lib/api/client"
import { endpoints } from "@/lib/api/endpoints"
import { AlbumWorkSchema } from "../schemas/albumWork.schema"

export function getAlbumWork(id: string) {
  return api(
    endpoints.shelf.albumWorks.detail(id),
    AlbumWorkSchema
  )
}
