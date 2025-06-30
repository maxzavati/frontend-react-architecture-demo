import { ChangeEvent, useRef } from 'react';
import s from './styles.module.css';

interface Props {
  value: string;
  onChage: (value: string) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

export function TextArea({
  value,
  onChage,
  onKeyDown,
  placeholder = 'Enter text.',
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChage(e.target.value);
    if (ref.current) {
      // Reset height to get correct scrollHeight
      ref.current.style.height = 'auto';
      // Set new height based on content
      ref.current.style.height = `${ref.current.scrollHeight}px`;
      // Limit to max height
      if (ref.current.scrollHeight > 200) {
        ref.current.style.height = '200px';
      }
    }
  };

  return (
    <textarea
      ref={ref}
      value={value}
      className={s.root}
      onKeyDown={onKeyDown}
      onChange={handleInput}
      placeholder={placeholder}
    />
  );
}
