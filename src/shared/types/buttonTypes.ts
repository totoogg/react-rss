export interface IButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  classNameButton?: 'flat' | 'outline';
  className?: string[];
}
