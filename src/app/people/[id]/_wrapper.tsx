'use client';

import { useEffect, useState } from 'react';
import {
  IApi,
  ICharacter,
  IFilm,
  Person,
  removeLoader,
  useAppDispatch,
} from '@/shared';
import { apiSliceWithPeople } from '@/shared/api/people/apiSliceWithPeople';
import { apiSliceWithFilms } from '@/shared/api/films/apiSliceWithFilms';
import { apiSliceWithPerson } from '@/widgets/personDetail/model/apiSliceWithPersonById';
import { showError } from '@/shared/api/error/errorSlice';
import { useSearchParams } from 'next/navigation';
import { HomePage, PeoplePage } from '@/_pages';

interface IWrapper {
  preloadedState: {
    people: Pick<IApi, 'count'> &
      Record<'people', ICharacter[]> &
      Partial<{ detail: string }>;
    films: IFilm[] & Partial<{ detail: string }>;
    person: Person & Partial<{ detail: string }>;
    home: { name: string } & Partial<{ detail: string }>;
  };
}

export function Wrapper({
  preloadedState: { people, films, person, home },
}: IWrapper) {
  const [show, setShow] = useState(false);
  const query = useSearchParams();
  const page = query.get('page') || 1;
  const search = query.get('search') || '';
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function showPage() {
      if (people && films) {
        dispatch(removeLoader());
        if (people.detail || films.detail || person.detail || home.detail) {
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
            dispatch(
              apiSliceWithPerson.util.upsertQueryData(
                'getPersonById',
                person.url.split('/')[5],
                person
              )
            ),
            dispatch(
              apiSliceWithPerson.util.upsertQueryData(
                'getHomeById',
                person.homeworld.split('/')[5],
                home
              )
            ),
          ]);
        }
      }
      setShow(true);
    }
    showPage();
  }, [dispatch, films, home, page, people, person, search]);

  return (
    <>
      {show && (
        <>
          <HomePage />
          <PeoplePage />
        </>
      )}
    </>
  );
}
