/* eslint-disable camelcase */
import React from 'react';
import {
  Modal, ModalHeader, Button, ModalBody, ModalFooter, Alert,
} from 'reactstrap';
import JobsMap from '../../JobsMap/JobsMap';

function ConfirmAddressModal({
  address,
  confirmAddressModalIsToggled,
  setConfirmAddressModalIsToggled,
  onSuccessFunction,
  isDuplicate,
}) {
  return (<>
    <Modal isOpen={confirmAddressModalIsToggled} toggle={() => setConfirmAddressModalIsToggled(false)}>
      <ModalHeader toggle={() => setConfirmAddressModalIsToggled(false)}>Confirm Property Address</ModalHeader>
      <ModalBody>
        {address ?
          <>
            <p>We found a matching address for the one you provided</p>
            <p>{address?.formatted_address}</p>
            <p>If this does not look correct, please go back and edit the form</p>
            <JobsMap
              getLocation={false}
              dragging={false}
              businessAddress={{ latitude: address?.location?.lat, longitude: address?.location?.lng }}
              hideMainMarkerPopup={true}
              soloMarker={true}
            />
          </>
          : <p>We were unable to find a match, please go back and edit the form</p>}
      </ModalBody>
      <ModalFooter>
        {isDuplicate && <Alert color="danger">This is a duplicate address of another of your properties.</Alert>}
        {!isDuplicate && address && <Button type="btn" onClick={() => onSuccessFunction()} color="success">Confirm Property</Button>}
        <Button color="danger" value="info" onClick={() => setConfirmAddressModalIsToggled(false)}>Cancel</Button>
      </ModalFooter>
    </Modal>
  </>
  );
}

export default ConfirmAddressModal;
