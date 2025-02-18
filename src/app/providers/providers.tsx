import { FC, memo } from 'react';
import { ErrorBoundary, Fallback } from '@/shared';
import { IProvidersProps } from '../types';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ThemeProvide } from './theme';

export const Providers: FC<IProvidersProps> = memo(({ children }) => {
  return (
    <ErrorBoundary fallback={<Fallback />}>
      <Provider store={store}>
        <ThemeProvide>{children}</ThemeProvide>
      </Provider>
    </ErrorBoundary>
  );
});

Providers.displayName = 'Providers';
