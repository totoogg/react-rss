import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Footer } from '../../src/widgets/footer/ui/footer';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';

const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('Footer Component', () => {
  it('renders the footer', () => {
    const { container } = render(<Footer />);
    expect(container.querySelectorAll('div[class*="footer"]').length).toBe(1);
    expect(container.querySelectorAll('div[class*="wrapper"]').length).toBe(1);
    expect(screen.getByText('ERROR')).toBeInTheDocument();
  });

  it('calls the onClick handler when clicked button error', async () => {
    try {
      vi.spyOn(console, 'error').mockImplementation(() => null);
      render(<Footer />);
      await userEvent.click(screen.getByText('ERROR'));
    } catch (e) {
      expect(e.message).toBe('Error');
    }
  });

  it('calls loader', async () => {
    const { container } = render(<Footer />);
    window.dispatchEvent(new Event('customLoaderOn'));
    await flushPromises();
    expect(container.querySelectorAll('span[class*="loader"]').length).toBe(1);
    window.dispatchEvent(new Event('customLoaderOff'));
    await flushPromises();
    expect(container.querySelectorAll('span[class*="loader"]').length).toBe(0);
  });
});
