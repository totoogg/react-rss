import { HomePage, PeoplePage } from '@/_pages';
import { NextPageContext } from 'next';

export default function User(query: string) {
  return (
    <>
      <HomePage key={query} />
      <PeoplePage />
    </>
  );
}

User.getInitialProps = async (ctx: NextPageContext) => {
  return ctx.query;
};
