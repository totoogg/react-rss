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

describe('Pagination Component', () => {
  it('onClick next page', async () => {
    const { getByText } = renderWithProviders(<Pagination count="12" />);

    const page = getByText('1');

    expect(page.className).toMatch(/flat/);

    await userEvent.click(getByText('2'));
    expect(mockedSetSearchParams).toHaveBeenCalledWith(
      '/?search=&page=2',
      undefined,
      { shallow: false }
    );
  });
});
