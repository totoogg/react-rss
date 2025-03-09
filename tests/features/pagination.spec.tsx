import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Pagination } from '../../src/features/pagination/ui/pagination';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../test-utils';

const mockedSetSearchParams = vi.fn();

beforeEach(() => {
  vi.mock('react-router', async () => {
    const mod =
      await vi.importActual<typeof import('react-router')>('react-router');
    return {
      ...mod,
      useSearchParams: () => [
        new Map([
          ['page', '1'],
          ['search', 'a'],
        ]),
        mockedSetSearchParams,
      ],
    };
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Pagination Component', () => {
  it('onClick next page', async () => {
    const { getByText } = renderWithProviders(
      <MemoryRouter initialEntries={['/?search=&page=']}>
        <Pagination count="12" />
      </MemoryRouter>
    );

    const page = getByText('1');

    expect(page.className).toMatch(/flat/);

    await userEvent.click(getByText('2'));
  });
});
