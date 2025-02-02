import { Component } from 'react';
import { ILayoutProps } from '../types/layoutTypes';
import { Footer, Header } from '@/widgets';

export class Layout extends Component<ILayoutProps> {
  render() {
    return (
      <>
        <Header />
        <div>{this.props.children}</div>
        <Footer />
      </>
    );
  }
}
