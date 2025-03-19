import { FC, useContext } from 'react';
import { CountryContext, Select, Region } from '@/shared';
import styles from './selectRegion.module.css';

export const SelectRegion: FC = () => {
  const { setRegion } = useContext(CountryContext);

  const region = [
    'All',
    'Antarctic',
    'Americas',
    'Europe',
    'Africa',
    'Asia',
    'Oceania',
  ];

  const handleSelect = (option: string) => {
    setRegion?.(option as Region);
  };

  return (
    <div className={styles.select}>
      <b className={styles.text}>Region:</b>{' '}
      <Select
        options={region}
        label={'Select region'}
        onChange={handleSelect}
        className="selectRegion"
      />
    </div>
  );
};

SelectRegion.displayName = 'SelectRegion';
