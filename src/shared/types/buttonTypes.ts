import { ButtonHTMLAttributes } from 'react';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  classNameButton?: 'flat' | 'outline';
  disabledCustom?: boolean;
}
