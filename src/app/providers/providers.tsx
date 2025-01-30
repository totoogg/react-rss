import { Component } from 'react';
import { ErrorBoundary } from '@/shared';
import { IProvidersProps } from '../types/providerTypes';

export default class Providers extends Component<IProvidersProps> {
  render() {
    return (
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        {this.props.children}
      </ErrorBoundary>
    );
  }
}
