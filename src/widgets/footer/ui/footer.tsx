import { Button } from '@/shared';
import { Component } from 'react';
import styles from './footer.module.css';

export class Footer extends Component {
  handleErrors() {
    window.dispatchEvent(new Event('customError'));
  }

  render() {
    return (
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
    );
  }
}
