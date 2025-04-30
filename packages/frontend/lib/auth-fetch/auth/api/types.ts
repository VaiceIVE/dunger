export interface AuthTokensResult {
  accessToken: string;
  accessTokenExpiresIn: number; // in seconds
  refreshToken: string;
  refreshTokenExpiresIn: number; // in seconds
}

export interface AuthMethodReturn {
  data: AuthTokensResult | null;
  error?: Error;
}
