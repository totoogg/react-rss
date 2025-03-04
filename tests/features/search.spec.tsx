import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Search } from '../../src/features/search/ui/search';
import * as useHooks from '../../src/shared/lib/restoreSearch/useRestoreSearch';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { renderWithProviders } from '../test-utils';

const mockedSetSearchParams = vi.fn();

beforeEach(() => {
  vi.spyOn(useHooks, 'useRestoreSearch').mockReturnValue('');
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
    const { getByPlaceholderText } = renderWithProviders(<Search />);

    const input = getByPlaceholderText('Search');

    await userEvent.type(input, 'Nick');

    expect(input).toHaveValue('Nick');
  });

  it('onEnter input search', async () => {
    const { getByPlaceholderText } = renderWithProviders(<Search />);

    const input = getByPlaceholderText('Search');

    await userEvent.type(input, 'Nick{enter}');
    await userEvent.type(input, '{enter}');

    expect(input).toHaveValue('Nick');
  });
});
