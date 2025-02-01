import { Button, Input } from '@/shared';
import { Component } from 'react';
import styles from './search.module.css';
import { ISearchState } from '../model/searchType';

export class Search extends Component<object, ISearchState> {
  constructor(props: object) {
    super(props);
    this.state = { search: '' };

    this.onChange = this.onChange.bind(this);
    this.handleLocal = this.handleLocal.bind(this);
  }

  componentDidMount() {
    const local = localStorage.getItem('search');
    if (local) {
      this.setState({ search: local });
    }
  }

  shouldComponentUpdate(
    _nextProps: object,
    nextState: Readonly<ISearchState>
  ): boolean {
    const local = localStorage.getItem('search');
    if (local === nextState.search) window.dispatchEvent(new Event('storage'));
    return true;
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ search: e.target.value });
  }

  handleLocal() {
    localStorage.setItem('search', this.state.search);
    window.dispatchEvent(new Event('storage'));
  }

  render() {
    return (
      <div className={styles.search}>
        <Input
          name="search"
          onChange={this.onChange}
          placeholder="Search"
          type="text"
          value={this.state.search}
          className={[styles.input]}
          onEnter={this.handleLocal}
        />
        <Button
          text="Search"
          onClick={this.handleLocal}
          className={[styles.button]}
          classNameButton="flat"
        />
      </div>
    );
  }
}
