import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Header } from '../../src/widgets/header/ui/header';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';

describe('Header Component', () => {
  it('renders the header', () => {
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(container.querySelectorAll('div[class*="header"]').length).toBe(1);
    expect(container.querySelectorAll('div[class*="wrapper"]').length).toBe(1);
    expect(container.querySelectorAll('div[class*="search"]').length).toBe(1);
  });
});
