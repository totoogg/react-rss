import React, { act } from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Error from '../../src/app/routers/error';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router';

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
      useLocation: () => ({
        location: {
          search: 'search=a',
        },
      }),
    };
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Error page Component', () => {
  it('renders the Error Page', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => null);
    const { container, getByRole, getByText } = render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>
    );

    await whenStable();

    expect(container.querySelectorAll('div[class*="wrapper"]').length).toBe(1);
    expect(getByRole('heading', { name: 'Oops!' })).toBeInTheDocument();
    expect(
      getByText('Sorry, an unexpected error has occurred.')
    ).toBeInTheDocument();
    expect(getByText('Home page')).toBeInTheDocument();

    await userEvent.click(getByText('Home page'));

    expect(mockedUseNavigate).toHaveBeenCalled();
    expect(error).toHaveBeenCalled();
  });
});
