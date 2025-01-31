import { Button } from '@/shared';
import { Component } from 'react';

export class Header extends Component {
  handleLocal() {
    localStorage.setItem('random', String(Math.random()));
    window.dispatchEvent(new Event('storage'));
  }

  render() {
    return (
      <div>
        Header<button onClick={this.handleLocal}>Click</button>
        <Button className="flat" onClick={() => {}} text="search"></Button>
      </div>
    );
  }
}
