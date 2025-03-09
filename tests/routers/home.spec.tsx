import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { loader } from '../../src/app/routers/home';

beforeEach(() => {
  vi.mock('./wrappers/homeWrapper', () => ({
    Wrapper: vi.fn(() => null),
  }));
  vi.mock('react-router', async () => {
    const mod =
      await vi.importActual<typeof import('react-router')>('react-router');
    return {
      ...mod,
      useLoaderData: vi.fn(),
      useSearchParams: () => [new URLSearchParams()],
      useNavigate: () => vi.fn(),
      useLocation: () => ({
        location: {
          search: 'search=a',
        },
      }),
    };
  });
});

afterEach(() => {
  vi.useRealTimers();
  vi.clearAllMocks();
});

const mockFetch = (peopleData: unknown, filmsData: unknown) => {
  global.fetch = vi
    .fn()
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(peopleData),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(filmsData),
    });
};

describe('HomePage Component', () => {
  it('fetch correct data', async () => {
    const peopleData = { count: 1, results: [{ name: 'Leia' }] };
    const filmsData = { results: [{ title: 'Empire Strikes Back' }] };
    mockFetch(peopleData, filmsData);

    const request = {
      url: 'https://swapi.dev/api/people/?search=Leia&page=2',
    };

    const result = await loader({ request });

    expect(fetch).toHaveBeenCalledWith(
      'https://swapi.dev/api/people/?search=Leia&page=2'
    );
    expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/films');

    expect(result).toEqual({
      people: peopleData,
      films: filmsData,
    });
  });

  it('default parameters', async () => {
    const peopleData = { count: 0, results: [] };
    const filmsData = { results: [] };
    mockFetch(peopleData, filmsData);

    const request = { url: 'https://swapi.dev/' };
    await loader({ request });

    expect(fetch).toHaveBeenCalledWith(
      'https://swapi.dev/api/people/?search=&page=1'
    );
  });

  it('API errors', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ detail: 'Not found' }),
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ detail: 'Server error' }),
      });

    const request = { url: 'https://swapi.dev/' };
    const result = await loader({ request });

    expect(result).toEqual({
      people: { detail: 'Not found' },
      films: { detail: 'Server error' },
    });
  });
});
