import { FC, memo } from 'react';
import { IInputProps } from '@/shared/types/inputTypes';
import styles from './input.module.css';

export const Input: FC<IInputProps> = memo(
  ({ name, onChange, onEnter, placeholder, type, value, className }) => {
    return (
      <input
        className={[styles.input, className?.join(' ')].join(' ')}
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === 'Enter' && onEnter()}
      />
    );
  }
);

Input.displayName = 'Input';
