import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import RootLayout, { metadata } from '../../src/app/layout';

vi.mock('@/_app/providers', () => ({
  Providers: vi.fn(({ children }) => children),
}));

vi.mock('@/_app/layout', () => ({
  Layout: vi.fn(({ children }) => <div data-testid="layout">{children}</div>),
}));

vi.mock('../index.css', () => ({}));

describe('RootLayout Component', () => {
  it('should export correct metadata', () => {
    expect(metadata).toEqual({
      title: 'React',
      description: 'React RSS',
    });
  });

  it('should render basic structure correctly', () => {
    const { container } = render(
      <RootLayout>
        <div data-testid="child">Test Content</div>
      </RootLayout>
    );

    expect(container.querySelectorAll('html').length).toBe(1);
    expect(container.querySelectorAll('body').length).toBe(1);
    expect(
      container.querySelectorAll('head link[href="/icon.svg"]').length
    ).toBe(1);
  });
});
