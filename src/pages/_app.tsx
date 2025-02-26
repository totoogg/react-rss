import type { AppProps } from 'next/app';
import '../index.css';
import { Layout } from '@/_app/layout';
import { StrictMode } from 'react';
import { Providers } from '@/_app/providers';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <Providers>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
    </StrictMode>
  );
}
