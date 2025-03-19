import { FC, memo, useCallback, useMemo } from 'react';
import { IInputProps } from '@/shared/types';
import styles from './input.module.css';

export const Input: FC<IInputProps> = memo(
  ({ name, onChange, onEnter, placeholder, type, value, className }) => {
    const handleEnter = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          onEnter();
        }
      },
      [onEnter]
    );

    const classNameInput = useMemo(
      () => [styles.input, className].join(' '),
      [className]
    );

    return (
      <input
        className={classNameInput}
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
