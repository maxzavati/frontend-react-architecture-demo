import { useChatHomeViewModel } from './use-view-model';
import { CTAButton } from '@/components/ui/cta-button/cta-button';

export function ChatHomeView() {
  const { handleInitChat, isPending } = useChatHomeViewModel();

  return (
    <main>
      <h1>Welcome</h1>
      <CTAButton type='button' onClick={handleInitChat} disabled={isPending}>
        {isPending ? 'Loading...' : 'Start new chat'}
      </CTAButton>
    </main>
  );
}
