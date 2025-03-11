import { FC, memo } from 'react';
import styles from './input.module.css';
import { IInputProps } from '@/shared/types';

export const Input: FC<IInputProps> = memo(
  ({
    name,
    onChange,
    placeholder,
    type,
    value,
    className,
    refInput,
    list,
    id,
  }) => {
    return (
      <input
        className={[styles.input, className].join(' ')}
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        ref={refInput}
        list={list}
        id={id}
      />
    );
  }
);

Input.displayName = 'Input';
