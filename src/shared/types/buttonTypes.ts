export interface IButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  className?: 'flat' | 'outline';
}
