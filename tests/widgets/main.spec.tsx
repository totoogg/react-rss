import React, { act } from 'react';
import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest';
import { Main } from '../../src/widgets/main/ui/main';
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

const mockedSetSearchParams = vi.fn();

beforeEach(() => {
  vi.mock('next/navigation', async () => {
    const actual =
      await vi.importActual<typeof import('next/navigation')>(
        'next/navigation'
      );
    return {
      ...actual,
      useRouter: () => ({
        query: { page: '1', search: '' },
        push: mockedSetSearchParams,
      }),
    };
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Main Component', () => {
  it('renders the main', async () => {
    const { container } = renderWithProviders(
      <Main count={2}>
        <div>Hello</div>
      </Main>,
      {
        preloadedState: {
          choose: {
            length: 0,
          },
        },
      }
    );

    await whenStable();
    expect(container.querySelectorAll('div[class*="notFound"]').length).toBe(0);
  });

  it('renders the main with select people', async () => {
    const { getByText } = renderWithProviders(
      <Main count={0}>
        <div>Hello</div>
      </Main>,
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
      <Main count={0}>
        <div>Hello</div>
      </Main>,
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
      <Main count={0}>
        <div>Hello</div>
      </Main>,
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
      getByText('No characters with the name "" found')
    ).toBeInTheDocument();
  });
});
