import { vi, describe, it, expect, Mock, beforeEach, afterEach } from 'vitest';
import { PersonDetail } from '../../src/widgets';
import * as byId from '../../src/widgets/personDetail/model/apiSliceWithPersonById';
import { useAppDispatch } from '../../src/shared';
import React from 'react';
import { renderWithProviders } from '../test-utils';

const mockDispatch = vi.fn();

beforeEach(() => {
  vi.mock('next/router', () => ({
    useRouter: vi.fn().mockImplementation(() => ({
      isFallback: false,
      pathname: '/',
      route: '/',
      query: { id: '1' },
      asPath: '/',
      basePath: '',
      events: {
        on: vi.fn(),
        off: vi.fn(),
        emit: vi.fn(),
      },
      push: vi.fn(),
      replace: vi.fn(),
      reload: vi.fn(),
      back: vi.fn(),
      prefetch: vi.fn(),
      beforePopState: vi.fn(),
      isLocaleDomain: false,
      isReady: true,
      defaultLocale: 'en',
      domainLocales: [],
      isPreview: false,
    })),
  }));

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
