import { FC, memo } from 'react';
import { Providers } from './providers/providers';
import { AppRouter } from './routers/appRouter';

export const App: FC = memo(() => {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
});

App.displayName = 'App';
