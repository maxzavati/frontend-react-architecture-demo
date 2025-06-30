import { ButtonHTMLAttributes, ReactNode } from 'react';
import s from './styles.module.css';

interface Props {
  children: ReactNode;
  type: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick?: () => void;
  variant?: 'contained' | 'outlined' | 'outlined2' | 'text';
  disabled?: boolean;
  pending?: boolean;
  className?: string;
  width?: string | number;
  height?: string | number;
}

export function CTAButton({
  children,
  onClick,
  type,
  variant = 'contained',
  disabled = false,
  pending = false,
  className = '',
  height = 48,
  width = 'max-content',
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || pending}
      className={`${s.root} ${s[variant]} ${
        pending ? s.pending : ''
      } ${className}`}
      style={{
        height,
        width: width,
      }}
    >
      {children}
    </button>
  );
}
