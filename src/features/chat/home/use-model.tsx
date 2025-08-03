import { useSubmit } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { initChatSession } from '@/features/chat/api/endpoints';

export function useChatHomeModel() {
  const submit = useSubmit();

  const initChatMutation = useMutation({
    mutationFn: initChatSession,
    onSuccess: (data) => {
      submit(
        {
          source: 'general',
          sessionId: data.sessionId,
          question: 'Hello, need some help with tasks',
        },
        {
          method: 'POST',
          action: `/chats/${data.sessionId}`,
          encType: 'application/json',
        }
      );
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  return { initChatMutation };
}
