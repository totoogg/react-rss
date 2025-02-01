import { Component } from 'react';
import styles from './input.module.css';
import { IInputProps } from '@/shared/types/inputTypes';
export class Input extends Component<IInputProps> {
  render() {
    return (
      <input
        className={styles.input}
        placeholder={this.props.placeholder}
        type={this.props.type}
        name={this.props.name}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}
