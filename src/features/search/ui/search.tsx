import React, { memo } from 'react';
import { Button, Input } from '@/shared';
import { ISearchState } from '../model/searchType';
import styles from './search.module.css';

export const Search = memo(() => {
  const [state, setState] = React.useState<ISearchState>({
    search: '',
    count: 0,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, search: e.target.value });
  };

  const handleLocal = () => {
    const local = localStorage.getItem('search');
    if (local === state.search) return;
    localStorage.setItem('search', state.search);
    window.dispatchEvent(new Event('storage'));
  };

  React.useEffect(() => {
    const local = localStorage.getItem('search') || '';
    setState({ count: 1, search: local });
  }, []);

  React.useEffect(() => {
    if (state.count) {
      window.dispatchEvent(new Event('storage'));
    }
  }, [state]);

  React.useEffect(() => {
    const handleStorage = () => {
      const local = localStorage.getItem('search') || '';
      setState({ search: local, count: 0 });
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return (
    <div className={styles.search}>
      <Input
        name="search"
        onChange={onChange}
        placeholder="Search"
        type="text"
        value={state.search}
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
