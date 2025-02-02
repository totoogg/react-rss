import { Component } from 'react';
import { ICardProps, ICardState } from '../model/cardTypes';
import styles from './card.module.css';
import { addCount, getHome, minusCount } from '@/shared';

export class Card extends Component<ICardProps, ICardState> {
  constructor(props: ICardProps) {
    super(props);
    this.state = {
      homePlanet: '',
    };
  }

  handleImageLoaded() {
    minusCount();
    minusCount();
  }

  async changeLocalStorage() {
    const res = await getHome(this.props.home);

    this.setState({
      homePlanet: res || '',
    });

    this.forceUpdate();
  }

  componentDidMount() {
    this.changeLocalStorage();
    addCount();
  }

  render() {
    return (
      <div className={styles.card}>
        <img
          src={`https://raw.githubusercontent.com/vieraboschkova/swapi-gallery/main/static/assets/img/people/${this.props.url.slice(29, -1)}.jpg`}
          alt={this.props.name}
          onLoad={this.handleImageLoaded}
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
