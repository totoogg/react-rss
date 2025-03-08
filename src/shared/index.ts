export {
  apiSlice,
  useGetFilmsQuery,
  useLazyGetPeopleQuery,
  loaderReducer,
  selectIsLoader,
  errorReducer,
  selectIsError,
  addLoader,
  useGetPeopleQuery,
  removeLoader,
} from './api';
export { Loader } from './ui/loader';
export { Fallback } from './ui/fallback';
export { Button } from './ui/button';
export { Input } from './ui/input';
export { Choose } from './ui/choose';
export { ErrorBoundary } from './ui/errorBoundary';
export { useRestoreSearch } from './lib/restoreSearch';
export { useAppDispatch, useAppSelector } from './lib/store';
export { getFilms } from './lib/getFilms/getFilms';
export type {
  IApi,
  ICharacter,
  Person,
  IButtonProps,
  IErrorBoundaryProps,
  IErrorBoundaryState,
  IFilm,
  IInputProps,
  IChooseProps,
} from './types';
export { default as Sun } from './assets/icons/sun-svgrepo-com.svg?react';
export { default as Moon } from './assets/icons/moon-svgrepo-com.svg?react';
export { ThemeContext } from './config';
export type { IThemeContext } from './config';
