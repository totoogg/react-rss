import React, { act } from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Main } from '../../src/widgets/main/ui/main';
import { MemoryRouter } from 'react-router-dom';
import * as handlers from '../../src/shared/api/api';
import '@testing-library/jest-dom/vitest';

const whenStable = async () =>
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

beforeEach(() => {
  vi.spyOn(handlers, 'getFilms').mockReturnValue(
    new Promise((resolve) =>
      resolve([
        { title: '1', url: 'https://swapi.dev/api/films/1/' },
        { title: '2', url: 'https://swapi.dev/api/films/2/' },
        { title: '3', url: 'https://swapi.dev/api/films/3/' },
        { title: '4', url: 'https://swapi.dev/api/films/4/' },
        { title: '5', url: 'https://swapi.dev/api/films/5/' },
        { title: '6', url: 'https://swapi.dev/api/films/6/' },
      ])
    )
  );
  vi.spyOn(handlers, 'getHome').mockReturnValue(
    new Promise((resolve) => resolve('Tatooine'))
  );
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Main Component', () => {
  it('renders the main with pagination and people', async () => {
    vi.spyOn(handlers, 'getSearchPeople').mockReturnValue(
      new Promise((resolve) =>
        resolve({
          count: '11',
          results: [
            {
              name: 'nick',
              url: 'https://swapi.dev/api/people/11/',
              home: 'https://swapi.dev/api/planets/1/',
              films: [
                'https://swapi.dev/api/films/4/',
                'https://swapi.dev/api/films/5/',
                'https://swapi.dev/api/films/6/',
              ],
              birthdayYear: '41.9BBY',
            },
            {
              name: '',
              url: '',
              home: '',
              films: [],
              birthdayYear: '',
            },
          ],
        })
      )
    );

    const { container } = render(<Main />, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={['/test?page=1']}>
          {children}
        </MemoryRouter>
      ),
    });
    window.dispatchEvent(new Event('storage'));
    await whenStable();
    expect(container.querySelectorAll('div[class*="container"]').length).toBe(
      2
    );
    expect(container.querySelectorAll('a[class*="no-underline"]').length).toBe(
      2
    );
  });

  it('renders the main without pagination and people', async () => {
    vi.spyOn(handlers, 'getSearchPeople').mockReturnValue(
      new Promise((resolve) =>
        resolve({
          count: '0',
          results: [],
        })
      )
    );

    const { container, getByText } = render(<Main />, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={['/test']}>{children}</MemoryRouter>
      ),
    });
    window.dispatchEvent(new Event('storage'));
    await whenStable();
    expect(container.querySelectorAll('div[class*="container"]').length).toBe(
      0
    );
    expect(
      getByText('No characters with the name "" found')
    ).toBeInTheDocument();
  });
});
