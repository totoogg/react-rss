'use client';

import { FC, memo } from 'react';
import { Button } from '@/shared';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './error.module.css';

export const Error: FC = memo(() => {
  const router = useRouter();
  const query = useSearchParams();
  console.error(404);

  return (
    <div className={styles.wrapper}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{404}</i>
      </p>
      <Button
        text="Home page"
        onClick={() => {
          router.push(`/?search=${query.get('search') || ''}&page=1`);
        }}
        className={styles.button}
      />
    </div>
  );
});

Error.displayName = 'Error';
