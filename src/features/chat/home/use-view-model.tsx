import { useNavigation } from 'react-router-dom';
import { useChatHomeModel } from './use-model';

export function useChatHomeViewModel() {
  const { initChatMutation } = useChatHomeModel();
  const navigation = useNavigation();

  const handleInitChat = () => {
    initChatMutation.mutate({
      source: 'general',
    });
  };

  const isPending =
    initChatMutation.isPending || navigation.state === 'submitting';

  return { handleInitChat, isPending };
}
