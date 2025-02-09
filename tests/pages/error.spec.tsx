import React, { act } from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Error } from '../../src/pages/error/ui/error';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';

const whenStable = async () =>
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

const mockedUseNavigate = vi.fn();
const mockedUseRouteError = vi.fn();

beforeEach(() => {
  vi.mock('react-router-dom', async () => {
    const mod =
      await vi.importActual<typeof import('react-router-dom')>(
        'react-router-dom'
      );
    return {
      ...mod,
      useNavigate: () => mockedUseNavigate,
      useRouteError: () => mockedUseRouteError,
    };
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Error page Component', () => {
  it('renders the Error Page', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => null);
    const { container, getByRole, getByText } = render(<Error />, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={['/error']}>{children}</MemoryRouter>
      ),
    });

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
