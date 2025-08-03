import { useActionData, useLoaderData } from 'react-router-dom';
import { ChatAnswerResponse, ChatSessionMessagesResponse } from '../api/types';

export function useChatSessionModel() {
  const actionData = useActionData() as
    | { response: ChatAnswerResponse }
    | undefined;

  const loaderData = useLoaderData() as {
    messages: ChatSessionMessagesResponse;
  };

  return { actionData, loaderData };
}
