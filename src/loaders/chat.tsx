import { LoaderFunctionArgs } from 'react-router-dom';
import { getChatSessionMessages } from '@/apis/chat';
import { authRouteGuard } from '@/guards/auth';

export async function chatLoader({ params }: LoaderFunctionArgs) {
  await authRouteGuard();

  const sessionId = params.id;
  if (!sessionId) {
    throw new Error('Session ID is required');
  }

  const messages = await getChatSessionMessages(sessionId);
  return { messages };
}
