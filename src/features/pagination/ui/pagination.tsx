import { FC, memo, useCallback, useEffect, useState } from 'react';
import { IPaginationProps } from '../model/paginationTypes';
import { addLoader, Button, useAppDispatch } from '@/shared';
import { useRouter } from 'next/router';
import styles from './pagination.module.css';

export const Pagination: FC<IPaginationProps> = memo(({ count }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState('');
  const dispatch = useAppDispatch();

  const handleClick = useCallback(
    (i: number) => {
      if (i !== Number(currentPage) + 1) {
        dispatch(addLoader());
        router.push(
          `/?search=${localStorage.getItem('search') || ''}&page=${String(i)}`,
          undefined,
          {
            shallow: false,
          }
        );
      }
    },
    [currentPage, dispatch, router]
  );

  useEffect(() => {
    const page = router.query.page;

    if (!page) {
      setCurrentPage('0');
    } else {
      setCurrentPage(String(+page - 1));
    }
  }, [router.query.page]);

  return (
    <div className={styles.container}>
      {Array.from({ length: Math.ceil(Number(count) / 10) }, (_, i) => (
        <Button
          onClick={() => handleClick(i + 1)}
          className={styles.button}
          text={String(i + 1)}
          key={i}
          classNameButton={Number(currentPage) === i ? 'flat' : 'outline'}
        />
      ))}
    </div>
  );
});

Pagination.displayName = 'Pagination';
