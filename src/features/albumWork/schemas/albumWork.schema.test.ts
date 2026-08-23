import { describe, expect, it } from "vitest";
import { AlbumWorkSchema, AlbumWorksResponseSchema } from "./albumWork.schema";

const albumWork = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  title: "Kind of Blue",
  artist: "Miles Davis",
  year: 1959,
};

describe("AlbumWorkSchema", () => {
  it("accepts album work data with an optional year", () => {
    expect(AlbumWorkSchema.parse(albumWork)).toEqual(albumWork);

    expect(
      AlbumWorkSchema.parse({
        id: albumWork.id,
        title: albumWork.title,
        artist: albumWork.artist,
      })
    ).toEqual({
      id: albumWork.id,
      title: albumWork.title,
      artist: albumWork.artist,
    });
  });

  it("rejects invalid ids", () => {
    const result = AlbumWorkSchema.safeParse({
      ...albumWork,
      id: "not-a-uuid",
    });

    expect(result.success).toBe(false);
  });
});

describe("AlbumWorksResponseSchema", () => {
  it("accepts an array of album works", () => {
    expect(AlbumWorksResponseSchema.parse([albumWork])).toEqual([albumWork]);
  });
});
