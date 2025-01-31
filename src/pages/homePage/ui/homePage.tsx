import { Component } from 'react';
import { Main } from '@/widgets';
import styles from './homePage.module.css';

export class HomePage extends Component {
  render() {
    return (
      <div className={styles.page}>
        <Main />
      </div>
    );
  }
}
