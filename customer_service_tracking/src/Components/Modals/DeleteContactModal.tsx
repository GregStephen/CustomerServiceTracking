import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Modal,
  ModalHeader,
  Button,
  ModalBody,
  ModalFooter,
  Tooltip,
} from 'reactstrap';
import { useDeleteContact } from '../../Helpers/Data/PropertyRequests';

interface Props {
  contact: Property.Contact;
  deleteEnabled: boolean;
}
function DeleteContactModal({ contact, deleteEnabled }: Props) {
  const history = useHistory();
  const [deleteContactModalIsToggled, setDeleteContactModalIsToggled] = useState(false);
  const deleteContact = useDeleteContact();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggleToolTip = () => setTooltipOpen(!tooltipOpen);

  useEffect(() => {
    if (deleteContact.isSuccess) {
      history.push(`/property/${contact?.propertyId}`);
    }
  }, [deleteContact, history, contact]);

  return (<>
    <Button color="danger" className="col-12" disabled={contact?.primary || !deleteEnabled} onClick={() => setDeleteContactModalIsToggled(true)}>
      <div className="position-absolute w-100 h-100 pos-left pos-top" id="deleteContact"/>Delete</Button>
    {(contact?.primary || !deleteEnabled) && <Tooltip target="deleteContact" placement="right" isOpen={tooltipOpen} toggle={toggleToolTip}>Cannot delete Primary Contact, you must edit or reassign</Tooltip>}
    <Modal isOpen={deleteContactModalIsToggled} toggle={() => setDeleteContactModalIsToggled(false)}>
      <ModalHeader toggle={() => setDeleteContactModalIsToggled(false)}>Confirm Deletion</ModalHeader>
      <ModalBody>
        <h1>Are you sure you want to delete {contact?.firstName} {contact?.lastName}?</h1>
        <h2>This cannot be undone</h2>
      </ModalBody>
      <ModalFooter>
        <Button type="btn" onClick={() => deleteContact.mutate(contact?.id)} color="danger">Delete Conact</Button>{' '}
        <Button color="secondary" value="info" onClick={() => setDeleteContactModalIsToggled(false)}>Cancel</Button>
      </ModalFooter>
    </Modal>
  </>
  );
}

export default DeleteContactModal;
