import { FC, memo } from 'react';
import { Pagination } from '@/features';
import { useSearchPeople } from '@/shared';
import { IMainProps } from '../model/mainType';
import styles from './main.module.css';

export const Main: FC<IMainProps> = memo(({ children }) => {
  const { count, people } = useSearchPeople();

  return (
    <div className={styles.main}>
      {+count > 10 ? <Pagination count={String(count)} /> : ''}
      <div className={styles.gallery}>
        {people.length > 0 ? (
          children
        ) : (
          <div className={styles.notFound}>
            No characters with the name &quot;
            {localStorage.getItem('search')}
            &quot; found
          </div>
        )}
      </div>
      {+count > 10 ? <Pagination count={String(count)} /> : ''}
    </div>
  );
});

Main.displayName = 'Main';
