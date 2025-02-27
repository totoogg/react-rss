import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import Index from '../../src/pages/index';
import '@testing-library/jest-dom/vitest';
import * as useHooks from '../../src/shared/lib/searchPeople/useSearchPeople';
import { renderWithProviders } from '../test-utils';

const mockedSetSearchParams = vi.fn();

beforeEach(() => {
  vi.mock('next/router', async () => {
    const actual =
      await vi.importActual<typeof import('next/router')>('next/router');
    return {
      ...actual,
      useRouter: () => ({
        query: { page: '1', search: '' },
        push: mockedSetSearchParams,
      }),
    };
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Index Component', () => {
  it('renders the Index Page', async () => {
    vi.spyOn(useHooks, 'useSearchPeople').mockReturnValue({
      count: 1,
      people: [{ name: '1', birth_year: '2', films: ['3'], url: '4' }],
    });
    const { getByText } = renderWithProviders(Index('a'));
    expect(getByText('Birthday year:')).toBeInTheDocument();

    const props = await Index.getInitialProps({
      query: { first: 'whatever' },
      pathname: '',
      AppTree: function () {
        return null;
      },
    });

    expect(props).toEqual({ first: 'whatever' });
  });
});
