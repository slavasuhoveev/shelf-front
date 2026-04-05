import { refresh } from "@/features/auth/api/refresh";

let accessToken: string | null = null;
let refreshPromise: Promise<boolean> | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken
}

/**
 * Try to refresh access token using refresh cookie.
 * Returns true if refreshed, false otherwise.
 */
export async function refreshAccessToken(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const data = await refresh()

        setAccessToken(data.access_token)
        return true

      } catch {
        setAccessToken(null)
        return false

      } finally {
        refreshPromise = null
      }
    })()
  }

  return refreshPromise
}
