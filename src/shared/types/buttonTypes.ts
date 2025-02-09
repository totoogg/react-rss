export interface IButtonProps {
  onClick: () => void;
  text?: string;
  disabled?: boolean;
  classNameButton?: 'flat' | 'outline';
  className?: string[];
  children?: React.ReactNode;
}
