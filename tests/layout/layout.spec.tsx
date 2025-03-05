import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Layout } from '../../src/_app/layout/layout';
import { ThemeContext } from '../../src/shared/config/theme/themeConfig';
import '@testing-library/jest-dom/vitest';
import * as useHooks from '../../src/shared/lib/restoreSearch/useRestoreSearch';
import { renderWithProviders } from '../test-utils';

const mockedSetSearchParams = vi.fn();

beforeEach(() => {
  vi.spyOn(useHooks, 'useRestoreSearch').mockReturnValue('');
  vi.mock('next/navigation', async () => {
    const actual =
      await vi.importActual<typeof import('next/navigation')>(
        'next/navigation'
      );
    return {
      ...actual,
      useRouter: () => ({
        query: { page: '1', search: '', id: 1 },
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

describe('Layout Component', () => {
  it('render layout with theme light', async () => {
    const { getByText } = renderWithProviders(
      <ThemeContext.Provider value={{ theme: 'light' }}>
        <Layout>
          <p>Hello</p>
        </Layout>
      </ThemeContext.Provider>
    );

    const page = getByText('Hello');

    expect(page).toBeInTheDocument();
  });

  it('render layout with theme dark', async () => {
    const { getByText } = renderWithProviders(
      <Layout>
        <p>Hello</p>
      </Layout>
    );

    const page = getByText('Hello');

    expect(page).toBeInTheDocument();
  });
});
