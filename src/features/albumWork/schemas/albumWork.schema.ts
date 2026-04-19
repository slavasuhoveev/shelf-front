import { z } from "zod"

export const AlbumWorkSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  artist: z.string(),
  year: z.number().optional(),
})

export const AlbumWorksResponseSchema = z.array(AlbumWorkSchema)

export type AlbumWork = z.infer<typeof AlbumWorkSchema>
export type AlbumWorksResponse = z.infer<typeof AlbumWorksResponseSchema>
