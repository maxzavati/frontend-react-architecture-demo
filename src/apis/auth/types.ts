export interface AccessTokenRefreshRequest {
  refreshToken: string;
}

export interface AccessTokenRefreshResponse {
  accessToken: string;
  accessTokenTtlMs: number;
}
