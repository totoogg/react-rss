import React, { act } from 'react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { PeoplePage } from '../../src/pages/peoplePage/ui/peoplePage';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { renderWithProviders } from '../test-utils';

const whenStable = async () =>
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

const mockedUseNavigate = vi.fn();

beforeEach(() => {
  vi.mock('react-router', async () => {
    const mod =
      await vi.importActual<typeof import('react-router')>('react-router');
    return {
      ...mod,
      useNavigate: () => mockedUseNavigate,
    };
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('PeoplePage Component', () => {
  it('renders the PeoplePage', async () => {
    const { container } = renderWithProviders(
      <MemoryRouter initialEntries={['/people/1?search=&page=1']}>
        <PeoplePage />
      </MemoryRouter>
    );

    await whenStable();

    expect(container.querySelectorAll('div[class*="page"]').length).toBe(1);
    expect(container.querySelectorAll('div[class*="wrapper"]').length).toBe(1);
    expect(container.querySelectorAll('div[class*="detail"]').length).toBe(1);

    await userEvent.click(container.querySelectorAll('div[class*="page"]')[0]);
    await whenStable();
    expect(mockedUseNavigate).toHaveBeenCalled();
  });
});
