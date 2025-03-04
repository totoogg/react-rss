import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import Index from '../../src/pages/people/[id]';
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
        query: { page: '1', search: '', id: 1 },
        push: mockedSetSearchParams,
      }),
    };
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Index[id] Component', () => {
  it('renders the Index[id] Page', async () => {
    const { getByText } = renderWithProviders(<Index />);
    expect(getByText('Height:')).toBeInTheDocument();
  });
});
