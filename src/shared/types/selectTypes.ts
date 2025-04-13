export interface ISelectProps {
  options: string[];
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}
