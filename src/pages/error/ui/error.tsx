import { FC, memo } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Button } from '@/shared';
import styles from './error.module.css';

export const Error: FC = memo(() => {
  const error = '404';
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  console.error(error);

  return (
    <div className={styles.wrapper}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error}</i>
      </p>
      <Button
        text="Home page"
        onClick={() =>
          navigate(`/?search=${searchParams.get('search')}&page=1`)
        }
        className={styles.button}
      />
    </div>
  );
});

Error.displayName = 'Error';
