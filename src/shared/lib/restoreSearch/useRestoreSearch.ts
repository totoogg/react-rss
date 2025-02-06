import React from 'react';

export const useRestoreSearch = () => {
  const [state, setState] = React.useState<null | string>(null);

  React.useEffect(() => {
    const local = localStorage.getItem('search') || '';
    setState(local);
  }, []);

  return state;
};
