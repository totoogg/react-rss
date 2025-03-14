import { FC, forwardRef, memo } from 'react';
import styles from './input.module.css';
import { IInputProps } from '@/shared/types';

export const Input: FC<IInputProps> = memo(
  forwardRef<HTMLInputElement, IInputProps>(
    (
      {
        name,
        onChange,
        placeholder,
        type,
        value,
        className,
        list,
        id,
        refInput,
      },
      ref
    ) => {
      return (
        <input
          className={[styles.input, className].join(' ')}
          placeholder={placeholder}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          ref={ref || refInput}
          list={list}
          id={id}
        />
      );
    }
  )
);

Input.displayName = 'Input';
