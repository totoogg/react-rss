import React from 'react';
import { describe, it, expect } from 'vitest';
import { Header } from '../../src/widgets/header/ui/header';
import { BrowserRouter } from 'react-router';
import '@testing-library/jest-dom/vitest';
import { renderWithProviders } from '../test-utils';

describe('Header Component', () => {
  it('renders the header', () => {
    const { container } = renderWithProviders(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(container.querySelectorAll('div[class*="header"]').length).toBe(1);
    expect(container.querySelectorAll('div[class*="wrapper"]').length).toBe(1);
    expect(container.querySelectorAll('div[class*="search"]').length).toBe(1);
  });
});
