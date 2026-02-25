import { env } from "@/lib/env";

type FetchOptions = RequestInit & {
  skipAuth?: boolean;
};

let accessToken: string | null = null;
let refreshPromise: Promise<boolean> | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

async function safeParseJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Try to refresh access token using refresh cookie.
 * Returns true if refreshed, false otherwise.
 */
export async function refreshAccessToken(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const res = await fetch(`${env.AUTH_API_URL}/refresh`, {
          method: "POST",
          credentials: "include",
        });

        if (!res.ok) {
          setAccessToken(null);
          return false;
        }

        const data = await res.json();
        setAccessToken(data.access_token);
        return true;
      } catch {
        setAccessToken(null);
        return false;
      } finally {
        refreshPromise = null;
      }
    })();
  }

  return refreshPromise;
}

export async function fetcher<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const headers = new Headers(options.headers);

  if (!options.skipAuth && accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  /**
   * 401 handling:
   * - refresh ONLY if we HAD access token
   * - do NOT refresh for guests
   */
  if (
    response.status === 401 &&
    !options.skipAuth
  ) {
    const refreshed = await refreshAccessToken();

    if (!refreshed || !accessToken) {
      throw new Error("UNAUTHORIZED");
    }

    headers.set("Authorization", `Bearer ${accessToken}`);

    const retryResponse = await fetch(url, {
      ...options,
      headers,
      credentials: "include",
    });

    if (!retryResponse.ok) {
      const errorBody = await safeParseJson(retryResponse);
      throw errorBody ?? { status: retryResponse.status };
    }

    return retryResponse.json();
  }

  if (!response.ok) {
    const errorBody = await safeParseJson(response);
    throw errorBody ?? { status: response.status };
  }

  return response.json();
}
