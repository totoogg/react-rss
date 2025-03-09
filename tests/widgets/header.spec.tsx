import React from 'react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { Header } from '../../src/widgets/header/ui/header';
import '@testing-library/jest-dom/vitest';
import { renderWithProviders } from '../test-utils';

const mockedSetSearchParams = vi.fn();

beforeEach(() => {
  vi.mock('next/navigation', async () => {
    const actual =
      await vi.importActual<typeof import('next/navigation')>(
        'next/navigation'
      );
    return {
      ...actual,
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
        replace: mockedSetSearchParams,
      }),
    };
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Header Component', () => {
  it('renders the header', () => {
    const { container } = renderWithProviders(<Header />);
    expect(container.querySelectorAll('div[class*="header"]').length).toBe(1);
    expect(container.querySelectorAll('div[class*="wrapper"]').length).toBe(1);
    expect(container.querySelectorAll('div[class*="search"]').length).toBe(1);
  });
});
