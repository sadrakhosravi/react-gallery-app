import { Component } from 'react';

import Photo from './Photo.component';
import NoResultsFound from './NoResultsFound.component';

export default class PhotoContainer extends Component {
  render() {
    return (
      <div className="photo-container">
        <h2>Results</h2>
        <ul>
          <Photo />
          <NoResultsFound />
        </ul>
      </div>
    );
  }
}
