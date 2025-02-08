import { FC, memo, useCallback, useEffect, useState } from 'react';
import { IPaginationProps } from '../model/paginationTypes';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/shared';
import styles from './pagination.module.css';

export const Pagination: FC<IPaginationProps> = memo(({ count }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('');

  const handleClick = useCallback(
    (i: number) => {
      if (i !== Number(currentPage) + 1) {
        navigate(`/${location.search.split('&')[0]}&page=${i}`);
        navigate(0);
      }
    },
    [currentPage, location, navigate]
  );

  useEffect(() => {
    const page = location.search
      .split('&')
      .find((el) => el.includes('page'))
      ?.split('=')[1];
    if (!page) {
      setCurrentPage('0');
    } else {
      setCurrentPage(String(+page - 1));
    }
  }, [location.search]);

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
