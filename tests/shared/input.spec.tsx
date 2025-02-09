import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from '../../src/shared/ui/input/input';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';

describe('Input Component', () => {
  it('renders the input with the correct value', () => {
    render(
      <Input
        name="search"
        onChange={() => {}}
        placeholder="Search"
        type="text"
        value="search"
        className={['input']}
        onEnter={() => {}}
      />
    );

    const input = screen.getByDisplayValue('search');
    expect(input).toBeInTheDocument();
  });

  it('calls the onChange and onEnter handler', async () => {
    const handleChange = vi.fn();
    const handleEnter = vi.fn();
    render(
      <Input
        name="search"
        onChange={handleChange}
        placeholder="Search"
        type="text"
        className={['input']}
        onEnter={handleEnter}
      />
    );
    const input = screen.getByPlaceholderText('Search');

    await userEvent.type(input, 'Nick{enter}');

    expect(input).toHaveValue('Nick');
    expect(handleChange).toHaveBeenCalledTimes(4);
    expect(handleEnter).toHaveBeenCalledTimes(1);
  });
});
