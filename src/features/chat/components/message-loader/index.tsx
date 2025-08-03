import React from 'react';
import s from './styles.module.css';

type DotsSize = 'small' | 'medium' | 'large';

interface Props {
  color?: string;
  size?: DotsSize;
  variant?: 'text' | 'voice';
}

export function MessageLoader({
  color = '#999',
  size = 'medium',
  variant = 'text',
}: Props) {
  const sizeMap: Record<string, string> = {
    small: '6px',
    medium: '8px',
    large: '10px',
  };

  const dotSize =
    typeof size === 'string' && size in sizeMap ? sizeMap[size] : size;

  return (
    <div
      className={`${s.root} ${s[variant]}`}
      style={
        {
          '--dot-color': color,
          '--dot-size': dotSize,
        } as React.CSSProperties
      }
    >
      <div className={s.dot}></div>
      <div className={s.dot}></div>
      <div className={s.dot}></div>
    </div>
  );
}
