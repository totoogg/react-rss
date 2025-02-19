import React from 'react';
import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Footer } from '../../src/widgets/footer/ui/footer';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../test-utils';
import reducer, {
  addLoader,
  ILoader,
  removeLoader,
} from '../../src/shared/api/loader/loaderSlice';
import '@testing-library/jest-dom/vitest';

describe('Footer Component', () => {
  it('renders the footer', () => {
    const { container } = renderWithProviders(<Footer />);
    expect(container.querySelectorAll('div[class*="footer"]').length).toBe(1);
    expect(container.querySelectorAll('div[class*="wrapper"]').length).toBe(1);
    expect(screen.getByText('ERROR')).toBeInTheDocument();
  });

  it('calls the onClick handler when clicked button error', async () => {
    try {
      vi.spyOn(console, 'error').mockImplementation(() => null);
      renderWithProviders(<Footer />);
      await userEvent.click(screen.getByText('ERROR'));
    } catch (error) {
      expect(error.message).toBe('Error');
    }
  });

  it('loader on', async () => {
    const { container } = renderWithProviders(<Footer />, {
      preloadedState: {
        loader: {
          isLoader: true,
          countLoader: 1,
        },
      },
    });
    const previousStateStart: ILoader = { isLoader: false, countLoader: 0 };

    expect(reducer(previousStateStart, addLoader())).toEqual({
      isLoader: true,
      countLoader: 1,
    });

    expect(container.querySelectorAll('span[class*="loader"]').length).toBe(1);
  });

  it('loader off', async () => {
    const { container } = renderWithProviders(<Footer />, {
      preloadedState: {
        loader: {
          isLoader: false,
          countLoader: 0,
        },
      },
    });

    const previousStateFinish: ILoader = { isLoader: true, countLoader: 1 };

    expect(reducer(previousStateFinish, removeLoader())).toEqual({
      isLoader: false,
      countLoader: 0,
    });

    expect(container.querySelectorAll('span[class*="loader"]').length).toBe(0);
  });
});
