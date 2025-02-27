import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Pagination } from '../../src/features/pagination/ui/pagination';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';

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

describe('Pagination Component', () => {
  it('onClick next page', async () => {
    const { getByText } = render(<Pagination count="12" />);

    const page = getByText('1');

    expect(page.className).toMatch(/flat/);

    await userEvent.click(getByText('2'));
    expect(mockedSetSearchParams).toHaveBeenCalledWith(
      '/?search=&page=2',
      undefined,
      { shallow: true }
    );
  });
});
