export {
  apiSlice,
  useGetFilmsQuery,
  useLazyGetPeopleQuery,
  loaderReducer,
  selectIsLoader,
  errorReducer,
  selectIsError,
} from './api';
export { Loader } from './ui/loader';
export { Fallback } from './ui/fallback';
export { Button } from './ui/button';
export { Input } from './ui/input';
export { ErrorBoundary } from './ui/errorBoundary';
export { useRestoreSearch } from './lib/restoreSearch';
export { useAppDispatch, useAppSelector } from './lib/store';
export { useSearchPeople } from './lib/searchPeople';
export type {
  IApi,
  ICharacter,
  Person,
  IButtonProps,
  IErrorBoundaryProps,
  IErrorBoundaryState,
  IFilm,
  IInputProps,
} from './types';
