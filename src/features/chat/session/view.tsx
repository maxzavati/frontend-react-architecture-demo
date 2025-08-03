import { useNavigate } from 'react-router-dom';
import { useChatSessionModel } from './use-model';
import { CTAButton } from '@/components/ui/cta-button/cta-button';
import { ChatWindowView } from '../components/chat-window/view';

export function ChatSessionView() {
  const { actionData, loaderData } = useChatSessionModel();
  const navigate = useNavigate();

  console.log({ actionData, loaderData });

  return (
    <main>
      <h1>Chat session</h1>
      <CTAButton type='button' onClick={() => navigate('/')}>
        Go back
      </CTAButton>
      <ChatWindowView />
    </main>
  );
}
