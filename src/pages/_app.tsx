import type { AppProps } from 'next/app';
import '../index.css';
import { wrapper } from '@/_app/store';
import { Provider } from 'react-redux';
import { Providers } from '@/_app/providers';
import { Layout } from '@/_app/layout';

export default function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Providers>
      <Provider store={store}>
        <Layout>
          <Component {...props.pageProps} />
        </Layout>
      </Provider>
    </Providers>
  );
}
