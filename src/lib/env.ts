export const env = {
  AUTH_API_URL: process.env.NEXT_PUBLIC_AUTH_API_URL ?? "",
  SHELF_API_URL: process.env.NEXT_PUBLIC_SHELF_API_URL ?? "",
};

if (!env.AUTH_API_URL) throw new Error("Missing NEXT_PUBLIC_AUTH_API_URL");
if (!env.SHELF_API_URL) throw new Error("Missing NEXT_PUBLIC_SHELF_API_URL");
