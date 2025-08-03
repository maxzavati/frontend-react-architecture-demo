interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenTtlMs: number;
  refreshTokenTtlMs: number;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type RegisterResponse = AuthResponse;

export interface LoginRequest {
  email: string;
  password: string;
}

export type LoginResponse = AuthResponse;
