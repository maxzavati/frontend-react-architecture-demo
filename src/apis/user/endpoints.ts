import api from '@/instances/api';
import { UserResponse } from './types';

export async function getUser(): Promise<UserResponse> {
  const res = await api.get('/users/me');
  return res.data;
}
