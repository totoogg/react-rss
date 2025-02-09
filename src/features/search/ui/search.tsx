import React, { memo } from 'react';
import { Button, Input, useRestoreSearch } from '@/shared';
import styles from './search.module.css';
import { useNavigate } from 'react-router-dom';

export const Search = memo(() => {
  const [search, setSearch] = React.useState<string>('');
  const localStart = useRestoreSearch();
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleLocal = () => {
    const local = localStorage.getItem('search');
    if (local === search) return;
    localStorage.setItem('search', search);
    navigate({
      search: `?search=${search}&page=1`,
    });
    navigate(0);
  };

  React.useEffect(() => {
    setSearch(localStart || '');
    window.dispatchEvent(new Event('storage'));
  }, [localStart]);

  return (
    <div className={styles.search}>
      <Input
        name="search"
        onChange={onChange}
        placeholder="Search"
        type="text"
        value={search}
        className={[styles.input]}
        onEnter={handleLocal}
      />
      <Button
        text="Search"
        onClick={handleLocal}
        className={[styles.button]}
        classNameButton="flat"
      />
    </div>
  );
});

Search.displayName = 'Search';
