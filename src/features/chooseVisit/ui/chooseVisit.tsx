import { FC, memo, useCallback, useEffect, useState } from 'react';
import { Choose } from '@/shared';
import { IChoosePeopleProps } from '../model/choosePeopleTypes';

export const ChooseVisit: FC<IChoosePeopleProps> = memo(
  ({ name, className }) => {
    const [visit, setVisit] = useState<boolean>(false);

    useEffect(() => {
      const storedVisit = localStorage.getItem('visitedCountriesReact');
      if (storedVisit) {
        setVisit((JSON.parse(storedVisit) as string[]).includes(name));
      }
    }, [name]);

    const handleChoose = useCallback(() => {
      const storedVisit = localStorage.getItem('visitedCountriesReact');
      const visitedCountries = storedVisit ? JSON.parse(storedVisit) : [];

      if (visitedCountries.includes(name)) {
        visitedCountries.splice(visitedCountries.indexOf(name), 1);
        setVisit(false);
      } else {
        visitedCountries.push(name);
        setVisit(true);
      }

      localStorage.setItem(
        'visitedCountriesReact',
        JSON.stringify(visitedCountries)
      );
    }, [name]);

    return (
      <Choose
        className={className}
        id={name}
        onChoose={handleChoose}
        isChecked={visit}
      />
    );
  }
);

ChooseVisit.displayName = 'ChooseVisit';
