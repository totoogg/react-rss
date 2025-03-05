import type { Metadata } from 'next';
import '../index.css';
import { Providers } from '@/_app/providers';
import { Layout } from '@/_app/layout';

export const metadata: Metadata = {
  title: 'React',
  description: 'React RSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
      </head>
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
