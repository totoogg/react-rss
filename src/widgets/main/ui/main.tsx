import { Component } from 'react';
import { IMainState } from '../model/mainType';
import { Card } from '@/entities';
import styles from './main.module.css';
import { getFilms, getSearchPeople, getStartPeople } from '@/shared';

export class Main extends Component<object, IMainState> {
  constructor(props: object) {
    super(props);
    this.state = { results: [], films: [] };
    this.changeLocalStorage = this.changeLocalStorage.bind(this);
  }

  async changeLocalStorage() {
    const local = localStorage.getItem('search');

    if (local) {
      const res = await getSearchPeople(local);
      this.setState({
        results: res,
      });
    } else {
      const res = await getStartPeople();
      this.setState({
        results: res,
      });
    }

    const res = await getFilms();
    this.setState({
      films: res,
    });

    this.forceUpdate();
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', this.changeLocalStorage);
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', this.changeLocalStorage);
    }
  }

  render() {
    return (
      <div className={styles.gallery}>
        {this.state.results.length > 0 ? (
          this.state.results.map((item) => (
            <Card
              name={item.name || ''}
              url={item.url || ''}
              home={item.homeworld || ''}
              films={
                this.state.films
                  .filter((film) => item.films?.some((url) => url === film.url))
                  .map((film) => film.title)
                  .join(', ') || ''
              }
              birthdayYear={item.birth_year || ''}
              key={item.url}
            />
          ))
        ) : (
          <div className={styles.notFound}>
            No characters with the name &quot;
            {localStorage.getItem('search')}
            &quot; found
          </div>
        )}
      </div>
    );
  }
}
