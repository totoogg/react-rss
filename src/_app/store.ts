import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiSlice, errorReducer, loaderReducer } from '@/shared';
import { choosePeopleReducer } from '@/features';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

const rootReducer = combineReducers({
  choose: choosePeopleReducer,
  loader: loaderReducer,
  error: errorReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const reducer = (
  state: ReturnType<typeof rootReducer> | undefined,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  }
  return rootReducer(state, action);
};

export const setupStore = () => {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;

export const wrapper = createWrapper<AppStore>(setupStore, { debug: true });
