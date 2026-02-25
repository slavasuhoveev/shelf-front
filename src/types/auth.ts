export interface LoginRequest {
  email: string;
  password: string;
  device_id: string;
}

export type LoginResponse = {
  access_token: string;
};

export interface RegisterRequest {
  email: string;
  password: string;
  device_id: string;
}

export interface RegisterResponse {
  access_token: string;
}

export interface MeResponse {
  id: string;
  email: string;
  is_verified: boolean;
  created_at: string;
};
