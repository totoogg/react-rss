import React, { act } from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { HomePage } from '../../src/_pages/homePage/ui/homePage';
import '@testing-library/jest-dom/vitest';
import { renderWithProviders } from '../test-utils';
import { server } from '../server';
import { http, HttpResponse } from 'msw';
import { fireEvent } from '@testing-library/dom';

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
      useRouter: () => ({
        query: { page: '1', search: '' },
        push: mockedSetSearchParams,
        refresh: vi.fn(),
      }),
    };
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('HomePage Component', () => {
  it('renders the HomePage without error', async () => {
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

  it('renders the HomePage without search params', async () => {
    const { container } = renderWithProviders(<HomePage />);

    await whenStable();

    expect(container.querySelectorAll('div[class*="page"]').length).toBe(1);

    expect(container.querySelectorAll('div[class*="main"]').length).toBe(1);
  });
});
