import { FC, memo } from 'react';
import { IInputProps } from '@/shared/types';
import styles from './input.module.css';

export const Input: FC<IInputProps> = memo(
  ({ name, onChange, onEnter, placeholder, type, value, className }) => {
    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onEnter();
      }
    };

    return (
      <input
        className={[styles.input, className].join(' ')}
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={handleEnter}
      />
    );
  }
);

Input.displayName = 'Input';
