import { Component } from 'react';
import styles from './errorResponse.module.css';

export class ErrorResponse extends Component {
  render() {
    return (
      <div className={styles.error}>
        <div className={styles.errorText}>
          Something went wrong. Please try again later.
        </div>
      </div>
    );
  }
}
