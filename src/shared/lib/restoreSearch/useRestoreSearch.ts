import { useNavigate, useSearchParams } from 'react-router';
import React from 'react';

export const useRestoreSearch = () => {
  const [state, setState] = React.useState<null | string>(null);
  const router = useNavigate();
  const [query] = useSearchParams();
  const pageQuery = query.get('page');
  const search = query.get('search') || '';

  React.useEffect(() => {
    const local = localStorage.getItem('search') || '';

    let page = Number(pageQuery) > 0 ? Number(pageQuery) : 1;

    const checkParams = query.has('search') && query.has('page');

    if (!checkParams) {
      router(`/?search=${search || local}&page=${page}`);
    }

    if (search && local !== search) {
      localStorage.setItem('search', search);
      page = 1;
      router(`/?search=${search}&page=${page}`);
    }

    if (!local) {
      localStorage.setItem('search', '');
    }

    setState(local);
  }, [pageQuery, query, router, search]);

  return state;
};
