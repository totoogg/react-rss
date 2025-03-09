import React, { act } from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderWithProviders } from '../test-utils';
import { Wrapper } from '../../src/app/_wrapper';
import { type ICharacter, type IFilm } from '../../src/shared';

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

beforeEach(() => {
  vi.mock('next/navigation', () => ({
    useSearchParams: () => ({
      get: (key: string) => (key === 'page' ? '2' : 'luke'),
    }),
  }));

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
      <Wrapper
        preloadedState={{
          people: { count: 1, people: mockPeople },
          films: mockFilms,
        }}
      />
    );

    await act(async () => {
      vi.runAllTimers();
    });

    expect(container.querySelectorAll('.loader').length).toBe(0);
  });

  it('missing data', async () => {
    const { container } = renderWithProviders(<Wrapper preloadedState={{}} />);

    await act(async () => {
      vi.runAllTimers();
    });

    expect(container.querySelector('.content')).toBeNull();
  });
});
