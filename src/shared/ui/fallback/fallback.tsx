import { Component } from 'react';
import styles from './fallback.module.css';

export class Fallback extends Component {
  render() {
    return <div className={styles.message}>Something went wrong!</div>;
  }
}
