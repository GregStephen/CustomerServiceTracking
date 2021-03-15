import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Modal, ModalHeader, Button, ModalBody, ModalFooter,
} from 'reactstrap';
import { useDeleteContact } from '../../../Helpers/Data/PropertyRequests';

function DeleteContactModal({ contact }) {
  const history = useHistory();
  const [deleteContactModalIsToggled, setDeleteContatModalIsToggled] = useState(false);
  const deleteContact = useDeleteContact();

  useEffect(() => {
    if (deleteContact.isSuccess) {
      history.push(`/property/${contact.propertyId}`);
    }
  }, [deleteContact, history, contact.propertyId]);

  return (<>
    <button className="btn btn-danger" disabled={contact.primary} onClick={() => setDeleteContatModalIsToggled(true)}>Delete</button>
    <Modal isOpen={deleteContactModalIsToggled} toggle={() => setDeleteContatModalIsToggled(false)}>
      <ModalHeader toggle={() => setDeleteContatModalIsToggled(false)}>Confirm Deletion</ModalHeader>
      <ModalBody>
        <h1>Are you sure you want to delete {contact.firstName} {contact.LastName}?</h1>
        <h2>This cannot be undone</h2>
      </ModalBody>
      <ModalFooter>
        <Button type="btn" onClick={() => deleteContact.mutate(contact.id)} color="danger">Delete Conact</Button>{' '}
        <Button color="secondary" value="info" onClick={() => setDeleteContatModalIsToggled(false)}>Cancel</Button>
      </ModalFooter>
    </Modal>
  </>
  );
}

export default DeleteContactModal;
