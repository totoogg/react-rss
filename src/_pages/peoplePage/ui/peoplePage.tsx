'use client';

import { FC, useCallback } from 'react';
import { PersonDetail } from '@/widgets';
import styles from './peoplePage.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { addLoader, useAppDispatch } from '@/shared';

export const PeoplePage: FC = () => {
  const router = useRouter();
  const query = useSearchParams();
  const page = query.get('page');
  const search = query.get('search');
  const dispatch = useAppDispatch();

  const handleClick = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        const target = e.target as HTMLElement;
        if (
          target.className.includes('wrapper') ||
          target.className.includes('page')
        ) {
          dispatch(addLoader());
          router.push(`/?search=${search}&page=${page}`);
        }
      }
    },
    [dispatch, page, router, search]
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
