import { Component } from 'react';
import styles from './button.module.css';
import { IButtonProps } from '@/shared/types/buttonTypes';

export class Button extends Component<IButtonProps> {
  render() {
    return (
      <button
        disabled={this.props.disabled}
        onClick={this.props.onClick}
        className={[
          styles.button,
          this.props.classNameButton === 'flat' ? styles.flat : styles.outline,
          this.props.className?.join(' '),
        ].join(' ')}
      >
        {this.props.text}
      </button>
    );
  }
}
