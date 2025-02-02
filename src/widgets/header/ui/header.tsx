import { Search } from '@/features';
import { Component } from 'react';
import styles from './header.module.css';

export class Header extends Component {
  render() {
    return (
      <div className={styles.header}>
        <div className={styles.wrapper}>
          <Search />
        </div>
      </div>
    );
  }
}
