import React from 'react';
import { describe, it, expect } from 'vitest';
import { ChoosePeople } from '../../src/features/choose/ui/choosePeople';
import '@testing-library/jest-dom/vitest';
import { renderWithProviders } from '../test-utils';
import { fireEvent } from '@testing-library/dom';

describe('ChoosePeople Component', () => {
  it('onChoose people', async () => {
    const { container } = renderWithProviders(
      <ChoosePeople birth_year="1" films={['2']} name="3" url="4" />,
      {
        preloadedState: {
          choose: {
            length: 0,
          },
        },
      }
    );
    const checkbox = container.querySelector('#choose-3') as HTMLInputElement;

    expect(checkbox.checked).toEqual(false);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);
  });
});
