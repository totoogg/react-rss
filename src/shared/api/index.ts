export { apiSlice, getRunningQueriesThunk } from './apiSlice';
export { useGetFilmsQuery, getFilms } from './films/apiSliceWithFilms';
export {
  useLazyGetPeopleQuery,
  getPeople,
  useGetPeopleQuery,
} from './people/apiSliceWithPeople';
export {
  default as loaderReducer,
  selectIsLoader,
  addLoader,
  removeLoader,
} from './loader/loaderSlice';
export { default as errorReducer, selectIsError } from './error/errorSlice';
