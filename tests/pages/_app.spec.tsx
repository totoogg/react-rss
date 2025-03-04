import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import type { AppProps } from 'next/app';
import MyApp from '../../src/pages/_app';
import { Layout } from '../../src/_app/layout';
import React from 'react';

const mockComponent = vi.fn().mockReturnValue(<div>Test Component</div>);
const mockAppProps: AppProps = {
  Component: mockComponent,
  pageProps: { testProp: 'value' },
  router: {} as never,
};

beforeEach(() => {
  vi.mock('@/_app/store', () => ({
    wrapper: {
      useWrappedStore: vi.fn().mockReturnValue({
        store: { mockStore: true },
        props: { pageProps: {} },
      }),
    },
  }));

  vi.mock('react-redux', () => ({
    Provider: vi.fn(({ children }) => <div>{children}</div>),
  }));

  vi.mock('@/_app/providers', () => ({
    Providers: vi.fn(({ children }) => <div>{children}</div>),
  }));

  vi.mock('@/_app/layout', () => ({
    Layout: vi.fn(({ children }) => <div>{children}</div>),
  }));
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('MyApp component', () => {
  it('render MyApp component', () => {
    const { container } = render(<MyApp {...mockAppProps} />);

    expect(container.querySelector('div')).toBeTruthy();
    expect(Layout).toHaveBeenCalledWith(
      expect.objectContaining({
        children: expect.anything(),
      }),
      expect.anything()
    );
  });
});
