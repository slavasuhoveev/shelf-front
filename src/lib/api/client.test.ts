import { z } from "zod";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ApiError, api } from "./client";
import { getAccessToken, refreshAccessToken } from "@/lib/api/auth";

vi.mock("@/lib/api/auth", () => ({
  getAccessToken: vi.fn(),
  refreshAccessToken: vi.fn(),
}));

const TestSchema = z.object({
  ok: z.boolean(),
});

const jsonResponse = (body: unknown, init?: ResponseInit) =>
  new Response(JSON.stringify(body), {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

const fetchMock = vi.fn<typeof fetch>();
const getAccessTokenMock = vi.mocked(getAccessToken);
const refreshAccessTokenMock = vi.mocked(refreshAccessToken);

describe("api", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
    fetchMock.mockReset();
    getAccessTokenMock.mockReset();
    refreshAccessTokenMock.mockReset();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("parses a successful JSON response with the provided schema", async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }));

    await expect(api("/test", TestSchema)).resolves.toEqual({ ok: true });
  });

  it("adds the bearer token when one is available", async () => {
    getAccessTokenMock.mockReturnValue("access-token");
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }));

    await api("/test", TestSchema);

    expect(fetchMock).toHaveBeenCalledWith(
      "/test",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer access-token",
        }),
      })
    );
  });

  it("does not add authorization when skipAuth is true", async () => {
    getAccessTokenMock.mockReturnValue("access-token");
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }));

    await api("/test", TestSchema, { skipAuth: true });

    expect(fetchMock).toHaveBeenCalledWith(
      "/test",
      expect.objectContaining({
        headers: expect.not.objectContaining({
          Authorization: expect.any(String),
        }),
      })
    );
  });

  it("refreshes the token and retries once after a 401", async () => {
    getAccessTokenMock
      .mockReturnValueOnce("expired-token")
      .mockReturnValueOnce("fresh-token");
    refreshAccessTokenMock.mockResolvedValueOnce(true);
    fetchMock
      .mockResolvedValueOnce(jsonResponse({ message: "Unauthorized" }, { status: 401 }))
      .mockResolvedValueOnce(jsonResponse({ ok: true }));

    await expect(api("/test", TestSchema)).resolves.toEqual({ ok: true });

    expect(refreshAccessTokenMock).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "/test",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer fresh-token",
        }),
      })
    );
  });

  it("throws unauthorized when token refresh fails", async () => {
    refreshAccessTokenMock.mockResolvedValueOnce(false);
    fetchMock.mockResolvedValueOnce(
      jsonResponse({ message: "Unauthorized" }, { status: 401 })
    );

    await expect(api("/test", TestSchema)).rejects.toMatchObject({
      message: "Unauthorized",
      status: 401,
    });
  });

  it("throws ApiError with response message and code", async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse(
        { message: "Email is already taken", code: "EMAIL_TAKEN" },
        { status: 409 }
      )
    );

    await expect(api("/test", TestSchema, { skipAuth: true })).rejects.toEqual(
      expect.objectContaining({
        message: "Email is already taken",
        status: 409,
        code: "EMAIL_TAKEN",
      })
    );
  });

  it("uses a fallback message when the error response is not JSON", async () => {
    fetchMock.mockResolvedValueOnce(new Response("Nope", { status: 500 }));

    await expect(api("/test", TestSchema, { skipAuth: true })).rejects.toEqual(
      expect.objectContaining({
        message: "Request failed",
        status: 500,
      })
    );
  });

  it("throws validation errors for unexpected successful responses", async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: "yes" }));

    await expect(api("/test", TestSchema, { skipAuth: true })).rejects.toBeInstanceOf(
      z.ZodError
    );
  });

  it("creates ApiError instances with the right prototype", () => {
    expect(new ApiError("Boom", 500)).toBeInstanceOf(ApiError);
  });
});
