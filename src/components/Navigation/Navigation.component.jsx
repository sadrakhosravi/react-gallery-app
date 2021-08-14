import { Component } from 'react';

//Router
import { NavLink } from 'react-router-dom';

export default class Navigation extends Component {
  render() {
    return (
      <nav className="main-nav">
        <ul>
          <li>
            <NavLink to="/galaxy">Galaxy</NavLink>
          </li>
          <li>
            <NavLink to="/cars">Cars</NavLink>
          </li>
          <li>
            <NavLink to="/nature">Nature</NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}
