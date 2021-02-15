import React from 'react';
import { Link } from 'react-router-dom';
import { Popup } from 'react-leaflet';
import Formatting from '../../Helpers/Functions/Formatting';

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
        {Formatting.formatAddressObj(marker.address)}
        {marker.tech && <p>Tech: {marker.tech}</p>}
      </div>
    </Popup>
  );
}

export default CustomerPopUp;
