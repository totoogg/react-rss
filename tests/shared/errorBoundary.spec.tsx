import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ErrorBoundary } from '../../src/shared/ui/errorBoundary/errorBoundary';
import '@testing-library/jest-dom/vitest';

const renderProviders = (ui: React.ReactElement) => render(ui, {});

const Child = () => {
  throw new Error();
};

describe('Error Boundary', () => {
  it(`should render error boundary component when there is an error`, () => {
    vi.spyOn(console, 'error').mockImplementation(() => null);
    const { getByText } = renderProviders(
      <ErrorBoundary fallback={<>Something went wrong!</>}>
        <Child />
      </ErrorBoundary>
    );
    const errorMessage = getByText('Something went wrong!');
    expect(errorMessage).toBeDefined();
  });
});
