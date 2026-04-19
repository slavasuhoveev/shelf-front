"use client"

import { useState } from "react"
import { useAlbumWorks } from "@/features/albumWork/hooks/useAlbumWorks"
import { useCreateAlbumWork } from "@/features/albumWork/hooks/useCreateAlbumWork"
import { useDeleteAlbumWork } from "@/features/albumWork/hooks/useDeleteAlbumWork"
import { useUpdateAlbumWork } from "@/features/albumWork/hooks/useUpdateAlbumWork"

export default function AlbumWorksPage() {
  const { data, isLoading } = useAlbumWorks()

  const createMutation = useCreateAlbumWork()
  const deleteMutation = useDeleteAlbumWork()
  const updateMutation = useUpdateAlbumWork()

  const [title, setTitle] = useState("")
  const [artist, setArtist] = useState("")

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">Album Works</h1>

      {/* CREATE */}
      <div className="space-x-2">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-2 py-1"
        />
        <input
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          className="border px-2 py-1"
        />

        <button
          onClick={() =>
            createMutation.mutate({ title, artist })
          }
          className="bg-black text-white px-3 py-1"
        >
          Add
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-2">
        {data?.map((album) => (
          <div
            key={album.id}
            className="border p-2 flex justify-between items-center"
          >
            <div>
              <b>{album.title}</b> — {album.artist}
            </div>

            <div className="space-x-2">
              <button
                onClick={() =>
                  updateMutation.mutate({
                    id: album.id,
                    data: { title: album.title + " (edited)" },
                  })
                }
                className="text-blue-600"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteMutation.mutate(album.id)
                }
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
