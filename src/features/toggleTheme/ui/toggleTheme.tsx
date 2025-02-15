import { FC } from 'react';
import { Sun, Moon, useAppDispatch, useAppSelector } from '@/shared';
import { selectIsSun, toggleTheme } from '../model/toggleThemeSlice';
import styles from './toggleTheme.module.css';

export const ToggleTheme: FC = () => {
  const dispatch = useAppDispatch();
  const isSun = useAppSelector(selectIsSun);

  return (
    <div onClick={() => dispatch(toggleTheme())} className={styles.block}>
      {isSun ? <Sun className={styles.svg} /> : <Moon className={styles.svg} />}
    </div>
  );
};
