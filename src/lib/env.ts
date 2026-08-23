export function getEnv() {
  const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL
  const SHELF_API_URL = process.env.NEXT_PUBLIC_SHELF_API_URL

  if (!AUTH_API_URL) {
    throw new Error("Missing NEXT_PUBLIC_AUTH_API_URL")
  }

  if (!SHELF_API_URL) {
    throw new Error("Missing NEXT_PUBLIC_SHELF_API_URL")
  }

  return {
    AUTH_API_URL,
    SHELF_API_URL,
  }
}
