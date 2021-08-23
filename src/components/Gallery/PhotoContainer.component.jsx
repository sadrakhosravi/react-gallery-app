import React from 'react';

import Photo from './Photo.component';
import NoResultsFound from './NoResultsFound.component';

import LoaderImg from '../../assets/loader.gif';

export default function PhotoContainer(props) {
  const { photos, isLoading, query, noResults } = props;

  let photosToDisplay;

  //Check if data has loaded and the photos array is not empty
  if (photos.length > 0 && isLoading === false) {
    //Return a Photo component for each array element
    photosToDisplay = photos.map(photo => {
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
    return (photosToDisplay = <img src={LoaderImg} width="100px" alt="Content is Loading"></img>);
  } else {
    photosToDisplay = <NoResultsFound />;
  }

  return (
    <div className="photo-container">
      {!noResults && <h2>{query}</h2>}
      <ul>{photosToDisplay}</ul>
    </div>
  );
}
