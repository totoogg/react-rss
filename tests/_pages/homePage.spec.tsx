import React, { act } from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { HomePage } from '../../src/_pages/homePage/ui/homePage';
import '@testing-library/jest-dom/vitest';
import { renderWithProviders } from '../test-utils';
import { server } from '../server';
import { http, HttpResponse } from 'msw';
import * as useHooks from '../../src/shared/lib/searchPeople/useSearchPeople';
import { fireEvent } from '@testing-library/dom';

const whenStable = async () =>
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

const mockedSetSearchParams = vi.fn();

beforeEach(() => {
  vi.mock('next/router', async () => {
    const actual =
      await vi.importActual<typeof import('next/router')>('next/router');
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

describe('HomePage Component', () => {
  it('renders the HomePage without error', async () => {
    vi.spyOn(useHooks, 'useSearchPeople').mockReturnValue({
      count: 1,
      people: [{ name: '1', birth_year: '2', films: ['3'], url: '4' }],
    });
    const { container, getByRole } = renderWithProviders(<HomePage />);

    await whenStable();

    expect(container.querySelectorAll('div[class*="page"]').length).toBe(1);

    expect(container.querySelectorAll('div[class*="main"]').length).toBe(1);
    const image = getByRole('img');
    expect(image).toBeInTheDocument();
    fireEvent.load(image);
  });

  it('renders the HomePage with error', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => null);
    server.use(http.get('*', () => HttpResponse.error()));

    const { container, getByText } = renderWithProviders(<HomePage />, {
      preloadedState: {
        error: {
          isError: true,
        },
      },
    });

    await whenStable();
    expect(container.querySelectorAll('div[class*="page"]').length).toBe(1);

    expect(
      getByText('Something went wrong. Please try again later.')
    ).toBeInTheDocument();
  });
});
