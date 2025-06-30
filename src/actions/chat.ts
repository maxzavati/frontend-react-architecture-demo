import { sendChatMessage } from '@/apis/chat';
import { ChatAnswerRequest } from '@/types/chat';
import { type ActionFunctionArgs } from 'react-router-dom';

export const chatAction = async ({ request }: ActionFunctionArgs) => {
  // Ensure it's a POST request (prevent running on page reload)
  if (request.method !== 'POST') {
    return null;
  }

  const payload: ChatAnswerRequest = await request.json();
  const response = await sendChatMessage(payload);

  return {
    response,
    redirectTo: `/chats/${response.sessionId}`,
  };
};
