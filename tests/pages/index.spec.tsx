import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import Index from '../../src/pages/index';
import '@testing-library/jest-dom/vitest';
import { renderWithProviders } from '../test-utils';
import React from 'react';

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

describe('Index Component', () => {
  it('renders the Index Page', async () => {
    const { container } = renderWithProviders(<Index />);
    expect(container.querySelectorAll('div[class*="page"]').length).toBe(1);
  });
});
