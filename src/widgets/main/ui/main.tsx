import { Component } from 'react';

export class Main extends Component {
  constructor(props: object) {
    super(props);
    this.changeLocalStorage = this.changeLocalStorage.bind(this);
  }

  changeLocalStorage() {
    console.log('Change to local storage!');
    this.forceUpdate();
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      console.log(localStorage.getItem('search'));
      window.addEventListener('storage', this.changeLocalStorage);
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', this.changeLocalStorage);
    }
  }

  render() {
    return <div>{localStorage.getItem('search')}</div>;
  }
}
