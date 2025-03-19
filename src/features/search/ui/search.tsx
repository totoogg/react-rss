import React, { useContext } from 'react';
import { Button, CountryContext, Input } from '@/shared';
import styles from './search.module.css';

export const Search = () => {
  const { setSearch } = useContext(CountryContext);
  const [searchInput, setSearchInput] = React.useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    setSearch?.(searchInput);
  };

  return (
    <div className={styles.search}>
      <Input
        name="search"
        onChange={onChange}
        placeholder="Search"
        type="text"
        value={searchInput}
        className={styles.input}
        onEnter={handleSearch}
      />
      <Button
        text="Search"
        onClick={handleSearch}
        className={styles.button}
        classNameButton="flat"
      />
    </div>
  );
};

Search.displayName = 'Search';
