import React from 'react';

import Photo from './Photo.component';

export default function PhotoContainer({ photos, isLoading, query }) {
  let photosToDisplay;

  if (photos.length > 0 && isLoading === false) {
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
  }

  return (
    <div className="photo-container">
      <h2>{query}</h2>
      <ul>{photosToDisplay}</ul>
    </div>
  );
}
