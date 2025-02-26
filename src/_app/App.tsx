import { FC, memo, StrictMode } from 'react';
import { Providers } from './providers/providers';
import { AppRouter } from './routers/appRouter';

const App: FC = memo(() => {
  return (
    <StrictMode>
      <Providers>
        <AppRouter />
      </Providers>
    </StrictMode>
  );
});

App.displayName = 'App';

export default App;
