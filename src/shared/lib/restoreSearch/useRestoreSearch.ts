import { useRouter } from 'next/router';
import React from 'react';

export const useRestoreSearch = () => {
  const [state, setState] = React.useState<null | string>(null);
  const router = useRouter();

  React.useEffect(() => {
    const local = localStorage.getItem('search') || '';

    const search = (router.query.search || '') as string;
    let page = Number(router.query.page) > 0 ? Number(router.query.page) : 1;

    const checkParams =
      Object.prototype.hasOwnProperty.call(router.query, 'search') &&
      Object.prototype.hasOwnProperty.call(router.query, 'page');

    if (!checkParams) {
      router.push(`/?search=${search || local}&page=${page}`, undefined, {
        shallow: false,
      });
    }

    if (search && local !== search) {
      localStorage.setItem('search', search);
      page = 1;
      router.push(`/?search=${search}&page=${page}`, undefined, {
        shallow: false,
      });
    }

    if (!local) {
      localStorage.setItem('search', '');
    }

    setState(local);
  }, [router]);

  return state;
};
