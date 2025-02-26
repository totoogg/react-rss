import { HomePage } from '@/_pages';
import { NextPageContext } from 'next/types';

function Page(query: string) {
  return <HomePage key={query} />;
}

Page.getInitialProps = async (ctx: NextPageContext) => {
  return ctx.query;
};

export default Page;
