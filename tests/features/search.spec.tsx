import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Search } from '../../src/features/search/ui/search';
import * as useHooks from '../../src/shared/lib/restoreSearch/useRestoreSearch';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';

const mockedUseNavigate = vi.fn();

beforeEach(() => {
  vi.spyOn(useHooks, 'useRestoreSearch').mockReturnValue('');
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
          search: 'search=a',
        },
      }),
    };
  });
  vi.mock('module_path/module_name', () => ({
    useRestoreSearch: () => ({
      setSearch: vi.fn(),
      search: '',
    }),
  }));
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Search Component', () => {
  it('onChange input search', async () => {
    const { getByPlaceholderText } = render(<Search />, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={['/?search=&page=1']}>
          {children}
        </MemoryRouter>
      ),
    });

    const input = getByPlaceholderText('Search');

    await userEvent.type(input, 'Nick');

    expect(input).toHaveValue('Nick');
  });

  it('onEnter input search', async () => {
    const { getByPlaceholderText } = render(<Search />, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={['/?search=&page=1']}>
          {children}
        </MemoryRouter>
      ),
    });

    const input = getByPlaceholderText('Search');

    await userEvent.type(input, 'Nick{enter}');
    await userEvent.type(input, '{enter}');

    expect(input).toHaveValue('Nick');
  });
});
