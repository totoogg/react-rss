import { FC, memo, useCallback, useContext, useMemo } from 'react';
import { CountryContext, Select } from '@/shared';
import styles from './selectSort.module.css';

export const SelectSort: FC = memo(() => {
  const { setSort } = useContext(CountryContext);

  const region = useMemo(
    () => [
      'Country name Z-A',
      'Country name A-Z',
      'Population ↑',
      'Population ↓',
    ],
    []
  );

  const handleSelect = useCallback(
    (option: string) => {
      if (option === 'Country name Z-A') {
        setSort?.('nameCountryUp');
      } else if (option === 'Country name A-Z') {
        setSort?.('nameCountryDown');
      } else if (option === 'Population ↑') {
        setSort?.('populationUp');
      } else if (option === 'Population ↓') {
        setSort?.('populationDown');
      }
    },
    [setSort]
  );

  return (
    <div className={styles.select}>
      <b className={styles.text}>Sort:</b>{' '}
      <Select
        options={region}
        label={'Select sort'}
        onChange={handleSelect}
        className="selectSort"
      />
    </div>
  );
});

SelectSort.displayName = 'SelectSort';
