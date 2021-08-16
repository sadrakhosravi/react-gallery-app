import React from 'react';

//Uses props to render the given flicker image
export default function Photo(props) {
  return (
    <li>
      <img
        src={`https://farm${props.farm}.staticflickr.com/${props.server}/${props.id}_${props.secret}.jpg`}
        alt={props.title}
      />
    </li>
  );
}
