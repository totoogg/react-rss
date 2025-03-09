import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import Page from '../../src/app/page';

vi.mock('./_wrapper', () => ({
  Wrapper: vi.fn(() => <div data-testid="wrapper" />),
}));

vi.mock('@/shared', async (original) => ({
  ...(await original<
    typeof import('../../src/shared/lib/store/useAppDispatch')
  >()),
  useAppDispatch: () => vi.fn().mockResolvedValue({}),
}));

vi.mock('next/navigation', async () => {
  const actual =
    await vi.importActual<typeof import('next/navigation')>('next/navigation');
  return {
    ...actual,
    useParams: () => ({
      id: 1,
    }),
    useSearchParams: () => {
      return {
        has: (key: string) => {
          return key === 'page' || key === 'search';
        },
        get: (key: string) => {
          if (key === 'page') {
            return '1';
          } else if (key === 'search') {
            return '';
          }
          return null;
        },
      };
    },
  };
});

const mockFetch = vi.fn();
let fetchSpy = vi.spyOn(global, 'fetch').mockImplementation(mockFetch);

beforeEach(() => {
  vi.clearAllMocks();

  fetchSpy = vi.spyOn(global, 'fetch').mockImplementation(mockFetch);
});

afterEach(() => {
  fetchSpy.mockRestore();
});

const setupMocks = (peopleResponse = {}, filmsResponse = {}) => {
  mockFetch.mockImplementation((url: string) => {
    if (url.includes('people')) {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            results: [{ name: 'Luke Skywalker' }],
            count: 1,
            ...peopleResponse,
          }),
      });
    }
    if (url.includes('films')) {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            results: [{ title: 'A New Hope' }],
            ...filmsResponse,
          }),
      });
    }
    return Promise.reject(new Error('Invalid URL'));
  });
};

describe('Page Component', () => {
  it('render Wrapper with props', async () => {
    setupMocks();

    const mockSearchParams = Promise.resolve({
      search: 'luke',
      page: '2',
    });

    const Result = await Page({ searchParams: mockSearchParams });
    render(Result);

    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://swapi.dev/api/people/?search=luke&page=2'
    );
    expect(fetchSpy).toHaveBeenCalledWith('https://swapi.dev/api/films');
  });
});
