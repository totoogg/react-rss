import { Button, Loader } from '@/shared';
import { Component } from 'react';
import styles from './footer.module.css';
import { IFooterState } from '../model/footerTypes';

export class Footer extends Component<object, IFooterState> {
  constructor(props: object) {
    super(props);
    this.state = {
      isError: false,
      isLoader: false,
    };
    this.handleErrors = this.handleErrors.bind(this);
    this.changeLoaderOn = this.changeLoaderOn.bind(this);
    this.changeLoaderOff = this.changeLoaderOff.bind(this);
  }

  changeLoaderOn() {
    this.setState({ isLoader: true });
  }

  changeLoaderOff() {
    this.setState({ isLoader: false });
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('customLoaderOn', this.changeLoaderOn);
      window.addEventListener('customLoaderOff', this.changeLoaderOff);
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('customLoaderOn', this.changeLoaderOn);
      window.removeEventListener('customLoaderOff', this.changeLoaderOff);
    }
  }

  handleErrors() {
    this.setState({ isError: true });
  }

  render() {
    if (this.state.isError) {
      throw new Error('Error');
    }
    return (
      <>
        {this.state.isLoader && <Loader />}
        <div className={styles.footer}>
          <div className={styles.wrapper}>
            <Button
              text="ERROR"
              onClick={this.handleErrors}
              classNameButton="flat"
              className={[styles.error]}
            />
          </div>
        </div>
      </>
    );
  }
}
