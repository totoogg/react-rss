import React, { memo, useCallback } from 'react';
import { Button, Input, useRestoreSearch } from '@/shared';
import { useRouter } from 'next/router';
import styles from './search.module.css';

export const Search = memo(() => {
  const [search, setSearch] = React.useState<string>('');
  const localStart = useRestoreSearch();
  const router = useRouter();

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const handleLocal = useCallback(() => {
    const local = localStorage.getItem('search');

    if (local === search) return;

    localStorage.setItem('search', search);
    router.push(`/?search=${search}&page=1`, undefined, {
      shallow: true,
    });
  }, [router, search]);

  React.useEffect(() => {
    setSearch(localStart || '');
  }, [localStart]);

  return (
    <div className={styles.search}>
      <Input
        name="search"
        onChange={onChange}
        placeholder="Search"
        type="text"
        value={search}
        className={styles.input}
        onEnter={handleLocal}
      />
      <Button
        text="Search"
        onClick={handleLocal}
        className={styles.button}
        classNameButton="flat"
      />
    </div>
  );
});

Search.displayName = 'Search';
