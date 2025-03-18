import { FC, memo } from 'react';
import { Providers } from './providers/providers';
import { Layout } from './layout';

export const App: FC = memo(() => {
  return (
    <Providers>
      <Layout />
    </Providers>
  );
});

App.displayName = 'App';
