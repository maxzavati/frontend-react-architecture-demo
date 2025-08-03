import s from './styles.module.css';
import { ChatRole } from '@/features/chat/api/types';
import { parseMarkdown } from '@/instances/markdown';
import markdownStyles from '@/styles/markdown.module.css';

interface Props {
  role: string;
  message: string;
}

export function MessageBox({ role, message }: Props) {
  return (
    <div className={`${s.root} ${s[role]}`}>
      <div
        className={`${s.bubble} ${role == ChatRole.user ? s.userBubble : ''}`}
      >
        {role == ChatRole.assistant ? (
          <div
            className={markdownStyles.markdown}
            dangerouslySetInnerHTML={{ __html: parseMarkdown(message) }}
          />
        ) : (
          <p>{message}</p>
        )}
      </div>
    </div>
  );
}
