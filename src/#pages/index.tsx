import { wrapper } from '@/_app/store';
import { HomePage } from '@/_pages';
import {
  addLoader,
  getFilmsQuery,
  getPeople,
  getRunningQueriesThunk,
} from '@/shared';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { search = '', page = 1 } = context.query;

    store.dispatch(
      getPeople.initiate({ search: String(search), page: Number(page) })
    );
    store.dispatch(getFilmsQuery.initiate());

    store.dispatch(addLoader());

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

function Page() {
  return <HomePage />;
}

export default Page;
