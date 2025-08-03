import { authRouteGuard } from '@/guards/auth';
import { LoaderFunctionArgs } from 'react-router-dom';
import { getChatSessionMessages } from './api/endpoints';

export async function chatHomeLoader() {
  await authRouteGuard();
  return {};
}

export async function chatSessionLoader({ params }: LoaderFunctionArgs) {
  await authRouteGuard();

  const sessionId = params.id;

  if (!sessionId) {
    throw new Error('Session ID is required');
  }

  const messages = await getChatSessionMessages({
    page: 1,
    limit: 25,
    sessionId,
  });

  return { messages };
}
