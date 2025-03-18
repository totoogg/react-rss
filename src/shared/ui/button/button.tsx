import { FC } from 'react';
import { IButtonProps } from '@/shared/types';
import styles from './button.module.css';

export const Button: FC<IButtonProps> = ({
  onClick,
  text,
  className,
  classNameButton,
  disabled,
  children,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={[
        styles.button,
        classNameButton === 'flat' ? styles.flat : styles.outline,
        className,
      ].join(' ')}
    >
      {text ? text : children}
    </button>
  );
};

Button.displayName = 'Button';
