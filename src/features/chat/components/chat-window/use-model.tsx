import { useMemo } from 'react';
import { useMessages } from '../../store';
import { useParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getChatSessionMessages } from '../../api/endpoints';

const PER_PAGE = 5;

export function useChatWindowModel() {
  const params = useParams();
  const messages = useMessages();

  const sessionId = params.id;

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['getChatSessionMessages', sessionId],
    queryFn: ({ pageParam }) =>
      getChatSessionMessages({
        page: pageParam,
        limit: PER_PAGE,
        sessionId: sessionId || '',
      }),
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, allPages) => {
      const { total } = lastPage;
      const fetchedSoFar = allPages.reduce((sum, page) => sum + page.count, 0);
      if (fetchedSoFar >= total) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });

  // Should be used for loadMore and scroll position
  const messagesHistory = useMemo(() => {
    if (!data) {
      return [];
    }
    // 1. Reverse the pages array (to get oldest pages first)
    // 2. FlatMap to combine all messages
    return [...data.pages].reverse().flatMap((page) => page.list);
  }, [data]);

  // NOTE: `allMessages` is for optimistic re-render - do not use it's length for `loadMore` or scroll position adjustemnt!
  const allMessages = [...messagesHistory, ...messages].slice(1); // `slice(1)` to skip first welcome message
  const hasMessages = allMessages.length > 0;
  const total = data ? data.pages[0].total : 0;
  const isInitialLoading = isFetching && !isFetchingNextPage;
  const isFetchingMore = isFetching && isFetchingNextPage;

  return {
    fetchNextPage,
    hasNextPage,
    hasMessages,
    messagesHistory,
    isInitialLoading,
    isFetchingMore,
    isFetchingNextPage,
    total,
    error,
    allMessages,
    PER_PAGE,
  };
}
