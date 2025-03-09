import { vi, describe, it, expect, Mock, beforeEach, afterEach } from 'vitest';
import { PersonDetail } from '../../src/widgets';
import * as byId from '../../src/widgets/personDetail/model/apiSliceWithPersonById';
import { useAppDispatch } from '../../src/shared';
import React from 'react';
import { renderWithProviders } from '../test-utils';

const mockDispatch = vi.fn();

beforeEach(() => {
  vi.mock('next/navigation', async () => {
    const actual =
      await vi.importActual<typeof import('next/navigation')>(
        'next/navigation'
      );
    return {
      ...actual,
      useParams: () => ({
        id: 1,
      }),
      useSearchParams: () => {
        return {
          has: (key: string) => {
            return key === 'page' || key === 'search';
          },
          get: (key: string) => {
            if (key === 'page') {
              return '1';
            } else if (key === 'search') {
              return '';
            }
            return null;
          },
        };
      },
      useRouter: () => ({
        query: { page: '1', search: '' },
        push: vi.fn(),
        replace: vi.fn(),
      }),
    };
  });

  vi.mock('@/shared', async (importOriginal) => ({
    ...(await importOriginal<typeof import('../../src/shared')>()),
    useAppDispatch: vi.fn(),
    useGetFilmsQuery: vi.fn().mockReturnValue({ data: [] }),
  }));

  vi.mock('../model/apiSliceWithPersonById', () => ({
    useGetPersonByIdQuery: vi.fn(),
    useGetHomeByIdQuery: vi.fn(),
  }));

  (useAppDispatch as Mock).mockReturnValue(mockDispatch);
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('PersonDetail Component', () => {
  it('dispatch removeLoader', async () => {
    vi.spyOn(byId, 'useGetPersonByIdQuery').mockReturnValue({
      data: { homeworld: 'planets/10/' },
      isSuccess: true,
    });
    vi.spyOn(byId, 'useGetHomeByIdQuery').mockReturnValue({
      data: { homeworld: 'planets/10/' },
      isSuccess: true,
    });

    renderWithProviders(<PersonDetail />);

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'loader/removeLoader',
      })
    );
  });

  it('not dispatch removeLoader', () => {
    vi.spyOn(byId, 'useGetPersonByIdQuery').mockReturnValue({
      data: undefined,
      isSuccess: false,
    });
    vi.spyOn(byId, 'useGetHomeByIdQuery').mockReturnValue({
      data: undefined,
      isSuccess: false,
    });

    renderWithProviders(<PersonDetail />);

    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
