import { useActionData, useLoaderData, useNavigate } from 'react-router-dom';
import { ChatAnswerResponse, ChatSessionMessagesResponse } from '@/types/chat';
import { CTAButton } from '@/components/ui/cta-button/cta-button';

export function ChatView() {
  const navigate = useNavigate();

  const actionData = useActionData() as
    | { response: ChatAnswerResponse }
    | undefined;

  const loaderData = useLoaderData() as {
    messages: ChatSessionMessagesResponse;
  };

  console.log({ actionData, loaderData });

  return (
    <main>
      <h1>Chat session</h1>
      <CTAButton type='button' onClick={() => navigate('/')}>
        Go back
      </CTAButton>
    </main>
  );
}
