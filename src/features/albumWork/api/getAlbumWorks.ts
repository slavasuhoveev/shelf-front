import { api } from "@/lib/api/client"
import { endpoints } from "@/lib/api/endpoints"
import { AlbumWorksResponseSchema } from "../schemas/albumWork.schema"

export function getAlbumWorks() {
  return api(
    endpoints.shelf.albumWorks.list,
    AlbumWorksResponseSchema
  )
}
