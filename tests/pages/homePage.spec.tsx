import React, { act } from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { HomePage } from '../../src/pages/homePage/ui/homePage';
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

describe('HomePage Component', () => {
  it('renders the HomePage without error', async () => {
    const { container } = render(<HomePage />, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={['/?search=&page=1']}>
          {children}
        </MemoryRouter>
      ),
    });

    await whenStable();

    expect(container.querySelectorAll('div[class*="page"]').length).toBe(1);

    expect(container.querySelectorAll('div[class*="main"]').length).toBe(1);
  });

  it('renders the HomePage with error', async () => {
    const { container, getByText } = render(<HomePage />, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={['/?search=&page=1']}>
          {children}
        </MemoryRouter>
      ),
    });

    await whenStable();
    act(() => {
      window.dispatchEvent(new Event('customErrorResponse'));
    });
    await whenStable();
    expect(container.querySelectorAll('div[class*="page"]').length).toBe(1);

    expect(
      getByText('Something went wrong. Please try again later.')
    ).toBeInTheDocument();
  });
});
