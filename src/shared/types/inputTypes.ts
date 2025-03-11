import { InputHTMLAttributes, MutableRefObject } from 'react';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  refInput?: MutableRefObject<HTMLInputElement | null>;
}
