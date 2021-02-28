import React from 'react';
import { Link } from 'react-router-dom';
import { Popup } from 'react-leaflet';
import Formatting from '../../Helpers/Functions/Formatting';

function PropertyPopUp({ marker }) {
  return (
    <Popup>
      <div className="popup">
        <p>Property: <Link
          className="popup-business-name"
          to={{ pathname: marker.propertyLink }}>
          {marker.title}
        </Link>
        </p>
        {Formatting.formatAddressObj(marker.address)}
        {marker.tech && <p>Tech: {marker.tech}</p>}
      </div>
    </Popup>
  );
}

export default PropertyPopUp;