import React, { act } from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { HomePage } from '../../src/_pages/homePage/ui/homePage';
import '@testing-library/jest-dom/vitest';
import { renderWithProviders } from '../test-utils';
import { server } from '../server';
import { http, HttpResponse } from 'msw';
import { fireEvent } from '@testing-library/dom';
import * as nextRouter from 'next/navigation';

const BASE_ROUTER_MOCK: nextRouter.NextRouter = {
  route: '/',
  pathname: '/',
  asPath: '/',
  basePath: '',
  query: {},
  push: vi.fn(),
  replace: vi.fn(),
  reload: vi.fn(),
  back: vi.fn(),
  prefetch: vi.fn(),
  beforePopState: vi.fn(),
  events: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  defaultLocale: 'en',
  domainLocales: [],
  isPreview: false,
  forward: vi.fn(),
};

export function mockNextRouterQuery(query: nextRouter.NextRouter['query']) {
  vi.spyOn(nextRouter, 'useRouter').mockImplementation(() => ({
    ...BASE_ROUTER_MOCK,
    query,
  }));
}

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
  vi.resetAllMocks();
});

describe('HomePage Component', () => {
  it('renders the HomePage without error', async () => {
    mockNextRouterQuery({ page: '1', search: '' });
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
    vi.mock('next/navigation', async () => {
      const actual =
        await vi.importActual<typeof import('next/navigation')>(
          'next/navigation'
        );
      return {
        ...actual,
        useRouter: () => ({
          query: {},
          push: mockedSetSearchParams,
        }),
      };
    });

    const { container } = renderWithProviders(<HomePage />);

    await whenStable();

    expect(container.querySelectorAll('div[class*="page"]').length).toBe(1);

    expect(container.querySelectorAll('div[class*="main"]').length).toBe(0);
  });
});
