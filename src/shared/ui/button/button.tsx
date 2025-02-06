import { FC, memo } from 'react';
import { IButtonProps } from '@/shared/types/buttonTypes';
import styles from './button.module.css';

export const Button: FC<IButtonProps> = memo(
  ({ onClick, text, className, classNameButton, disabled }) => {
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className={[
          styles.button,
          classNameButton === 'flat' ? styles.flat : styles.outline,
          className?.join(' '),
        ].join(' ')}
      >
        {text}
      </button>
    );
  }
);

Button.displayName = 'Button';
