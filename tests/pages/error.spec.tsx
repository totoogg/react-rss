import React, { act } from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Error } from '../../src/pages/error/ui/error';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import * as handlers from '../../src/shared/api/api';
import '@testing-library/jest-dom/vitest';

const whenStable = async () =>
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

const mockedUseNavigate = vi.fn();
const mockedUseRouteError = vi.fn();

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
        url: 'https://swapi.dev/api/people/11/',
      })
    )
  );
  vi.mock('react-router-dom', async () => {
    const mod =
      await vi.importActual<typeof import('react-router-dom')>(
        'react-router-dom'
      );
    return {
      ...mod,
      useNavigate: () => mockedUseNavigate,
      useRouteError: () => mockedUseRouteError,
    };
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Error page Component', () => {
  it('renders the Error Page', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => null);
    const { container, getByRole, getByText } = render(<Error />, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={['/error']}>{children}</MemoryRouter>
      ),
    });

    await whenStable();

    expect(container.querySelectorAll('div[class*="wrapper"]').length).toBe(1);
    expect(getByRole('heading', { name: 'Oops!' })).toBeInTheDocument();
    expect(
      getByText('Sorry, an unexpected error has occurred.')
    ).toBeInTheDocument();
    expect(getByText('Home page')).toBeInTheDocument();

    await userEvent.click(getByText('Home page'));

    expect(mockedUseNavigate).toHaveBeenCalled();
    expect(error).toHaveBeenCalled();
  });
});
