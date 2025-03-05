import React, { act } from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Error } from '../../src/_pages/error/ui/error';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';

const whenStable = async () =>
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

const mockedSetSearchParams = vi.fn();

beforeEach(() => {
  vi.mock('next/navigation', async () => {
    const actual =
      await vi.importActual<typeof import('next/navigation')>(
        'next/navigation'
      );
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

describe('Error page Component', () => {
  it('renders the Error Page', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => null);
    const { container, getByRole, getByText } = render(<Error />);

    await whenStable();

    expect(container.querySelectorAll('div[class*="wrapper"]').length).toBe(1);
    expect(getByRole('heading', { name: 'Oops!' })).toBeInTheDocument();
    expect(
      getByText('Sorry, an unexpected error has occurred.')
    ).toBeInTheDocument();
    expect(getByText('Home page')).toBeInTheDocument();

    await userEvent.click(getByText('Home page'));

    expect(mockedSetSearchParams).toHaveBeenCalled();
    expect(error).toHaveBeenCalled();
  });
});
