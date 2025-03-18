import React from 'react';
import { Button, Input } from '@/shared';
import styles from './search.module.css';

export const Search = () => {
  const [search, setSearch] = React.useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleLocal = () => {
    const local = localStorage.getItem('search');
    if (local === search) return;
    localStorage.setItem('search', search);
  };

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
};

Search.displayName = 'Search';
