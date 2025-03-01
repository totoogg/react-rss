import { addLoader, Button, useAppDispatch } from '@/shared';
import { FC, memo, useCallback } from 'react';
import styles from './close.module.css';
import { useRouter } from 'next/router';

export const Close: FC = memo(() => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => {
    dispatch(addLoader());
    router.push(
      `/?search=${router.query.search}&page=${router.query.page}`,
      undefined,
      {
        shallow: false,
      }
    );
  }, [dispatch, router]);

  return (
    <Button onClick={handleClick} className={styles.escape}>
      <span className={styles.line_escape} />
      <span className={styles.line_escape} />
    </Button>
  );
});

Close.displayName = 'Close';
