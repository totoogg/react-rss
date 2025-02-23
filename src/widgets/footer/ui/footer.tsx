import React, { FC, memo, useCallback } from 'react';
import { Button, Loader, selectIsLoader, useAppSelector } from '@/shared';
import styles from './footer.module.css';

export const Footer: FC = memo(() => {
  const [state, setState] = React.useState<boolean>(false);
  const isLoader = useAppSelector(selectIsLoader);

  const handleErrors = useCallback(() => {
    setState(true);
  }, []);

  if (state) {
    throw new Error('Error');
  }

  return (
    <>
      {isLoader && <Loader />}
      <div className={styles.footer}>
        <div className={styles.wrapper}>
          <Button
            text="ERROR"
            onClick={handleErrors}
            classNameButton="flat"
            className={styles.error}
          />
        </div>
      </div>
    </>
  );
});

Footer.displayName = 'Footer';
