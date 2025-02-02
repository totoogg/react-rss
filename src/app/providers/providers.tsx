import { Component } from 'react';
import { ErrorBoundary, Fallback } from '@/shared';
import { IProvidersProps } from '../types/providerTypes';

export class Providers extends Component<IProvidersProps> {
  render() {
    return (
      <ErrorBoundary fallback={<Fallback />}>
        {this.props.children}
      </ErrorBoundary>
    );
  }
}
