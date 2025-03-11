import { FC, memo } from 'react';
import { ErrorBoundary, Fallback } from '@/shared';
import { IProvidersProps } from '../types';
import { Provider } from 'react-redux';
import { setupStore } from '../store';

const store = setupStore();

export const Providers: FC<IProvidersProps> = memo(({ children }) => {
  return (
    <ErrorBoundary fallback={<Fallback />}>
      <Provider store={store}>{children}</Provider>
    </ErrorBoundary>
  );
});

Providers.displayName = 'Providers';
