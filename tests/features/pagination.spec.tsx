import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Pagination } from '../../src/features/pagination/ui/pagination';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';

const mockedUseNavigate = vi.fn();

beforeEach(() => {
  vi.mock('react-router-dom', async () => {
    const mod =
      await vi.importActual<typeof import('react-router-dom')>(
        'react-router-dom'
      );
    return {
      ...mod,
      useNavigate: () => mockedUseNavigate,
      useLocation: () => ({
        location: {
          search: 'search=a&page=',
        },
      }),
    };
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Pagination Component', () => {
  it('onClick next page', async () => {
    const { getByText } = render(<Pagination count="12" />, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={['/?search=&page=']}>
          {children}
        </MemoryRouter>
      ),
    });

    const page = getByText('1');

    expect(page.className).toMatch(/flat/);
  });
});
