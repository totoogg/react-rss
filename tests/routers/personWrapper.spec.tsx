import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { waitFor } from '@testing-library/react';
import { Wrapper } from '../../src/app/routers/wrappers/personWrapper';
import { apiSliceWithPeople } from '../../src/shared/api/people/apiSliceWithPeople';
import { apiSliceWithFilms } from '../../src/shared/api/films/apiSliceWithFilms';
import { apiSliceWithPerson } from '../../src/widgets/personDetail/model/apiSliceWithPersonById';
import { renderWithProviders } from '../test-utils';
import { MemoryRouter } from 'react-router';
import React from 'react';

const mockDispatch = vi.fn();

beforeEach(() => {
  vi.mock('@/shared', async (importOriginal) => ({
    ...(await importOriginal<
      typeof import('../../src/shared/lib/store/useAppDispatch')
    >()),
    useAppDispatch: () => mockDispatch,
  }));
  vi.mock('react-router', async () => {
    const mod =
      await vi.importActual<typeof import('react-router')>('react-router');
    return {
      ...mod,
      useSearchParams: () => [new URLSearchParams()],
      useNavigate: () => vi.fn(),
      useLocation: () => ({
        location: {
          search: 'search=a',
        },
      }),
    };
  });

  mockDispatch.mockClear();
  apiSliceWithPeople.util.upsertQueryData = vi.fn();
  apiSliceWithFilms.util.upsertQueryData = vi.fn();
  apiSliceWithPerson.util.upsertQueryData = vi.fn();
});

afterEach(() => {
  vi.clearAllMocks();
});

const mockPeople = {
  results: [{ name: 'Luke Skywalker' }],
  count: 1,
};

const mockFilms = { results: [{ title: 'A New Hope' }] };
const mockPerson = {
  url: 'https://swapi.dev/api/people/1/',
  homeworld: 'https://swapi.dev/api/planets/1/',
};

describe('Wrapper Component', () => {
  it('dispatch actions correctly', async () => {
    renderWithProviders(
      <MemoryRouter>
        <Wrapper
          preloadedState={{
            people: mockPeople,
            films: mockFilms,
            person: mockPerson,
            home: { name: 'Tatooine' },
          }}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(4);

      expect(apiSliceWithPeople.util.upsertQueryData).toHaveBeenCalledWith(
        'getPeople',
        { page: 1, search: '' },
        mockPeople
      );

      expect(apiSliceWithFilms.util.upsertQueryData).toHaveBeenCalledWith(
        'getFilms',
        undefined,
        mockFilms
      );
    });
  });

  it('dispatch error ', async () => {
    renderWithProviders(
      <MemoryRouter>
        <Wrapper
          preloadedState={{
            people: { detail: 'Error', ...mockPeople },
            films: { detail: 'Error', ...mockFilms },
            person: null,
            home: { detail: 'Error', name: 'Tatooine' },
          }}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        payload: undefined,
        type: 'error/showError',
      });
    });
  });
});
