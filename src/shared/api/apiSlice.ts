import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { addLoader, removeLoader } from './loader/loaderSlice';
import { showError } from './error/errorSlice';

const customBaseQuery: BaseQueryFn = async (args, api, extraOptions) => {
  api.dispatch(addLoader());
  try {
    const result = await fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' })(
      args,
      api,
      extraOptions
    );

    if (result.error) {
      throw new Error('Request');
    }

    return result;
  } catch (error) {
    api.dispatch(showError());
    throw error;
  } finally {
    api.dispatch(removeLoader());
  }
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
});
