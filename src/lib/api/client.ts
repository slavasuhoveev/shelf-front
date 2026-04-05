import { z } from "zod"
import { getAccessToken, refreshAccessToken } from "@/lib/api/auth"
import { ApiErrorResponse } from "@/types/errors";

export class ApiError extends Error {
  // override message: string
  status: number
  code?: string

  constructor(message: string, status: number, code?: string) {
    super(message)

    // this.message = message
    this.status = status
    this.code = code

    Object.setPrototypeOf(this, ApiError.prototype)
  }
}

type ApiOptions = RequestInit & {
  skipAuth?: boolean
}

export async function api<TSchema extends z.ZodTypeAny>(
  path: string,
  schema: TSchema,
  init?: ApiOptions
): Promise<z.infer<TSchema>> {

  let accessToken = getAccessToken()

  const request = async () => {
    const response = await fetch(path, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && !init?.skipAuth
          ? { Authorization: `Bearer ${accessToken}` }
          : {}),
        ...(init?.headers ?? {})
      },
      credentials: "include"
    })

    return response
  }

  let response = await request()

  if (response.status === 401 && !init?.skipAuth) {

    const refreshed = await refreshAccessToken()

    if (!refreshed) {
      throw new ApiError("Unauthorized", 401)
    }

    accessToken = getAccessToken()
    response = await request()
  }

  if (!response.ok) {
    let message = "Request failed"
    let code: string | undefined

    try {
      const errorData: ApiErrorResponse = await response.json()
      message = errorData.message || message
      code = errorData.code
    } catch {
      // ignore
    }

    throw new ApiError(message, response.status, code)
  }

  const json = await response.json()

  return schema.parse(json)
}
