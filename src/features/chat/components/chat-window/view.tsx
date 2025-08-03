import s from './styles.module.css';
import { Virtuoso } from 'react-virtuoso';
import { Navigate } from 'react-router-dom';
import { MessageBox } from '../message-box';
import { isErrorWithStatus } from '@/utils/api';
import Loader from '@/components/ui/loader/loader';
import { useChatWindowViewModel } from './use-view-model';
import { MessageLoader } from '@/features/chat/components/message-loader';

export function ChatWindowView() {
  const { model, loadMore, isPendingMessage, virtuoso } =
    useChatWindowViewModel();

  const {
    total,
    error,
    hasMessages,
    isInitialLoading,
    messagesHistory,
    isFetchingMore,
    allMessages,
  } = model;

  if (isErrorWithStatus(error, 404)) {
    return <Navigate to='/' replace={true} />;
  }

  if (isInitialLoading) {
    return <Loader />;
  }

  if (!hasMessages) {
    return <div>No messages</div>;
  }

  return (
    <section className={s.root}>
      <div className={`${s.container} ${hasMessages ? s.spaceBetween : ''}`}>
        <div className={s.messages}>
          <Virtuoso
            ref={virtuoso}
            data={allMessages}
            startReached={loadMore}
            useWindowScroll={true}
            followOutput={true}
            alignToBottom={true}
            firstItemIndex={total - messagesHistory.length}
            // atTopThreshold={50}
            // rangeChanged={(range) => setVisibleRange(range)}
            itemContent={(_, item) => (
              <MessageBox
                key={item.createdAt + item.role}
                role={item.role}
                message={item.text}
              />
            )}
            components={{
              Header: () => (isFetchingMore ? <Loader /> : null),
              Footer: () => (isPendingMessage ? <MessageLoader /> : null),
            }}
          />
        </div>
      </div>
    </section>
  );
}
