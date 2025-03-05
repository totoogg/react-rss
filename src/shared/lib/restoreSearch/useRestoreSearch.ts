'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

export const useRestoreSearch = () => {
  const [state, setState] = React.useState<null | string>(null);
  const router = useRouter();
  const query = useSearchParams();
  const pageQuery = query.get('page');
  const search = query.get('search') || '';

  React.useEffect(() => {
    const local = localStorage.getItem('search') || '';

    let page = Number(pageQuery) > 0 ? Number(pageQuery) : 1;

    const checkParams = query.has('search') && query.has('page');

    if (!checkParams) {
      router.push(`/?search=${search || local}&page=${page}`);
      router.refresh();
    }

    if (search && local !== search) {
      localStorage.setItem('search', search);
      page = 1;
      router.push(`/?search=${search}&page=${page}`);
      router.refresh();
    }

    if (!local) {
      localStorage.setItem('search', '');
    }

    setState(local);
  }, [pageQuery, query, router, search]);

  return state;
};
