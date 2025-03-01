import { wrapper } from '@/_app/store';
import { HomePage, PeoplePage } from '@/_pages';
import {
  addLoader,
  getFilmsQuery,
  getPeople,
  getRunningQueriesThunk,
} from '@/shared';
import { getHomeById, getPersonById } from '@/widgets';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { search = '', page = 1, id = '' } = context.query;

    store.dispatch(
      getPeople.initiate({ search: String(search), page: Number(page) })
    );
    store.dispatch(getFilmsQuery.initiate());
    await store.dispatch(getPersonById.initiate(String(id)));

    const state = store.getState();

    const person = getPersonById.select(String(id))(state);

    store.dispatch(
      getHomeById.initiate(
        person.data?.homeworld?.split('/').reverse()[1] || ''
      )
    );

    store.dispatch(addLoader());

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);
export default function User() {
  return (
    <>
      <HomePage />
      <PeoplePage />
    </>
  );
}
