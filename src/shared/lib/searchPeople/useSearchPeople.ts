import { useLazyGetPeopleQuery } from '@/shared/api/';
import { ICharacter } from '@/shared/types';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useSearchPeople = () => {
  const [count, setCount] = useState<number>(0);
  const [people, setPeople] = useState<ICharacter[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [fetchPeople] = useLazyGetPeopleQuery();

  React.useEffect(() => {
    const search = searchParams.get('search') || '';
    const local = localStorage.getItem('search') || '';
    let page =
      Number(searchParams.get('page')) > 0
        ? Number(searchParams.get('page'))
        : 1;

    if (search && local !== search) {
      localStorage.setItem('search', search);
      page = 1;
      searchParams.set('page', String(page));
    }

    setSearchParams(
      {
        page: String(page),
        search,
      },
      {
        replace: true,
      }
    );

    fetchPeople({
      page,
      search,
    }).then(({ data }) => {
      setCount(data?.count || 0);
      setPeople(data?.people || []);
    });
  }, [fetchPeople, searchParams, setSearchParams]);

  return { count, people };
};
