import { FC, memo, useEffect, useState } from 'react';
import styles from './select.module.css';
import { ISelectProps } from '@/shared/types';

export const Select: FC<ISelectProps> = memo(
  ({ onChange, options, label, className }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest(`.${className}`)) {
          setShowOptions(false);
        }
      };

      document.addEventListener('click', handleOutsideClick);

      return () => {
        document.removeEventListener('click', handleOutsideClick);
      };
    }, [className]);

    const handleSelect = (option: string) => {
      setSelectedOption(option);
      setShowOptions(false);
      onChange(option);
    };

    const handleClick = () => setShowOptions(!showOptions);

    return (
      <div className={[styles['custom-select'], className].join(' ')}>
        <div className={styles['select-box']} onClick={handleClick}>
          {selectedOption ? selectedOption : label}
        </div>
        <div
          className={[styles.options, showOptions ? styles.show : ''].join(' ')}
        >
          {' '}
          {options.map((option) => (
            <div
              key={option}
              className={styles.option}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';
