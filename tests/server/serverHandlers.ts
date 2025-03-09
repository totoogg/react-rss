import { http, HttpResponse } from 'msw';

const handlers = [
  http.get('https://swapi.dev/api/people/', ({ request }) => {
    const mockApiResponse = {
      count: '11',
      results: [
        {
          name: 'nick',
          url: 'https://swapi.dev/api/people/11/',
          home: 'https://swapi.dev/api/planets/1/',
          films: [
            'https://swapi.dev/api/films/4/',
            'https://swapi.dev/api/films/5/',
            'https://swapi.dev/api/films/6/',
          ],
          birth_year: '41.9BBY',
        },
        {
          name: '',
          url: '',
          home: '',
          films: [],
          birth_year: '',
        },
      ],
    };

    const url = new URL(request.url);
    const search = url.searchParams.get('search');
    if (search === 'null') {
      return HttpResponse.json({ count: '11', results: [] });
    }

    return HttpResponse.json(mockApiResponse);
  }),
  http.get('https://swapi.dev/api/films', () => {
    const mockApiResponse = {
      results: [
        { title: '1', url: 'https://swapi.dev/api/films/1/' },
        { title: '2', url: 'https://swapi.dev/api/films/2/' },
        { title: '3', url: 'https://swapi.dev/api/films/3/' },
        { title: '4', url: 'https://swapi.dev/api/films/4/' },
        { title: '5', url: 'https://swapi.dev/api/films/5/' },
        { title: '6', url: 'https://swapi.dev/api/films/6/' },
      ],
    };
    return HttpResponse.json(mockApiResponse);
  }),
  http.get('https://swapi.dev/api/people/1', () => {
    const mockApiResponse = {
      name: 'Han Solo',
      height: '180',
      mass: '80',
      hair_color: 'brown',
      skin_color: 'fair',
      eye_color: 'brown',
      birth_year: '29BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/22/',
      films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/2/',
        'https://swapi.dev/api/films/3/',
      ],
      url: 'https://swapi.dev/api/people/14/',
    };
    return HttpResponse.json(mockApiResponse);
  }),
  http.get('https://swapi.dev/api/planets/22', () => {
    const mockApiResponse = 'Tatooine';
    return HttpResponse.json(mockApiResponse);
  }),
];

export { handlers };
