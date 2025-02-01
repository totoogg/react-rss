import { Component } from 'react';
import { ICardProps, ICardState } from '../model/cardTypes';
import { Character } from '@/shared/types/apiTypes';
import styles from './card.module.css';

export class Card extends Component<ICardProps, ICardState> {
  constructor(props: ICardProps) {
    super(props);
    this.state = {
      homePlanet: '',
    };
  }

  async changeLocalStorage() {
    await fetch(this.props.home)
      .then((response) => response.json())
      .then((data: Character) =>
        this.setState({
          homePlanet: data.name || '',
        })
      );

    this.forceUpdate();
  }

  componentDidMount() {
    this.changeLocalStorage();
  }

  render() {
    return (
      <div className={styles.card}>
        <img
          src={`https://raw.githubusercontent.com/vieraboschkova/swapi-gallery/main/static/assets/img/people/${this.props.url.slice(29, -1)}.jpg`}
          alt={this.props.name}
        />
        <div className={styles.description}>
          <span>
            <b>Name:</b> <i>{this.props.name}</i>
          </span>
          <span>
            <b>Home planet:</b> <i>{this.state.homePlanet}</i>
          </span>
          <span>
            <b>Films:</b> <i>{this.props.films}</i>
          </span>
          <span>
            <b>Birthday year:</b> <i>{this.props.birthdayYear}</i>
          </span>
        </div>
      </div>
    );
  }
}
