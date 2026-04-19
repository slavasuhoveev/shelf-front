import { api } from "@/lib/api/client"
import { endpoints } from "@/lib/api/endpoints"
import { z } from "zod"

const EmptySchema = z.object({}).passthrough()

export function deleteAlbumWork(id: string) {
  return api(
    endpoints.shelf.albumWorks.detail(id),
    EmptySchema,
    {
      method: "DELETE",
    }
  )
}
