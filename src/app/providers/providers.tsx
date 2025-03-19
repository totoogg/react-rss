import { FC, memo } from 'react';
import { ErrorBoundary, Fallback } from '@/shared';
import { IProvidersProps } from '../types';
import { Provider } from 'react-redux';
import { setupStore } from '../store';
import { CountryProvide } from './country';

const store = setupStore();

export const Providers: FC<IProvidersProps> = memo(({ children }) => {
  return (
    <ErrorBoundary fallback={<Fallback />}>
      <Provider store={store}>
        <CountryProvide>{children}</CountryProvide>
      </Provider>
    </ErrorBoundary>
  );
});

Providers.displayName = 'Providers';
