import { FC } from 'react';
import { IInputProps } from '@/shared/types';
import styles from './input.module.css';

export const Input: FC<IInputProps> = ({
  name,
  onChange,
  onEnter,
  placeholder,
  type,
  value,
  className,
}) => {
  return (
    <input
      className={[styles.input, className].join(' ')}
      placeholder={placeholder}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onKeyDown={(e) => e.key === 'Enter' && onEnter()}
    />
  );
};

Input.displayName = 'Input';
