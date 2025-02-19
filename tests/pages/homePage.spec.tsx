import React, { act } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { HomePage } from '../../src/pages/homePage/ui/homePage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';
import { renderWithProviders } from '../test-utils';
import { server } from '../server';
import { http, HttpResponse } from 'msw';

const whenStable = async () =>
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

describe('HomePage Component', () => {
  it('renders the HomePage without error', async () => {
    const { container } = renderWithProviders(
      <MemoryRouter initialEntries={['/test?page=1&search=a']}>
        <HomePage />
      </MemoryRouter>
    );

    await whenStable();

    expect(container.querySelectorAll('div[class*="page"]').length).toBe(1);

    expect(container.querySelectorAll('div[class*="main"]').length).toBe(1);
  });

  it('renders the HomePage with error', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => null);
    server.use(http.get('*', () => HttpResponse.error()));

    const { container, getByText } = renderWithProviders(
      <MemoryRouter initialEntries={['/test?page=1&search=a']}>
        <HomePage />
      </MemoryRouter>
    );

    await whenStable();
    expect(container.querySelectorAll('div[class*="page"]').length).toBe(1);

    expect(
      getByText('Something went wrong. Please try again later.')
    ).toBeInTheDocument();
  });
});
