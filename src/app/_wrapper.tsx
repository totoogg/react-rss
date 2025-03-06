'use client';

import { useEffect, useState } from 'react';
import {
  IApi,
  ICharacter,
  IFilm,
  removeLoader,
  useAppDispatch,
} from '@/shared';
import { apiSliceWithPeople } from '@/shared/api/people/apiSliceWithPeople';
import { apiSliceWithFilms } from '@/shared/api/films/apiSliceWithFilms';
import { showError } from '@/shared/api/error/errorSlice';
import { useSearchParams } from 'next/navigation';
import { HomePage } from '@/_pages';

interface IWrapper {
  preloadedState: {
    people?: Pick<IApi, 'count'> &
      Record<'people', ICharacter[]> &
      Partial<{ detail: string }>;
    films?: IFilm[] & Partial<{ detail: string }>;
  };
}

export function Wrapper({ preloadedState: { people, films } }: IWrapper) {
  const [show, setShow] = useState(false);
  const query = useSearchParams();
  const page = query.get('page') || 1;
  const search = query.get('search') || '';
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
