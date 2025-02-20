import React, { act } from 'react';
import { describe, it, expect } from 'vitest';
import { AppRouter } from '../../src/app/routers/appRouter';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';
import { renderWithProviders } from '../test-utils';

const whenStable = async () =>
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

describe('AppRouter Component', () => {
  it('renders the AppRouter', async () => {
    const { container, getByText, getAllByRole } = renderWithProviders(
      <MemoryRouter initialEntries={['/?page=1&search=a']}>
        <AppRouter />
      </MemoryRouter>
    );

    await whenStable();
    expect(container.querySelectorAll('div[class*="container"]').length).toBe(
      2
    );
    expect(container.querySelectorAll('a[class*="no-underline"]').length).toBe(
      2
    );
    expect(getByText('nick')).toBeInTheDocument();
    expect(getByText('41.9BBY')).toBeInTheDocument();
    expect(getByText('4, 5, 6')).toBeInTheDocument();

    expect(getAllByRole('link')[0]).toHaveAttribute(
      'href',
      '/people/11?page=1&search=a'
    );
  });
});
