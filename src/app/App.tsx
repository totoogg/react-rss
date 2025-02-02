import { Component } from 'react';
import { Providers } from './providers/providers';
import { HomePage } from '@/pages';
import { Layout } from './layout/layout';

export class App extends Component {
  render() {
    return (
      <Providers>
        <Layout>
          <HomePage />
        </Layout>
      </Providers>
    );
  }
}
