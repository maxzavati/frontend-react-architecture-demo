import { authRouteGuard } from '@/guards/auth';

export async function indexLoader() {
  await authRouteGuard();

  return {};
}
