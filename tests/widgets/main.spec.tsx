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
  vi.spyOn(handlers, 'getPersonById').mockReturnValue(
    new Promise((resolve) =>
      resolve({
        name: 'Han Solo',
        height: '180',
        mass: '80',
        hair_color: 'brown',
        skin_color: 'fair',
        eye_color: 'brown',
        birth_year: '29BBY',
        gender: 'male',
        homeworld: 'https://swapi.dev/api/planets/22/',
        films: [
          'https://swapi.dev/api/films/1/',
          'https://swapi.dev/api/films/2/',
          'https://swapi.dev/api/films/3/',
        ],
        url: 'https://swapi.dev/api/people/14/',
      })
    )
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
              birth_year: '41.9BBY',
            },
            {
              name: '',
              url: '',
              home: '',
              films: [],
              birth_year: '',
            },
          ],
        })
      )
    );

    const { container, getByText, getAllByText, getAllByRole } = render(
      <Main />,
      {
        wrapper: ({ children }) => (
          <MemoryRouter initialEntries={['/test?page=1']}>
            {children}
          </MemoryRouter>
        ),
      }
    );
    window.dispatchEvent(new Event('storage'));
    await whenStable();
    expect(container.querySelectorAll('div[class*="container"]').length).toBe(
      2
    );
    expect(container.querySelectorAll('a[class*="no-underline"]').length).toBe(
      2
    );
    expect(getByText('nick')).toBeInTheDocument();
    expect(getByText('41.9BBY')).toBeInTheDocument();
    expect(getByText('4, 5, 6')).toBeInTheDocument();
    expect(getAllByText('Tatooine').length).toBe(2);

    expect(getAllByRole('link')[0]).toHaveAttribute(
      'href',
      '/people/11?search=null&page=1'
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
