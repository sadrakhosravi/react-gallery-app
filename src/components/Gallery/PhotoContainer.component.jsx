import React, { Component } from 'react';

import Photo from './Photo.component';
import NoResultsFound from './NoResultsFound.component';

import LoaderImg from '../../assets/loader.gif';

class PhotoContainer extends Component {
  constructor(props) {
    super(props);
    this.photosToDisplay = null;
  }

  /**
   * Checks if the API call had images and outputs a loader while the image array is loading
   * If there are not images, output no results found.
   */
  checkPhotos() {
    const { photos, isLoading, noResults } = this.props;

    //Check if data has loaded and the photos array is not empty
    if (photos.length > 0 && isLoading === false) {
      //Return a Photo component for each array element
      this.photosToDisplay = photos.map(photo => {
        return (
          <Photo
            id={photo.id}
            key={photo.id}
            farm={photo.farm}
            server={photo.server}
            secret={photo.secret}
            title={photo.title}
          />
        );
      });
    } else if (!noResults) {
      //Return a spinner gif for loading state
      return (this.photosToDisplay = (
        <div className="loader">
          <img src={LoaderImg} alt="Content is Loading"></img>
        </div>
      ));
    } else {
      //No results found
      this.photosToDisplay = <NoResultsFound />;
    }
  }

  render() {
    const { isLoading, query } = this.props;

    this.checkPhotos(); //Conditional rending of the photo results

    return (
      <div className="photo-container">
        {!isLoading && <h2>Search for: {query}</h2>}
        <ul>{this.photosToDisplay}</ul>
      </div>
    );
  }
}

export default PhotoContainer;
