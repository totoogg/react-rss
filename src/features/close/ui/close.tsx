'use client';

import { addLoader, Button, useAppDispatch } from '@/shared';
import { FC, memo, useCallback } from 'react';
import styles from './close.module.css';
import { useRouter, useSearchParams } from 'next/navigation';

export const Close: FC = memo(() => {
  const router = useRouter();
  const query = useSearchParams();
  const page = query.get('page');
  const search = query.get('search');
  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => {
    dispatch(addLoader());
    router.push(`/?search=${search}&page=${page}`);
    router.refresh();
  }, [dispatch, page, router, search]);

  return (
    <Button onClick={handleClick} className={styles.escape}>
      <span className={styles.line_escape} />
      <span className={styles.line_escape} />
    </Button>
  );
});

Close.displayName = 'Close';
