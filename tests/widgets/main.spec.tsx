import React, { act } from 'react';
import { describe, it, expect } from 'vitest';
import { Main } from '../../src/widgets/main/ui/main';
import { PeopleList } from '../../src/widgets/peopleList/ui/peopleList';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';
import { renderWithProviders } from '../test-utils';
import { server } from '../server/index';
import { http, HttpResponse } from 'msw';

const whenStable = async () =>
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

describe('Main Component', () => {
  it('renders the main with pagination and people', async () => {
    const { container, getByText, getAllByRole } = renderWithProviders(
      <MemoryRouter initialEntries={['/test?page=1&search=a']}>
        <Main>
          <PeopleList />
        </Main>
      </MemoryRouter>,
      {
        preloadedState: {
          choose: {
            length: 0,
          },
        },
      }
    );

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

    expect(getAllByRole('link')[0]).toHaveAttribute(
      'href',
      '/people/11?page=1&search=a'
    );
  });

  it('renders the main without pagination and people', async () => {
    server.use(
      http.get('https://swapi.dev/api/people', () => {
        return HttpResponse.json({
          count: 0,
          next: null,
          previous: null,
          results: [],
        });
      })
    );

    const { container, getByText } = renderWithProviders(
      <MemoryRouter initialEntries={['?search=null']}>
        <Main>
          <PeopleList />
        </Main>
      </MemoryRouter>,
      {
        preloadedState: {
          choose: {
            length: 0,
          },
        },
      }
    );

    await whenStable();
    expect(container.querySelectorAll('div[class*="container"]').length).toBe(
      0
    );
    expect(
      getByText('No characters with the name "null" found')
    ).toBeInTheDocument();
  });
});
