import { fetcher, setAccessToken } from "./fetcher";
import { env } from "@/lib/env";
import { getDeviceId } from "@/lib/device";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  MeResponse,
} from "@/types/auth";

export const authClient = {
  async register(data: Pick<RegisterRequest, "email" | "password">) {
    const payload: RegisterRequest = {
      email: data.email,
      password: data.password,
      device_id: getDeviceId(),
    };

    const response = await fetcher<RegisterResponse>(
      `${env.AUTH_API_URL}/register`,
      {
        method: "POST",
        skipAuth: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    setAccessToken(response.access_token);
    return response;
  },

  async login(data: Pick<LoginRequest, "email" | "password">) {

    const payload: LoginRequest = {
        email: data.email,
        password: data.password,
        device_id: getDeviceId(),
    };

    const response = await fetcher<LoginResponse>(
      `${env.AUTH_API_URL}/login`,
      {
        method: "POST",
        skipAuth: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    setAccessToken(response.access_token);
    return response;
  },

  async refresh() {
    const data = await fetcher<LoginResponse>(
      `${env.AUTH_API_URL}/refresh`,
      {
        method: "POST",
        skipAuth: true,
      }
    );

    setAccessToken(data.access_token);
    return data;
  },

  async logout() {
    await fetcher(`${env.AUTH_API_URL}/logout`, {
      method: "POST",
    });

    setAccessToken(null);
  },

  async me(): Promise<MeResponse> {
    return fetcher<MeResponse>(`${env.AUTH_API_URL}/me`);
  },
};
