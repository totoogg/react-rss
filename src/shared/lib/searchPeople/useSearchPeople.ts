import { useLazyGetPeopleQuery } from '@/shared/api/';
import { ICharacter } from '@/shared/types';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export const useSearchPeople = () => {
  const [count, setCount] = useState<number>(0);
  const [people, setPeople] = useState<ICharacter[]>([]);
  const router = useRouter();
  const [fetchPeople] = useLazyGetPeopleQuery();

  React.useEffect(() => {
    const query = router.query;
    const search = (query.search || '') as string;
    const local = localStorage.getItem('search') || '';
    let page = Number(query.page) > 0 ? Number(query.page) : 1;
    const checkParams =
      Object.prototype.hasOwnProperty.call(query, 'search') &&
      Object.prototype.hasOwnProperty.call(query, 'page');

    if (!checkParams) {
      router.push(`/?search=${search}&page=${page}`, undefined, {
        shallow: true,
      });
    }

    if (search && local !== search) {
      localStorage.setItem('search', search);
      page = 1;
      router.push(`/?search=${search}&page=${page}`, undefined, {
        shallow: true,
      });
    }

    if (checkParams) {
      fetchPeople({
        page,
        search,
      }).then(({ data }) => {
        setCount(data?.count || 0);
        setPeople(data?.people || []);
      });
    }
  }, [fetchPeople, router]);

  return { count, people };
};
