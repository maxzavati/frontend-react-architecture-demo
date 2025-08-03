import api from '@/instances/api';
import { AccessTokenRefreshRequest, AccessTokenRefreshResponse } from './types';

export async function getNewAccessToken(
  payload: AccessTokenRefreshRequest
): Promise<AccessTokenRefreshResponse> {
  const res = await api.post('/auth/refresh', payload);
  return res.data;
}
