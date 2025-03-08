import React, { memo, useCallback } from 'react';
import {
  addLoader,
  Button,
  Input,
  useAppDispatch,
  useRestoreSearch,
} from '@/shared';
import { useNavigate } from 'react-router';
import styles from './search.module.css';

export const Search = memo(() => {
  const [search, setSearch] = React.useState<string>('');
  const localStart = useRestoreSearch();
  const router = useNavigate();
  const dispatch = useAppDispatch();

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const handleLocal = useCallback(() => {
    const local = localStorage.getItem('search');

    if (local === search) return;

    dispatch(addLoader());
    localStorage.setItem('search', search);
    router(`/?search=${search}&page=1`);
  }, [dispatch, router, search]);

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
