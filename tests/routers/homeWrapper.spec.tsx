import React, { act } from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderWithProviders } from '../test-utils';
import { Wrapper } from '../../src/app/routers/wrappers/homeWrapper';
import { type ICharacter, type IFilm } from '../../src/shared';
import { MemoryRouter } from 'react-router';

const mockFilms: IFilm[] = [
  {
    title: 'A New Hope',
    url: 'George Lucas',
  },
];

const mockPeople: ICharacter[] = [
  {
    name: 'Luke Skywalker',
    birth_year: '',
    films: [],
    url: '',
  },
];

const mockedUseNavigate = vi.fn();

beforeEach(() => {
  vi.mock('react-router', async () => {
    const mod =
      await vi.importActual<typeof import('react-router')>('react-router');
    return {
      ...mod,
      useNavigate: () => mockedUseNavigate,
      useLocation: () => ({
        location: {
          search: 'search=a',
        },
      }),
    };
  });

  vi.mock('@/shared', async (original) => ({
    ...(await original<
      typeof import('../../src/shared/lib/store/useAppDispatch')
    >()),
    useAppDispatch: () => vi.fn().mockResolvedValue({}),
  }));
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.clearAllMocks();
});

describe('Wrapper Component', () => {
  it('loader and render HomePage', async () => {
    const { container } = renderWithProviders(
      <MemoryRouter>
        <Wrapper
          preloadedState={{
            people: { count: 1, results: mockPeople },
            films: { results: mockFilms },
          }}
        />
      </MemoryRouter>
    );

    await act(async () => {
      vi.runAllTimers();
    });

    expect(container.querySelectorAll('.loader').length).toBe(0);
  });

  it('missing data', async () => {
    const { container } = renderWithProviders(
      <MemoryRouter>
        <Wrapper preloadedState={{}} />
      </MemoryRouter>
    );

    await act(async () => {
      vi.runAllTimers();
    });

    expect(container.querySelector('.content')).toBeNull();
  });
});
