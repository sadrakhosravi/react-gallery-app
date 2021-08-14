import { Component } from 'react';

export default class NoResultsFound extends Component {
  render() {
    return (
      <li className="not-found">
        <h3>No Results Found</h3>
        <p>You search did not return any results. Please try again.</p>
      </li>
    );
  }
}
