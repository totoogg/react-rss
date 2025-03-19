import { FC, memo, useMemo } from 'react';
import { IButtonProps } from '@/shared/types';
import styles from './button.module.css';

export const Button: FC<IButtonProps> = memo(
  ({ onClick, text, className, classNameButton, disabled, children }) => {
    const classNameButtonMemo = useMemo(
      () =>
        [
          styles.button,
          classNameButton === 'flat' ? styles.flat : styles.outline,
          className,
        ].join(' '),
      [className, classNameButton]
    );

    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className={classNameButtonMemo}
      >
        {text ? text : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
