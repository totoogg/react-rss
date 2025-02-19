import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Layout } from '../../src/app/layout/layout';
import '@testing-library/jest-dom/vitest';
import * as useHooks from '../../src/shared/lib/restoreSearch/useRestoreSearch';
import { renderWithProviders } from '../test-utils';

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
      useSearchParams: () => ['', () => {}],
    };
  });
  vi.mock('module_path/module_name', () => ({
    useRestoreSearch: () => ({
      setSearch: vi.fn(),
      search: '',
    }),
  }));
});

describe('Providers Component', () => {
  it('render providers', async () => {
    const { getByText } = renderWithProviders(
      <Layout>
        <p>Hello</p>
      </Layout>
    );

    const page = getByText('Hello');

    expect(page).toBeInTheDocument();
  });
});
