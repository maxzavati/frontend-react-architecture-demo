import { useNavigation, useSubmit } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { CTAButton } from '@/components/ui/cta-button/cta-button';
import { initChatSession } from '@/apis/chat';

export function HomeView() {
  const navigation = useNavigation();
  const submit = useSubmit();

  const initChat = useMutation({
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

  const onInitChat = () => {
    initChat.mutate({
      source: 'general',
    });
  };

  const isPending = initChat.isPending || navigation.state === 'submitting';

  return (
    <main>
      <h1>Welcome</h1>
      <CTAButton type='button' onClick={onInitChat} disabled={isPending}>
        {isPending ? 'Loading...' : 'Start new chat'}
      </CTAButton>
    </main>
  );
}
