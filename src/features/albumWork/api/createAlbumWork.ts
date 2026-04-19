import { api } from "@/lib/api/client"
import { endpoints } from "@/lib/api/endpoints"
import { AlbumWorkSchema } from "../schemas/albumWork.schema"

export type CreateAlbumWorkRequest = {
  title: string
  artist: string
  year?: number
}

export function createAlbumWork(data: CreateAlbumWorkRequest) {
  return api(
    endpoints.shelf.albumWorks.list,
    AlbumWorkSchema,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  )
}
