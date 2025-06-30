import { HTMLInputTypeAttribute, useId } from 'react';
import s from './styles.module.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  label?: string;
  helperText?: string;
}

export function Input({
  value,
  onChange,
  type,
  label,
  helperText,
  placeholder = 'Enter text',
}: Props) {
  const id = useId();

  return (
    <div className={s.root}>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
      {helperText ? <p>{helperText}</p> : null}
    </div>
  );
}
