import { FC, memo } from 'react';
import { useLocation, useNavigate, useRouteError } from 'react-router-dom';
import { Button } from '@/shared';
import styles from './error.module.css';

export const Error: FC = memo(() => {
  const error = useRouteError() as { statusText: string };
  const navigate = useNavigate();
  const location = useLocation();
  console.error(error);

  return (
    <div className={styles.wrapper}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error && error.statusText}</i>
      </p>
      <Button
        text="Home page"
        onClick={() =>
          navigate(
            `/${location.search.split('&').find((el) => el.includes('search'))}`
          )
        }
        className={[styles.button]}
      />
    </div>
  );
});

Error.displayName = 'Error';
