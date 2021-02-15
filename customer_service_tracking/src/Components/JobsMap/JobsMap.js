import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
} from 'react';
import L from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';

import CustomerMarker from './CustomerMarker';

import './JobsMap.scss';

function JobsMap({
  getLocation,
  markersData,
  businessAddress,
  hideMainMarkerPopup,
  dragging = true,
  soloMarker = false,
}) {
  const [centerMarker, setCenterMarker] = useState([0, 0]);
  const mapRef = useRef(null);
  const [refAquired, setRefAquired] = useState(false);

  useEffect(() => {
    setRefAquired(true);
  }, []);

  const userMarker = (
    <Marker position={centerMarker}>
      {!hideMainMarkerPopup && <Popup>You are here</Popup>}
    </Marker>
  );

  function handleOnLocationFound(e) {
    setCenterMarker(e.latlng);
  }

  useEffect(() => {
    if (getLocation && refAquired && mapRef.current) {
      const { current = {} } = mapRef;
      const { leafletElement: map } = current;
      map.locate();
    } else {
      setCenterMarker([businessAddress.latitude, businessAddress.longitude]);
    }
  }, [getLocation, businessAddress, refAquired]);

  const allSiteBounds = useMemo(() => {
    const bounds = L.latLngBounds();
    bounds.extend(centerMarker);
    if (markersData?.length > 0) {
      markersData.forEach((site) => bounds.extend(site.latLng));
    }
    return bounds;
  }, [markersData, centerMarker]);

  const updateMarkers = () => {
    if (markersData?.length > 0) {
      const markersToShow = markersData.map((marker) => (<CustomerMarker
          key={marker.key}
          marker={marker}
        />));
      return markersToShow;
    }
    return null;
  };

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  function ChangeBounds({ allBounds }) {
    const map = useMap();
    map.locate();
    if (allBounds // 👈 null and undefined check
      && Object.keys(allBounds).length !== 0 && allBounds.constructor === Object) {
      map.fitBounds(allBounds);
    }
    return null;
  }

  return (
    <div className="Map" id="map">
      <MapContainer
        center={centerMarker}
        zoom={13}
        scrollWheelZoom={true}
        onLocationfound={handleOnLocationFound}
        dragging={dragging}>
        {soloMarker && <ChangeView center={centerMarker} zoom={13} />}
        {markersData && <ChangeBounds allBounds={allSiteBounds} />}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {userMarker}
        {updateMarkers()}
      </MapContainer>
    </div>
  );
}

export default JobsMap;
