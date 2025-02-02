import { Component } from 'react';
import styles from './input.module.css';
import { IInputProps } from '@/shared/types/inputTypes';

export class Input extends Component<IInputProps> {
  render() {
    return (
      <input
        className={[styles.input, this.props.className?.join(' ')].join(' ')}
        placeholder={this.props.placeholder}
        type={this.props.type}
        name={this.props.name}
        value={this.props.value}
        onChange={this.props.onChange}
        onKeyDown={(e) => e.key === 'Enter' && this.props.onEnter()}
      />
    );
  }
}
