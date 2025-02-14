import { FC, memo, useCallback, useEffect, useState } from 'react';
import { IPaginationProps } from '../model/paginationTypes';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/shared';
import styles from './pagination.module.css';

export const Pagination: FC<IPaginationProps> = memo(({ count }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState('');

  const handleClick = useCallback(
    (i: number) => {
      if (i !== Number(currentPage) + 1) {
        setSearchParams(
          { page: String(i), search: localStorage.getItem('search') || '' },
          { replace: true }
        );
      }
    },
    [currentPage, setSearchParams]
  );

  useEffect(() => {
    const page = searchParams.get('page');

    if (!page) {
      setCurrentPage('0');
    } else {
      setCurrentPage(String(+page - 1));
    }
  }, [searchParams]);

  return (
    <div className={styles.container}>
      {Array.from({ length: Math.ceil(Number(count) / 10) }, (_, i) => (
        <Button
          onClick={() => handleClick(i + 1)}
          className={[styles.button]}
          text={String(i + 1)}
          key={i}
          classNameButton={Number(currentPage) === i ? 'flat' : 'outline'}
        />
      ))}
    </div>
  );
});

Pagination.displayName = 'Pagination';
