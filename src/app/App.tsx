import { FC } from 'react';
import { Providers } from './providers/providers';
import { Layout } from './layout';

export const App: FC = () => {
  return (
    <Providers>
      <Layout />
    </Providers>
  );
};

App.displayName = 'App';
