import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Loader } from '../../src/shared/ui/loader/loader';
import '@testing-library/jest-dom/vitest';

describe('Loader Component', () => {
  it('renders the loader', () => {
    const { container } = render(<Loader />);
    expect(container.querySelectorAll('span[class*="loader"]').length).toBe(1);
  });
});
