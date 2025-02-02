import { Component } from 'react';
import { Main } from '@/widgets';
import styles from './homePage.module.css';
import { IHomePageState } from '../model/homePageTypes';
import { ErrorResponse } from '@/entities';

export class HomePage extends Component<object, IHomePageState> {
  constructor(props: object) {
    super(props);

    this.state = {
      isError: false,
    };

    this.showResponse = this.showResponse.bind(this);
  }

  showResponse() {
    this.setState({
      isError: true,
    });
    this.forceUpdate();
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('customErrorResponse', this.showResponse);
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('customErrorResponse', this.showResponse);
    }
  }

  render() {
    return (
      <div className={styles.page}>
        {this.state.isError && <ErrorResponse />}
        {!this.state.isError && <Main />}
      </div>
    );
  }
}
