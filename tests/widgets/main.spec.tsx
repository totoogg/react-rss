import React, { act } from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { Main } from '../../src/widgets/main/ui/main';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';
import { renderWithProviders } from '../test-utils';
import { server } from '../server/index';
import { http, HttpResponse } from 'msw';
import reducer, {
  IChoosePeople,
  choosePeople,
  clearChoosePeople,
} from '../../src/features/choose/model/choosePeopleSlice';

const whenStable = async () =>
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

afterEach(() => {
  vi.clearAllMocks();
});

describe('Main Component', () => {
  it('renders the main', async () => {
    const { container } = renderWithProviders(
      <MemoryRouter initialEntries={['/test?page=1&search=a']}>
        <Main>
          <div>Hello</div>
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
  });

  it('renders the main with select people', async () => {
    const { getByText } = renderWithProviders(
      <MemoryRouter initialEntries={['/test?page=1&search=a']}>
        <Main>
          <div>Hello</div>
        </Main>
      </MemoryRouter>,
      {
        preloadedState: {
          choose: {
            length: 2,
          },
        },
      }
    );

    await whenStable();

    expect(getByText('people selected')).toBeInTheDocument();
    expect(getByText('Unselect all')).toBeInTheDocument();
    expect(getByText('Download')).toBeInTheDocument();
  });

  it('renders the main with select person', async () => {
    const { getByText } = renderWithProviders(
      <MemoryRouter initialEntries={['/test?page=1&search=a']}>
        <Main>
          <div>Hello</div>
        </Main>
      </MemoryRouter>,
      {
        preloadedState: {
          choose: {
            length: 1,
          },
        },
      }
    );

    await whenStable();

    expect(getByText('person selected')).toBeInTheDocument();
  });

  it('function select people', async () => {
    const previousStateSelect: IChoosePeople = { length: 0 };

    expect(reducer(previousStateSelect, choosePeople({}))).toEqual({
      undefined: {},
      length: 1,
    });

    const previousStateClean: IChoosePeople = { length: 1 };

    expect(reducer(previousStateClean, clearChoosePeople())).toEqual({
      length: 0,
    });
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
          <div>Hello</div>
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
