import { Character, film } from '../types/apiTypes';

let count = 0;

function checkLoader() {
  if (count === 0) {
    window.dispatchEvent(new Event('customLoaderOff'));
  } else {
    window.dispatchEvent(new Event('customLoaderOn'));
  }
}

export function addCount() {
  count++;
  checkLoader();
}

export function minusCount() {
  count--;
  checkLoader();
}

export async function getStartPeople() {
  addCount();
  const res = await fetch(`https://swapi.dev/api/people`);
  const data = await res.json();
  const results = await data.results;
  minusCount();
  return results;
}

export async function getSearchPeople(search: string) {
  addCount();
  const res = await fetch(`https://swapi.dev/api/people/?search=${search}`);
  const data = await res.json();
  const results = await data.results;
  minusCount();
  return results;
}

export async function getFilms() {
  addCount();
  const res = await fetch(`https://swapi.dev/api/films`);
  const data = await res.json();
  const results = (await data.results.map((item: Character) => ({
    title: item.title,
    url: item.url,
  }))) as film[];
  minusCount();
  return results;
}

export async function getHome(url: string) {
  addCount();
  const res = await fetch(url);
  const data = await res.json();
  const results = await data.name;
  minusCount();
  return results;
}
