import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../../src/shared/ui/button/button.tsx';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';

describe('Button Component', () => {
  it('renders the button with the correct text', () => {
    render(
      <Button onClick={() => {}} className={['button']} classNameButton="flat">
        Click Me
      </Button>
    );
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('calls the onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button text="Click Me" onClick={handleClick} />);
    await userEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
