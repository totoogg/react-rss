import { FC, memo } from 'react';
import { IChooseProps } from '@/shared/types';
import styles from './choose.module.css';

export const Choose: FC<IChooseProps> = memo(
  ({ id, onChoose, isChecked, className }) => {
    return (
      <>
        <input
          type="checkbox"
          className={styles['custom-checkbox']}
          id={`choose-${id}`}
          name="choose"
          onChange={onChoose}
          checked={isChecked}
        />
        <label htmlFor={`choose-${id}`} className={className}></label>
      </>
    );
  }
);

Choose.displayName = 'Choose';
