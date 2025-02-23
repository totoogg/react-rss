import { FC, memo } from 'react';
import { Providers } from './providers/providers';
import { AppRouter } from './routers/appRouter';

const App: FC = memo(() => {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
});

App.displayName = 'App';

export default App;
