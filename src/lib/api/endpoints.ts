import { getEnv } from "@/lib/env";

const env = getEnv();

export const endpoints = {
  auth: {
    register: `${env.AUTH_API_URL}/register`,
    login: `${env.AUTH_API_URL}/login`,
    refresh: `${env.AUTH_API_URL}/refresh`,
    logout: `${env.AUTH_API_URL}/logout`,
    me: `${env.AUTH_API_URL}/me`,
  },

  shelf: {
    albumWorks: {
      list: `${env.SHELF_API_URL}/api/album-works`,
      detail: (id: string) => `${env.SHELF_API_URL}/api/album-works/${id}`,
    },
  }
}
