import { Component } from 'react';
import { ILayoutProps } from '../types/layoutTypes';
import { Header } from '@/widgets';
import styles from './layout.module.css';

export class Layout extends Component<ILayoutProps> {
  render() {
    return (
      <div className={styles.layout}>
        <Header />
        <div>{this.props.children}</div>
      </div>
    );
  }
}
