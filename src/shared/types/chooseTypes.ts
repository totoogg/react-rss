import { InputHTMLAttributes } from 'react';

export interface IChooseProps extends InputHTMLAttributes<HTMLInputElement> {
  isChecked: boolean;
  onChoose: () => void;
}
