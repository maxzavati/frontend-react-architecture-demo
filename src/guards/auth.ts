import {
  isValidToken,
  removeAuthCookies,
  setAccessTokenCookie,
  getAccessTokenCookie,
  getRefreshTokenCookie,
} from '@/utils/auth';
import { redirect } from 'react-router-dom';
import { getNewAccessToken } from '@/apis/auth';

export async function authRouteGuard() {
  const accessToken = getAccessTokenCookie();
  const refreshToken = getRefreshTokenCookie();

  if (
    !isValidToken(accessToken) &&
    refreshToken &&
    isValidToken(refreshToken)
  ) {
    try {
      const response = await getNewAccessToken({ refreshToken });

      setAccessTokenCookie({
        accessToken: response.accessToken,
        maxAge: response.accessTokenTtlMs,
      });

      return response.accessToken;
    } catch (error) {
      console.error(error);
      removeAuthCookies();
      throw redirect('/auth/login');
    }
  }

  if (!isValidToken(accessToken) && !isValidToken(refreshToken)) {
    throw redirect('/auth/login');
  }
}

export async function redirectIfAuth() {
  const accessToken = getAccessTokenCookie();
  const refreshToken = getRefreshTokenCookie();
  if (isValidToken(accessToken) || isValidToken(refreshToken)) {
    throw redirect('/');
  }
}
