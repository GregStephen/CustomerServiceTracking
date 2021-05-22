import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Modal, ModalHeader, Button, ModalBody, ModalFooter,
} from 'reactstrap';
import { useDeleteProperty } from '../../Helpers/Data/PropertyRequests';

interface Props {
  property: Property.Property;
}
function DeletePropertyModal({ property }: Props) {
  const history = useHistory();
  const [isToggled, setIsToggled] = useState(false);
  const deleteProperty = useDeleteProperty();

  useEffect(() => {
    if (deleteProperty.isSuccess) {
      history.push('/properties');
    }
  }, [deleteProperty, history]);

  return (<>
    <button className="btn btn-danger" onClick={() => setIsToggled(true)}>Delete</button>
    <Modal isOpen={isToggled} toggle={() => setIsToggled(false)}>
      <ModalHeader toggle={() => setIsToggled(false)}>Confirm Deletion</ModalHeader>
      <ModalBody>
        <h1>Are you sure you want to delete this property?</h1>
        <h2>All records will be deleted and this cannot be undone</h2>
      </ModalBody>
      <ModalFooter>
        <Button type="submit" onClick={() => deleteProperty.mutate(property.id)} color="danger">Delete Property</Button>{' '}
        <Button color="secondary" value="info" onClick={() => setIsToggled(false)}>Cancel</Button>
      </ModalFooter>
    </Modal>
  </>
  );
}

export default DeletePropertyModal;
