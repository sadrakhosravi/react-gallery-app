import React from 'react';

import Photo from './Photo.component';

import LoaderImg from '../../assets/loader.gif';

export default function PhotoContainer({ photos, isLoading, query }) {
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
  } else {
    //Return a spinner gif for loading state
    return (photosToDisplay = <img src={LoaderImg} width="100px" alt="Content is Loading"></img>);
  }

  return (
    <div className="photo-container">
      <h2>{query}</h2>
      <ul>{photosToDisplay}</ul>
    </div>
  );
}
