import { Component } from 'react';
import { IApi } from '@/shared/types/apiTypes';
import { IMainState } from '../model/mainType';
import { Card } from '@/entities';
import styles from './main.module.css';

export class Main extends Component<object, IMainState> {
  constructor(props: object) {
    super(props);
    this.state = { results: [], films: [] };
    this.changeLocalStorage = this.changeLocalStorage.bind(this);
  }

  async changeLocalStorage() {
    const local = localStorage.getItem('search');
    if (local) {
      await fetch(`https://swapi.dev/api/people/?search=${local}`)
        .then((response) => response.json())
        .then((data: IApi) =>
          this.setState({
            results: data.results,
          })
        );
    } else {
      await fetch(`https://swapi.dev/api/people`)
        .then((response) => response.json())
        .then((data: IApi) =>
          this.setState({
            results: data.results,
          })
        );
    }
    await fetch(`https://swapi.dev/api/films`)
      .then((response) => response.json())
      .then((data: IApi) =>
        this.setState({
          films: data.results.map((item) => item.title) as string[],
        })
      );
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
              films={item.films?.join(', ') || ''}
              birthdayYear={item.birth_year || ''}
              key={item.url}
            />
          ))
        ) : (
          <div className={styles.notFound}>Not found</div>
        )}
      </div>
    );
  }
}
