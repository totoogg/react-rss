import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Fallback } from '../../src/shared/ui/fallback/fallback';
import '@testing-library/jest-dom/vitest';

describe('Fallback Component', () => {
  it('renders the fallback with the correct text', () => {
    render(<Fallback />);
    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
  });
});
