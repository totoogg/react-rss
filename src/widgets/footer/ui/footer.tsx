import React, { FC, memo } from 'react';
import { Button, Loader } from '@/shared';
import { IFooterState } from '../model/footerTypes';
import styles from './footer.module.css';

export const Footer: FC = memo(() => {
  const [state, setState] = React.useState<IFooterState>({
    isError: false,
    isLoader: false,
  });

  const handleErrors = () => {
    setState({ ...state, isError: true });
  };

  React.useEffect(() => {
    const changeLoaderOn = () => {
      setState({ ...state, isLoader: true });
    };

    const changeLoaderOff = () => {
      setState({ ...state, isLoader: false });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('customLoaderOn', changeLoaderOn);
      window.addEventListener('customLoaderOff', changeLoaderOff);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('customLoaderOn', changeLoaderOn);
        window.removeEventListener('customLoaderOff', changeLoaderOff);
      }
    };
  }, [state]);

  if (state.isError) {
    throw new Error('Error');
  }

  return (
    <>
      {state.isLoader && <Loader />}
      <div className={styles.footer}>
        <div className={styles.wrapper}>
          <Button
            text="ERROR"
            onClick={handleErrors}
            classNameButton="flat"
            className={[styles.error]}
          />
        </div>
      </div>
    </>
  );
});

Footer.displayName = 'Footer';
