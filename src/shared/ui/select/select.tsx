import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
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

    const handleSelect = useCallback(
      (option: string) => {
        setSelectedOption(option);
        setShowOptions(false);
        onChange(option);
      },
      [onChange]
    );

    const handleClick = useCallback(() => {
      setShowOptions(!showOptions);
    }, [showOptions]);

    const classNameSelect = useMemo(
      () => [styles['custom-select'], className].join(' '),
      [className]
    );

    const classNameSelectBox = useMemo(
      () => [styles.options, showOptions ? styles.show : ''].join(' '),
      [showOptions]
    );

    return (
      <div className={classNameSelect}>
        <div className={styles['select-box']} onClick={handleClick}>
          {selectedOption ? selectedOption : label}
        </div>
        <div className={classNameSelectBox}>
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
