import React, { act } from 'react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { PeoplePage } from '../../src/_pages/peoplePage/ui/peoplePage';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { renderWithProviders } from '../test-utils';
import { fireEvent } from '@testing-library/dom';

const whenStable = async () =>
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

const mockedSetSearchParams = vi.fn();

beforeEach(() => {
  vi.mock('next/router', async () => {
    const actual =
      await vi.importActual<typeof import('next/router')>('next/router');
    return {
      ...actual,
      useRouter: () => ({
        query: { page: '1', search: '', id: 1 },
        push: mockedSetSearchParams,
      }),
    };
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('PeoplePage Component', () => {
  it('renders the PeoplePage', async () => {
    const { container, getByAltText } = renderWithProviders(<PeoplePage />);

    await whenStable();

    expect(container.querySelectorAll('div[class*="page"]').length).toBe(1);
    expect(container.querySelectorAll('div[class*="wrapper"]').length).toBe(1);
    expect(container.querySelectorAll('div[class*="detail"]').length).toBe(1);

    await userEvent.click(container.querySelectorAll('div[class*="page"]')[0]);
    await whenStable();
    expect(mockedSetSearchParams).toHaveBeenCalled();

    const image = getByAltText('');
    expect(image).toBeInTheDocument();
    fireEvent.load(image);
  });
});
