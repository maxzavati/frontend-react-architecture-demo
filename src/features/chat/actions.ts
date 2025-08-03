import { type ActionFunctionArgs } from 'react-router-dom';
import { ChatAnswerRequest } from './api/types';
import { chatAnswer } from './api/endpoints';
import { useChatStore } from './store';

export const chatAction = async ({ request }: ActionFunctionArgs) => {
  const payload: ChatAnswerRequest = await request.json();
  const response = await chatAnswer(payload);

  // Cleanups
  useChatStore.getState().clearMessages();
  sessionStorage.removeItem('initialQuestion');

  return {
    response,
    redirectTo: `/chats/${response.sessionId}`,
  };
};
