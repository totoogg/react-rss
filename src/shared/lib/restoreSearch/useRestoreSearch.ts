import React from 'react';
import { useLocation } from 'react-router-dom';

export const useRestoreSearch = () => {
  const [state, setState] = React.useState<null | string>(null);
  const location = useLocation();

  React.useEffect(() => {
    const local = localStorage.getItem('search') || '';

    if (!local) {
      localStorage.setItem('search', '');
    }

    const search = location.search
      .split('&')
      .find((el) => el.includes('search'))
      ?.split('=')[1];

    if (search && local !== search) {
      localStorage.setItem('search', search);
      setState(search);
    } else {
      setState(local);
    }
  }, [location.search]);

  return state;
};
