import { redirectIfAuth } from '@/guards/auth';

export async function publicLoader() {
  await redirectIfAuth();

  return {};
}
