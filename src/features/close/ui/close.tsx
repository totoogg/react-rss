import { Button } from '@/shared';
import { FC, memo, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import styles from './close.module.css';

export const Close: FC = memo(() => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleClick = useCallback(
    () => navigate(`/?${searchParams.toString()}`),
    [navigate, searchParams]
  );

  return (
    <Button onClick={handleClick} className={styles.escape}>
      <span className={styles.line_escape} />
      <span className={styles.line_escape} />
    </Button>
  );
});

Close.displayName = 'Close';
