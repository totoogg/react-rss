import { FC, memo } from 'react';
import { ErrorBoundary, Fallback } from '@/shared';
import { IProvidersProps } from '../types';
import { ThemeProvide } from './theme';

export const Providers: FC<IProvidersProps> = memo(({ children }) => {
  return (
    <ErrorBoundary fallback={<Fallback />}>
      <ThemeProvide>{children}</ThemeProvide>
    </ErrorBoundary>
  );
});

Providers.displayName = 'Providers';
