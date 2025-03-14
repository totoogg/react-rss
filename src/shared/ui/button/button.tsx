import { FC, memo } from 'react';
import { IButtonProps } from '@/shared/types';
import styles from './button.module.css';

export const Button: FC<IButtonProps> = memo(
  ({
    onClick,
    text,
    className,
    classNameButton,
    disabled,
    disabledCustom,
    type,
    children,
  }) => {
    return (
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={[
          styles.button,
          classNameButton === 'flat' ? styles.flat : styles.outline,
          className,
          disabledCustom ? styles.disabled : '',
        ].join(' ')}
      >
        {text ? text : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
