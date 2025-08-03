import { useRef } from 'react';
import { VirtuosoHandle } from 'react-virtuoso';
import { useChatWindowModel } from './use-model';
import { useIsPendingMessage } from '../../store';

export function useChatWindowViewModel() {
  const model = useChatWindowModel();
  const { fetchNextPage, hasNextPage, isFetchingNextPage, PER_PAGE } = model;

  const virtuoso = useRef<VirtuosoHandle>(null);
  const isPendingMessage = useIsPendingMessage();

  const loadMore = async () => {
    if (isFetchingNextPage || !hasNextPage) {
      return;
    }
    // const previousLength = messagesHistory.length;

    const { data } = await fetchNextPage();
    if (data) {
      requestAnimationFrame(() => {
        if (virtuoso.current) {
          virtuoso.current.scrollToIndex({
            index: PER_PAGE, // Top fist message will have index 0. Therefore `PER_PAGE` value will adjust the scroll to show the last message on the bottom from a newly fetched data.
            align: 'center',
            behavior: 'auto',
          });
        }
      });
    }
  };

  return { model, loadMore, isPendingMessage, virtuoso };
}
