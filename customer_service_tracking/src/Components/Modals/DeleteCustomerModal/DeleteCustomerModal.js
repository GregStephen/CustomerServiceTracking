import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Modal, ModalHeader, Button, ModalBody, ModalFooter,
} from 'reactstrap';
import { useDeleteCustomer } from '../../../Helpers/Data/CustomerRequests';

function DeleteCustomerModal({ customer }) {
  const history = useHistory();
  const [isToggled, setIsToggled] = useState(false);
  const deleteCustomer = useDeleteCustomer();

  useEffect(() => {
    if (deleteCustomer.isSuccess) {
      history.push('/customers');
    }
  }, [deleteCustomer, history]);

  return (<>
    <button className="btn btn-danger" onClick={() => setIsToggled(true)}>Delete</button>
    <Modal isOpen={isToggled} toggle={() => setIsToggled(false)}>
      <ModalHeader toggle={() => setIsToggled(false)}>Confirm Deletion</ModalHeader>
      <ModalBody>
        <h1>Are you sure you want to delete this customer?</h1>
        <h2>All records will be deleted and this cannot be undone</h2>
      </ModalBody>
      <ModalFooter>
        <Button type="submit" onClick={() => deleteCustomer.mutate(customer.id)} color="danger">Delete Customer</Button>{' '}
        <Button color="secondary" value="info" onClick={() => setIsToggled(false)}>Cancel</Button>
      </ModalFooter>
    </Modal>
  </>
  );
}

export default DeleteCustomerModal;
