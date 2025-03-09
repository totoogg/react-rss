import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Pagination } from '../../src/features/pagination/ui/pagination';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
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

describe('Pagination Component', () => {
  it('onClick next page', async () => {
    const { getByText } = renderWithProviders(<Pagination count="12" />);

    const page = getByText('1');

    expect(page.className).toMatch(/flat/);

    await userEvent.click(getByText('2'));
    expect(mockedSetSearchParams).toHaveBeenCalledWith('/?search=&page=2');
  });
});
