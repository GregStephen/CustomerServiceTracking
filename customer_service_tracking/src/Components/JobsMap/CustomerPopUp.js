import React from 'react';
import { Link } from 'react-router-dom';
import { Popup } from 'react-leaflet';

function CustomerPopUp({ marker }) {
  return (
    <Popup>
      <div className="popup">
        <p>Customer: <Link
          className="popup-business-name"
          to={{ pathname: marker.customerLink }}>
          {marker.title}
        </Link>
          </p>
        {marker.assigned
          ? <p>Tech: {marker.tech}</p>
          : ''}
      </div>
    </Popup>
  );
}

export default CustomerPopUp;
