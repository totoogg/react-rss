import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Providers } from '../../src/_app/providers/providers';
import '@testing-library/jest-dom/vitest';

describe('Providers Component', () => {
  it('render providers', async () => {
    const { getByText } = render(
      <Providers>
        <p>Hello</p>
      </Providers>
    );

    const page = getByText('Hello');

    expect(page).toBeInTheDocument();
  });
});
