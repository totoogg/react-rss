import { configureStore } from '@reduxjs/toolkit';
import { apiSlice, errorReducer, loaderReducer } from '@/shared';
import { themeReducer } from '@/features';

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    theme: themeReducer,
    error: errorReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: import.meta.env.VITE_DEV_MODE !== 'production',
});
