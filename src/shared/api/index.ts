export { apiSlice } from './apiSlice';
export { useGetFilmsQuery } from './films/apiSliceWithFilms';
export { useLazyGetPeopleQuery } from './people/apiSliceWithPeople';
export { default as loaderReducer, selectIsLoader } from './loader/loaderSlice';
export { default as errorReducer, selectIsError } from './error/errorSlice';
