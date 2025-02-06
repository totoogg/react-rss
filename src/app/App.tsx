import { FC, memo } from 'react';
import { Providers } from './providers/providers';
import { HomePage } from '@/pages';
import { Layout } from './layout/layout';

export const App: FC = memo(() => {
  return (
    <Providers>
      <Layout>
        <HomePage />
      </Layout>
    </Providers>
  );
});

App.displayName = 'App';
