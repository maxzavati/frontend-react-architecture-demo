import api from '../instances/api';
import { AxiosError } from 'axios';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import { RECORD_PREFIX } from '@/config';
import { getNewAccessToken } from '@/apis/auth';

const cookies = new Cookies();

export async function refreshToken(error: AxiosError) {
  const refreshToken = getRefreshTokenCookie();

  if (refreshToken && isValidToken(refreshToken)) {
    try {
      const res = await getNewAccessToken({ refreshToken });

      setAccessTokenCookie({
        accessToken: res.accessToken,
        maxAge: res.accessTokenTtlMs,
      });

      // Retry the original request with the new access token
      if (error.config) {
        error.config.headers['Authorization'] = `Bearer ${res.accessToken}`;
        return api(error.config);
      }
    } catch (error) {
      console.error(error);
      authCleanup();
    }
  } else {
    authCleanup();
  }
}

function authCleanup() {
  removeAuthCookies();
  window.location.replace('/auth/login');
}

export function setAccessTokenCookie({
  accessToken,
  maxAge,
}: {
  accessToken: string;
  maxAge: number;
}) {
  cookies.set(`${RECORD_PREFIX}accessToken`, accessToken, {
    path: '/',
    secure: true,
    sameSite: 'strict',
    maxAge: maxAge,
  });
}

export function setRefreshTokenCookie({
  refreshToken,
  maxAge,
}: {
  refreshToken: string;
  maxAge: number;
}) {
  cookies.set(`${RECORD_PREFIX}refreshToken`, refreshToken, {
    path: '/',
    secure: true,
    sameSite: 'strict',
    maxAge: maxAge,
  });
}

export function getAccessTokenCookie(): string | undefined {
  return cookies.get(`${RECORD_PREFIX}accessToken`);
}

export function getRefreshTokenCookie(): string | undefined {
  return cookies.get(`${RECORD_PREFIX}refreshToken`);
}

export function removeAuthCookies() {
  cookies.remove(`${RECORD_PREFIX}accessToken`, {
    path: '/',
    secure: true,
    sameSite: 'strict',
  });
  cookies.remove(`${RECORD_PREFIX}refreshToken`, {
    path: '/',
    secure: true,
    sameSite: 'strict',
  });
}

export function isValidToken(token: string | null | undefined) {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);

    if (!decoded.exp) {
      console.error('Token is missing the "exp" field.');
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const isNearExpired = decoded.exp - currentTime <= 120;

    return !isNearExpired;
  } catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
}
