import { FC, useCallback } from 'react';
import { PersonDetail } from '@/widgets';
import styles from './peoplePage.module.css';
import { useRouter } from 'next/router';

export const PeoplePage: FC = () => {
  const router = useRouter();

  const handleClick = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        const target = e.target as HTMLElement;
        if (
          target.className.includes('wrapper') ||
          target.className.includes('page')
        ) {
          router.push(
            `/?search=${router.query.search}&page=${router.query.page}`,
            undefined,
            {
              shallow: true,
            }
          );
        }
      }
    },
    [router]
  );

  return (
    <div className={styles.page} onClick={handleClick}>
      <div className={styles.wrapper}>
        <div className={styles.detail}>
          <PersonDetail />
        </div>
      </div>
    </div>
  );
};
