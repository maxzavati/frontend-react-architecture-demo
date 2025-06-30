import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '@/types/auth';
import api from '@/instances/api';

export async function register(
  payload: RegisterRequest
): Promise<RegisterResponse> {
  const res = await api.post('/auth/login', payload);
  return res.data;
}

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const res = await api.post('/auth/login', payload);
  return res.data;
}

export async function logout(): Promise<void> {
  const res = await api.post('/auth/logout');
  return res.data;
}

export async function getNewAccessToken(payload: {
  refreshToken: string;
}): Promise<{
  accessToken: string;
  accessTokenTtlMs: number;
}> {
  const res = await api.post('/auth/refresh', payload);
  return res.data;
}
