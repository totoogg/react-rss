import { useEffect, useState } from 'react';
import { removeLoader, useAppDispatch } from '@/shared';
import { apiSliceWithPeople } from '@/shared/api/people/apiSliceWithPeople';
import { apiSliceWithFilms } from '@/shared/api/films/apiSliceWithFilms';
import { showError } from '@/shared/api/error/errorSlice';
import { useSearchParams } from 'react-router';
import { HomePage } from '@/pages';
import { IProps } from '../home';

interface IWrapper {
  preloadedState: IProps;
}

export function Wrapper({ preloadedState: { people, films } }: IWrapper) {
  const [show, setShow] = useState(false);
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const search = searchParams.get('search') || '';
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function showPage() {
      if (people && films) {
        dispatch(removeLoader());
        if (people?.detail || films.detail) {
          dispatch(showError());
        } else {
          await Promise.all([
            dispatch(
              apiSliceWithPeople.util.upsertQueryData(
                'getPeople',
                { page: Number(page), search },
                people
              )
            ),
            dispatch(
              apiSliceWithFilms.util.upsertQueryData(
                'getFilms',
                undefined,
                films
              )
            ),
          ]);
        }
      }
      setShow(true);
    }
    showPage();
  }, [dispatch, films, page, people, search]);

  return <>{show && <HomePage />}</>;
}
