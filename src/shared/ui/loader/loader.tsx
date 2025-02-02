import { Component } from 'react';
import styles from './loader.module.css';

export class Loader extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <span className={styles.loader}></span>
      </div>
    );
  }
}
