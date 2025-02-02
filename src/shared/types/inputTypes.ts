export interface IInputProps {
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter: () => void;
  className?: string[];
}
