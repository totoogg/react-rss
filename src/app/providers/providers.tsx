import { FC, memo } from 'react';
import { ErrorBoundary, Fallback } from '@/shared';
import { IProvidersProps } from '../types/providerTypes';

export const Providers: FC<IProvidersProps> = memo(({ children }) => {
  return <ErrorBoundary fallback={<Fallback />}>{children}</ErrorBoundary>;
});

Providers.displayName = 'Providers';
